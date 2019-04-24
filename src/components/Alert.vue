<template lang="pug">
v-container#alert.page
  v-alert(
    :value="alert.flag"
    :type="alert.type"
    @click="clearAlert"
    transition="scale-transition"
  )
    div.title.font-weight-light.text-xs-center
      | {{alert.message}}
</template>

<script>
export default {
  computed: {
    alert () {
      return this.$store.getters['getAlert']
    }
  },
  methods: {
    clearAlert () {
      this.$store.commit('setAlert', {
        message: '',
        type: 'info',
        flag: false
      })
    }
  }
}
</script>
