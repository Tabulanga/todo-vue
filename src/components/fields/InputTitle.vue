<template lang="pug">
.field__title
  v-text-field(
    :value='field'
    @input="$emit('input', $event)"
    :rules="rules"
    :counter="maxChars"
    label="Title"
    prepend-inner-icon="create"
    required
  )
</template>

<script>
export default {
  model: {
    prop: 'field',
    event: 'input'
  },
  props: {
    field: String
  },
  data () {
    return {
      rules: [
        title => !!title || 'Title is required',
        title => (title.length <= this.maxChars) ||
          `The title recommend be less ${this.maxChars} than characters`
      ]
    }
  },
  computed: {
    maxChars () {
      return this.$store.getters['getSettings'].maxChars.title
    }
  }
}
</script>
