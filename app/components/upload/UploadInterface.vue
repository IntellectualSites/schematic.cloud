<template>
  <div v-if="result !== undefined">
    <UploadResults :result="result" @reset="reset" />
  </div>
  <div v-else>
    <UploadUploaderComponent
      @success="onUploadSuccess"
      @failed="onUploadFailed"
    />
  </div>
</template>

<script setup lang="ts">
const result = ref<UploadResult | undefined>(undefined)

const onUploadSuccess = (keys: {
  download_key: string
  delete_key: string
}) => {
  result.value = {
    success: true,
    download_key: keys.download_key,
    delete_key: keys.delete_key,
  }
}

const onUploadFailed = (error: string) => {
  result.value = {
    success: false,
    error,
  }
}

const reset = () => {
  result.value = undefined
}
</script>
