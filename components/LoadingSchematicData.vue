<template>
  <div>
    <b-spinner class="loading" />
    <p>{{ loadingMessage }}</p>
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

<style lang="scss" scoped>
$spinner: 5rem;
$padding: 30px;

div {
  padding-top: $padding;

  .loading {
    width: $spinner;
    height: $spinner;
    margin: 0 auto;
    display: block;
  }

  p {
    text-align: center;
    font-family: 'Fredoka One';
    padding-top: $padding;
  }
}
</style>
