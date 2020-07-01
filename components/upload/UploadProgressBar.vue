<template>
  <b-progress :value="progress || 0.0" :max="max" show-progress animated />
</template>

<script>
export default {
  name: 'UploadProgressBar',
  props: {
    progress: {
      required: true,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
}
</script>
