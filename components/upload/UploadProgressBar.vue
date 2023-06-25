<template>
  <div>
    <p class="text-center">{{ message }}</p>
    <div class="progress" role="progressbar" aria-label="Upload progress" :aria-valuenow="progress || 0" aria-valuemin="0" :aria-valuemax="max" style="height: 3rem">
      <div class="progress-bar" :style="{
        'width': (progress || 0) + '%'
      }">
        {{ (progress || 0) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// noinspection TypeScriptCheckImport
import Funnies from "funnies";

defineProps({
  progress: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 100
  }
})

const message = ref<string>('loading schematic data')

onMounted(() => {
  const funnies = new Funnies();
  const updateMessage = () => message.value = funnies.message();
  setInterval(updateMessage, 3000)
  updateMessage()
})
</script>
