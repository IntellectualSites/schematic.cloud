<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cols="8" class="mx-auto">
          <b-card bg-variant="dark-transparent" text-variant="light">
            <img src="~/assets/img/logo.png" alt="SchematicWeb" />
            <nuxt />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

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
}
</style>
