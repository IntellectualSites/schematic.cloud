<template>
  <SchematicWorkflow
    :loading="loading"
    :state="state"
    final-text="Your schematic has been downloaded."
  />
</template>

<script setup lang="ts">
import { useWorkflow } from '~/mixin/workflow'

const { checkHeaders, downloadUrl, hasError, state, loading } = useWorkflow()

const props = defineProps({
  accessKey: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await checkHeaders(await downloadUrl(props.accessKey!))
  if (hasError()) {
    return
  }
  try {
    const link = document.createElement('a')
    link.href = await downloadUrl(props.accessKey!)
    link.click()
    link.remove()
  } catch (err) {
    // eslint-disable-next-line
    console.error('Failed to download file. This should not happen.')
  }
})
</script>
