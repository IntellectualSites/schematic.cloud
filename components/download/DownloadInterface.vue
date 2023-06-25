<template>
  <SchematicWorkflow
    :loading="loading"
    :state="state"
    final-text="Your schematic has been downloaded."
  />
</template>

<script setup lang="ts">
import {useWorkflow} from "~/mixin/workflow";

const { checkHeaders, downloadUrl, hasError, state, loading} = useWorkflow()

const props = defineProps({
  access_key: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  await checkHeaders(await downloadUrl(props.access_key!))
  if (hasError()) {
    return;
  }
  try {
    const link = document.createElement('a')
    link.href = await downloadUrl(props.access_key!)
    link.click()
    link.remove()
  } catch (err) {
    // eslint-disable-next-line
    console.error("Failed to download file. This should not happen.")
  }
})
</script>
