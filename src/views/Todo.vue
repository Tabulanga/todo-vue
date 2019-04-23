<template lang="pug">
  #todo-details
    todo-details(:id="this.$route.params.id")
</template>

<script>
import TodoDetails from '@/components/TodoDetails'

export default {
  name: 'Todo',
  components: {
    TodoDetails
  }
}
</script>
