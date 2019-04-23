<template lang="pug">
.field__deadline
  v-icon(v-if="isExpired" color="red") watch_later
  v-menu(
    ref="menu"
    :close-on-content-click="true"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
  )
    v-text-field(
      slot="activator"
      :value='field'
      label="Deadline date"
      :prepend-icon="isExpired ? '' : 'event'"
      readonly
    )
    v-date-picker(
      :value='field'
      @input="$emit('input', $event)"
      :color="isExpired ? 'red' : 'green'"
      :min="currentDate"
    )
</template>

<script>
import moment from 'moment'

export default {
  model: {
    prop: 'field',
    event: 'input'
  },
  props: {
    id: String,
    field: String
  },
  data () {
    return {
      currentDate: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    isExpired () {
      return moment(this.field).isBefore(this.currentDate)
    }
  },
  watch: {
    field: function (val) {
      this.$store.commit('changeExpired', this.id)
    }
  }
}
</script>
