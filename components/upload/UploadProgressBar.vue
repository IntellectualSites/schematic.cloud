<template>
  <div>
    <p class="loadingMessage">{{ loadingMessage }}</p>
    <b-progress
      class="progress"
      :value="progress || 0.0"
      :max="max"
      show-progress
      animated
    />
  </div>
</template>

<script>
import Funnies from 'funnies'

export default {
  name: 'UploadProgressBar',
  props: {
    progress: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
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

<style lang="scss" scoped>
div {
  .loadingMessage {
    text-align: center;
    font-family: 'Fredoka One';
  }

  .progress {
    height: 3rem;
  }
}
</style>
