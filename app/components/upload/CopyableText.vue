<template>
  <div class="input-group mb-3">
    <span class="input-group-text" style="width: 20%">{{ name }}</span>
    <input type="text" class="form-control" :value="resolvedValue" disabled >
    <button
      class="btn"
      :class="{
        'btn-info': !active,
        'btn-success': active,
      }"
      type="button"
      :disabled="active"
      @click="onCopy"
    >
      {{ active ? 'Copied' : 'Copy' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import useClipboard from 'vue-clipboard3/dist/esm'

const active = ref<boolean>(false)
const resolvedValue = ref<string | undefined>(undefined)

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Object as PropType<string | PromiseLike<string>>,
    required: true,
  },
})

onMounted(async () => {
  resolvedValue.value =
    props.value instanceof Promise ? await props.value : props.value
})

const onCopy = async () => {
  try {
    await useClipboard().toClipboard(resolvedValue.value!)
    active.value = true
    setTimeout(() => (active.value = false), 3000)
  } catch (e) {
    console.error(`Failed to copy value: ${resolvedValue.value}`, e)
  }
}
</script>
