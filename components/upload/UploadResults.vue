<template>
  <div>
    <div v-if="result.error">
      <p>{{ result.error }}</p>
    </div>
    <div v-else>
      <p>Your file was successfully uploaded to SchematicWeb!</p>
      <CopyableText name="Download Key" :value="result.download_key" />
      <CopyableText name="Delete Key" :value="result.delete_key" />
    </div>
    <b-button @click="$emit('reset')">Reset</b-button>
  </div>
</template>

<script>
import CopyableText from '~/components/upload/CopyableText'

export default {
  name: 'UploadResults',
  components: { CopyableText },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
}
</script>
