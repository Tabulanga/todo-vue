<template lang="pug">
  v-container.page
    v-layout(column)
      v-flex
        div.headline
          span.font-weight-black.pr-2
            | Todo:
          span.font-weight-light
            | {{ todoItem.title }}

        v-card.transparent.elevation-0
          v-card-text.px-0
            span.subheading.font-weight-black.pr-2
              | Tags:
            v-chip(v-for="tag in todoItem.tags" :key="tag")(
              small
              disabled
              outline
              color="green"
            )
              | {{ tag }}

        input-description(v-model="todoItem.description")

        input-deadline(v-model="todoItem.deadline", :id="id")

        div
          v-layout
            v-flex.text-xs-left
              v-radio-group(v-model="todoItem.status" row)
                div.subheading.font-weight-black.pr-2
                  | Status:
                v-radio(label="In work" value="in__work" color="grey")
                v-radio(label="Complete" value="done" color="green")

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
                v-icon(v-if="todoItem.status === 'done'") check_circle
                | Save
</template>

<script>
import moment from 'moment'
import InputDescription from './fields/InputDescription'
import InputDeadline from './fields/InputDeadline'

export default {
  name: 'newTodo',
  components: {
    InputDescription,
    InputDeadline
  },
  props: {
    id: String
  },
  data () {
    return {

    }
  },
  computed: {
    todoItem () {
      return this.$store.getters['getTodo'](this.id)
    }
  },
  methods: {
    validate () {
      const current = moment().format('YYYY-MM-DD')

      this.todoItem.status === 'done' ||
      moment(this.todoItem.deadline).isSameOrAfter(current)
        ? this.updateTodo()
        : this.$store.commit('setAlert', {
          message: 'The current deadline has expired. You must set the correct date.',
          type: 'warning',
          flag: true
        })
    },
    updateTodo () {
      this.$store.commit('updateTodo', this.todoItem)
      this.$router.push({ name: 'home' })
    }
  },
  created: function () {
    this.$store.dispatch('loading')
    this.$store.commit('checkExpired')
  }
}
</script>
