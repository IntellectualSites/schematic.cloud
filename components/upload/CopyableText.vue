<template>
  <b-input-group>
    <b-input-group-prepend is-text>{{ name }}</b-input-group-prepend>
    <b-form-input :value="value" disabled />
    <b-input-group-append>
      <b-button
        :variant="active ? 'success' : 'info'"
        :disabled="active"
        @click="onCopy()"
      >
        {{ active ? 'Copied' : 'Copy' }}
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'CopyableText',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {
    async onCopy() {
      try {
        await this.$copyText(this.value)
        this.active = true
        setTimeout(() => (this.active = false), 3000)
      } catch {
        // eslint-disable-next-line
        console.error(`Failed to copy value: ${this.value}`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-group {
  margin-bottom: 15px;
  .input-group-prepend {
    width: 23%;

    .input-group-text {
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
