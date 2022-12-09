<template>
  <b-input-group v-if="resolvedValue">
    <b-input-group-prepend is-text>{{ name }}</b-input-group-prepend>
    <b-form-input :value="resolvedValue" disabled />
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
      type: [String, Promise],
      required: true,
    },
  },
  data() {
    return {
      active: false,
      resolvedValue: undefined,
    }
  },
  async mounted() {
    this.resolvedValue =
      this.value instanceof Promise ? await this.value : this.value
  },
  methods: {
    async onCopy() {
      try {
        await this.$copyText(this.resolvedValue)
        this.active = true
        setTimeout(() => (this.active = false), 3000)
      } catch (e) {
        // eslint-disable-next-line
        console.error(`Failed to copy value: ${this.resolvedValue}`)
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
