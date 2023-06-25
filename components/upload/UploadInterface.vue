<template>
  <div v-if="done">
    <UploadResults :result="result" @reset="reset" />
  </div>
  <div v-else>
    <UploadUploaderComponent @success="onUploadSuccess" @failed="onUploadFailed" />
  </div>
</template>

<script setup lang="ts">
const done = ref(false);
const result = ref<{
  error: string | undefined,
  download_key: string | undefined,
  delete_key: string | undefined
}>({
  error: undefined,
  download_key: undefined,
  delete_key: undefined
})

const onUploadSuccess = (keys: {download_key: string, delete_key: string}) => {
  result.value = {
    download_key: keys.download_key,
    delete_key: keys.delete_key,
    error: undefined
  }
  done.value = true;
}

const onUploadFailed = (error: string) => {
  result.value = {
    download_key: undefined,
    delete_key: undefined,
    error: error
  }
  done.value = true;
}

const reset = () => {
  result.value = {
    download_key: undefined,
    delete_key: undefined,
    error: undefined
  }
  done.value = false
}
</script>
