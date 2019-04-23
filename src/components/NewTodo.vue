<template lang="pug">
  v-container.page
    v-layout(column)
      v-flex
        div.headline.font-weight-black
          | New todo

        input-title(v-model="todoItem.title")

        v-text-field(
          v-model.trim="tagStr"
          label="Tags"
          hint="Enter tags, separated by commas"
          background-color="grey lighten-3"
        )

        input-description(v-model="todoItem.description")

        input-deadline(v-model="todoItem.deadline")

        v-flex.text-xs-right
          v-btn(
            flat
            outline
            color="grey"
            to="/"
          )
            | Cancel

          v-btn(
            color="green"
            @click="validate"
            dark
          )
            | Add Todo
</template>

<script>
import moment from 'moment'
import InputTitle from './fields/InputTitle'
import InputDescription from './fields/InputDescription'
import InputDeadline from './fields/InputDeadline'

export default {
  name: 'newTodo',
  components: {
    InputTitle,
    InputDescription,
    InputDeadline
  },
  data () {
    return {
      tagStr: '',
      todoItem: {
        id: Date.now().toString(),
        title: '',
        deadline: moment().add(1, 'day').format('YYYY-MM-DD'),
        description: '',
        tags: new Set(),

        status: 'in__work',
        expired: false
      }
    }
  },
  methods: {
    parseTags (str) {
      const set = new Set()
      str.split(',')
        .forEach(tag => {
          const trimed = tag.trim()
          if (trimed.length !== 0) {
            set.add(trimed)
          }
        })
      return set
    },
    validate () {
      (this.todoItem.title.length > 0)
        ? this.addTodo()
        : this.$store.commit('setAlert', {
          message: 'Please enter the title todo',
          type: 'warning',
          flag: true
        })
    },
    addTodo () {
      this.todoItem.tags = this.parseTags(this.tagStr)

      this.$store.commit('addTodo', this.todoItem)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
