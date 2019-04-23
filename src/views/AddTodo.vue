<template lang="pug">
  .add
    new-todo
</template>

<script>
import NewTodo from '@/components/NewTodo'

export default {
  name: 'AddTodo',
  components: {
    NewTodo
  }
}
</script>
