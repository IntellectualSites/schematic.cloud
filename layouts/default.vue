<template>
  <div id="app">
    <b-navbar
      id="navbar"
      toggleable="lg"
      type="dark"
      variant="dark-transparent"
    >
      <b-container>
        <b-navbar-brand id="brand" to="/">SchematicWeb</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">
              Home
            </b-nav-item>
            <b-nav-item to="/help">
              Help
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
#app {
  background-image: url('~assets/img/background.svg');
  background-position: center;
  background-size: cover;
  min-height: 100vh;

  #navbar {
    margin-bottom: 30px;
    color: $light;

    #brand {
      font-family: 'Roboto';
      font-size: 1.5em;
    }
  }
}
</style>
