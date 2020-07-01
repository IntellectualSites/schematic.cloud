<template>
  <div>
    <fa class="icon" :icon="['fas', icon]" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'IconScreen',
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  text-align: center;

  .icon {
    font-size: 128px;
    margin-top: 20px;
  }

  p {
    font-family: 'Fredoka One';
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>
