<template>
  <div class="text-center">
    <img :src="icon" class="mt-3" style="width: 55px" alt="Icon indicating status" />
    <b class="mt-2 d-block">{{ text }}</b>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>
