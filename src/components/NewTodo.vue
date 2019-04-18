<template lang="pug">
  .new
    h1
      | Новая задача
    | Заголовок:
    br
    input(v-model='todoItem.title')
    br
    | Теги (разделенные запятой):
    br
    input(v-model='tagStr')
    br
    | Описание задачи:
    br
    textarea(v-model='todoItem.description' placeholder="введите подробности")
    br
    | Дата выполнения:
    br
    input(v-model='selectedDate' type='date')
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'newTodo',
  data () {
    return {
      tagStr: '',
      selectedDate: '2019-04-18', 
      todoItem: {
        title: '',
        deadline: selectedDate,
        description: '',
        tags: [],

        status: '',
        expired: false,
        edited: true
      }
    }
  },
  computed: { ...mapState([ 'todoList' ]) },
  methods: {
    setDeadline (date) {
      this.todoItem.deadline = new Date(date);
    },
    
  },
  mounted () {
    console.log(this.todoList)
  }
}
</script>
