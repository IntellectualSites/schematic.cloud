<template>
  <div v-if="done">
    <UploadResults :result="result" @reset="reset" />
  </div>
  <div v-else>
    <Uploader @success="success" @failed="failed" />
  </div>
</template>

<script>
import UploadResults from '~/components/upload/UploadResults'
import Uploader from '~/components/upload/Uploader'

export default {
  name: 'UploadInterface',
  components: { UploadResults, Uploader },
  data() {
    return {
      done: false,
      result: {
        error: undefined,
        download_key: undefined,
        delete_key: undefined,
      },
    }
  },
  methods: {
    success(keys) {
      this.result.download_key = keys.download_key
      this.result.delete_key = keys.delete_key
      this.done = true
      this.uploading = false
    },
    failed(error) {
      this.result.error = error
      this.done = true
      this.uploading = false
    },
    reset() {
      this.done = false
      this.uploading = false
      this.progress = 0.0
      this.result = {
        error: undefined,
        download_key: undefined,
        delete_key: undefined,
      }
    },
  },
}
</script>
