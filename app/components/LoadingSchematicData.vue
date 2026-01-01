<template>
  <div class="pt-4">
    <div class="spinner-border d-block mx-auto my-0"></div>
    <p class="pt-4 text-center">{{ loadingMessage }}</p>
  </div>
</template>

<script>
import Funnies from 'funnies'

export default {
  name: 'LoadingSchematicData',
  data() {
    return {
      funnies: new Funnies(),
      loadingMessage: 'loading schematic data',
    }
  },
  mounted() {
    this.generateLoadingMessage()
    setInterval(() => this.generateLoadingMessage(), 3000)
  },
  methods: {
    generateLoadingMessage() {
      this.loadingMessage = this.funnies.message()
    },
  },
}
</script>
