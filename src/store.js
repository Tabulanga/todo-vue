import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { saveState, loadState } from './services/LocalStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    model: {
      id: 'todo-vue',
      data: [
        'todoColl'
      ]
    },
    settings: {
      maxChars: {
        title: 70,
        description: 2048
      }
    },
    alert: {
      message: '',
      type: '',
      flag: false
    },

    todoColl: []
  },

  getters: {
    getSettings (state) {
      return state.settings
    },

    getAlert (state) {
      return state.alert.flag ? state.alert : {
        message: '',
        type: 'info',
        flag: false
      }
    },

    getTodo: (state) => (id) => {
      return state.todoColl.find(todo => {
        return todo.id === id
      })
    },

    filteredTodos: (state) => (newValue) => {
      let todoFiltered = state.todoColl
      if (newValue.status) {
        todoFiltered = todoFiltered.filter(todo =>
          todo.status === newValue.status
        )
      }
      if (newValue.expired) {
        todoFiltered = todoFiltered.filter(todo =>
          todo.expired === newValue.expired
        )
      }
      if (newValue.selectedTag && newValue.selectedTag.length > 0) {
        todoFiltered = todoFiltered.filter(todo => {
          return !!todo.tags.find(x => x === newValue.selectedTag)
        })
      }

      const todoSorted = todoFiltered.sort((a, b) => {
        if (moment(a.deadline).isAfter(b.deadline)) {
          return 1
        }
        if (moment(a.deadline).isBefore(b.deadline)) {
          return -1
        }
        return 0
      })

      return todoSorted
    }
  },

  mutations: {
    setAlert (state, alert) {
      if (alert) {
        Object.keys(alert).forEach(key => {
          state.alert[key] = alert[key]
        })
      }
    },

    addTodo (state, todo) {
      state.todoColl.push(todo)
      saveState(state)
    },

    updateTodo (state, newTodo) {
      const index = state.todoColl.findIndex(todo => todo.id === newTodo.id)
      state.todoColl[index] = newTodo
      saveState(state)
    },

    renewState (state, data) {
      if (data) {
        Object.keys(data).forEach(el => {
          state[el] = data[el]
        })
      }
    },

    checkExpired (state) {
      const now = moment().format('YYYY-MM-DD')
      state.todoColl
        .forEach(todo => {
          if (
            todo.status !== 'done' &&
            !todo.expired &&
            moment(todo.deadline).isBefore(now)
          ) {
            todo.expired = true
          }
        })
      saveState(state)
    },

    changeExpired (state, id) {
      const index = state.todoColl.findIndex(todo => todo.id === id)
      state.todoColl[index].expired = false
    }
  },

  actions: {
    loading ({ state, commit }) {
      commit('renewState', loadState(state.model))
    }
  }
})
