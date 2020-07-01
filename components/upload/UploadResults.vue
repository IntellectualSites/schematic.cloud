<template>
  <div>
    <div v-if="result.error" class="error">
      <p>{{ result.error }}</p>
    </div>
    <div v-else>
      <CopyableText name="Download Key" :value="result.download_key" />
      <CopyableText name="Delete Key" :value="result.delete_key" />
    </div>
    <b-button block @click="$emit('reset')">Reset</b-button>
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
