<template lang="pug">
  v-app#app
    v-container
      v-toolbar(app color="green" dark)
        v-spacer

        v-container.page
          v-layout(align-center justify-center row fill-height)
            v-toolbar-title.headline.text-uppercase
              router-link(
                to="/"
                tag="span"
                style="cursor: pointer"
              )
                span.font-weight-regular TODO
                span.font-weight-light VUE

            v-spacer

            v-btn(
              flat
              small
              to="/about"
            )
              v-icon info
              span.hidden-xs-only
                | About

            v-btn(
              flat
              small
              to="/add"
            )
              v-icon add_circle_outline
              | New Todo

        v-spacer

      v-content
        router-view
        alert
</template>

<script>
import Alert from '@/components/Alert'

export default {
  name: 'App',
  components: {
    Alert
  }
}
</script>

<style>
.container.page {
  max-width: 800px;
  padding: 0px;
}
</style>
