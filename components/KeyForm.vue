<template>
  <b-form @submit.prevent="submit">
    <b-form-input v-model="key" :placeholder="placeholder" />
    <b-button type="submit" :disabled="!validInput">{{ button }}</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'KeyForm',
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      key: undefined,
    }
  },
  computed: {
    validInput() {
      return !!this.key
    },
  },
  methods: {
    submit() {
      if (this.key) {
        this.$router.push(`${this.path}/${this.key}`)
      }
    },
  },
}
</script>
