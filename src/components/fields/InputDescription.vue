<template lang="pug">
.field__description
  v-textarea(
    :value='field'
    @input="$emit('input', $event)"
    placeholder="Describe what needs to be done"
    label="Description"
    :rules="rules"
    :counter="maxChars"
    :maxlength="maxChars"
    background-color="grey lighten-3"
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
        d => d.length < this.maxChars ||
          `The description must contain no more than ${this.maxChars} characters`
      ]
    }
  },
  computed: {
    maxChars () {
      return this.$store.getters['getSettings'].maxChars.description
    }
  }
}
</script>
