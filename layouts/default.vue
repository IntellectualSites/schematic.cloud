<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cols="8" class="mx-auto">
          <b-card bg-variant="dark-transparent" text-variant="light">
            <nuxt-link to="/">
              <img src="~/assets/img/logo.png" alt="SchematicWeb" />
            </nuxt-link>
            <nuxt />
            <template #footer>
              <p class="footerText">
                SchematicWeb version {{ version }}. Made with
                <fa :icon="['fas', 'heart']" /> by
                <a href="https://github.com/intellectualsites" target="_blank"
                  >IntellectualSites</a
                >
              </p>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import config from '~/config'

export default {
  data() {
    return {
      version: 'loading',
    }
  },
  async mounted() {
    try {
      this.version = (await this.$axios.get(config.api_url)).data.version
    } catch (e) {
      this.version = 'unknown'
    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  background-image: url('~assets/img/background.svg');
  background-position: center;
  background-size: cover;
  min-height: 100vh;

  .row {
    padding-top: 100px;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .footerText {
    text-align: center;
    margin: 0;
  }
}
</style>
