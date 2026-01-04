<template>
  <SchematicWorkflow
    :loading="loading"
    :state="state"
    final-text="Your schematic has been deleted."
  />
</template>

<script setup lang="ts">
const { checkHeaders, deleteUrl, hasError, state, loading } = useWorkflow()

const props = defineProps({
  accessKey: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await checkHeaders(await deleteUrl(props.accessKey!), false)
  if (hasError()) {
    loading.value = false
    return
  }
  await deleteSchematic()
})

const deleteSchematic = async () => {
  try {
    await $fetch(await deleteUrl(props.accessKey!), {
      method: 'DELETE',
    })
  } catch (err) {
    state.value = 'unknown'
    console.error('Failed to delete schematic', err)
  }

  loading.value = false
}
</script>
