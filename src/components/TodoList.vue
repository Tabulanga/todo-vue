<template lang="pug">
  v-container.page
    v-layout(column)
      v-flex
        div.headline.font-weight-black
          | Todo list

        v-toolbar.elevation-0(dense)
          v-toolbar-items
            v-btn-toggle.transparent(
              v-model="filtered.status"
            )
              v-btn(:value="'in__work'" flat small)
                v-icon work_outline
                span.hidden-xs-only In work

              v-btn(:value="'done'" flat small color="green")
                v-icon check_circle
                span.hidden-xs-only Completed

            v-btn-toggle.transparent(
              v-model="filtered.expired"
            )
              v-btn(:value="true" flat small color="red")
                v-icon watch_later
                span.hidden-xs-only Expired

          v-divider.mx-2(vertical)

          v-overflow-btn(
            v-model="filtered.selectedTag"
            :items="currentTags"
            label="Select tag"
            no-data-text="these todos do not have tags"
            color="green"
            clearable
            hide-details
            small-chips
            dense
            flat
          )

        v-divider.mb-1

        div(v-for="todo in todoColl" :key="todo.id")
          v-hover
            v-card(
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 1 : 0}`"
              :color="hover ? 'grey lighten-2' : 'transparent'"
              flat
              :to="`/todo/${todo.id}`"
            )
              v-layout(row)
                v-flex(shrink)
                  div.px-1.py-1
                    div.text-no-wrap
                      | {{ todo.deadline }}
                    div.text-xs-center
                      v-icon(v-if="todo.status === 'in__work'") work_outline
                      v-icon(v-if="todo.status === 'done'"
                        color="green") check_circle
                      v-icon(v-if="todo.expired" color="red") watch_later
                v-divider.mx-1(vertical)
                v-flex(grow xs9 sm10 md10)
                  v-card-title.px-1.py-1
                    div.font-weight-bold.text-uppercase
                      | {{ todo.title }}
                  v-card-text.px-1.py-0
                    div.pt-1.text-truncate
                      | {{ todo.description }}
              v-divider.my-1

</template>

<script>
export default {
  name: 'todoList',
  data () {
    return {
      filtered: {
        selectedTag: '',
        expired: false,
        status: false
      }
    }
  },
  computed: {
    todoColl () {
      const result = this.$store.getters['filteredTodos'](this.filtered)
      if (result.length === 0) {
        this.$store.commit('setAlert', {
          message: 'No todo to display. It may be worth creating new ones.',
          type: 'success',
          flag: true
        })
      }
      return result
    },
    currentTags () {
      const set = new Set()
      this.todoColl.forEach(todo => {
        todo.tags.forEach(tag => set.add(tag))
      })
      return [...set].sort()
    }
  },
  created () {
    this.$store.dispatch('loading')
    this.$store.commit('checkExpired')
  }
}
</script>

<style>
.truncate {
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
</style>
