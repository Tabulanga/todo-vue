import { mutations } from '@/store'
import moment from 'moment'

const {
  setAlert,
  addTodo,
  checkExpired
} = mutations

describe('mutations', () => {
  test('setAlert', () => {
    const state = {
      alert: {
        message: '',
        type: '',
        flag: false
      }
    }
    const alert = {
      message: 'No errors, hallelujah!',
      type: 'info',
      flag: true
    }
    setAlert(state, alert)
    expect(state.alert).toEqual(alert)
  })

  test('addTodo', () => {
    const state = {
      model: {
        id: 'test',
        data: []
      },
      todoColl: []
    }
    const todo = { test: 'test' }
    addTodo(state, todo)
    expect(state.todoColl[0]).toEqual(todo)
  })

  test('checkExpired', () => {
    const state = {
      model: {
        id: 'test',
        data: []
      },
      todoColl: [
        { expired: false, deadline: moment().add(0, 'day').format('YYYY-MM-DD') },
        { expired: false, deadline: moment().add(1, 'day').format('YYYY-MM-DD') },
        { expired: false, deadline: moment().add(-1, 'day').format('YYYY-MM-DD') }
      ]
    }
    checkExpired(state)
    expect(state.todoColl[0].expired).toBeFalsy()
    expect(state.todoColl[1].expired).toBeFalsy()
    expect(state.todoColl[2].expired).toBeTruthy()
  })
})
