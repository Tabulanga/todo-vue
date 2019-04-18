<template lang="pug">
  .add
    new-todo
</template>

<script>
import NewTodo from '@/components/NewTodo'

export default {
  name: 'home',
  components: {
    NewTodo
  }
}
</script>
