<template>
  <div v-if="uploading">
    <UploadProgressBar :progress="progress" />
  </div>
  <b-form-file v-else v-model="schematic" @input="upload" />
</template>

<script>
import UploadProgressBar from '~/components/upload/UploadProgressBar'
import config from '~/config'

export default {
  name: 'Uploader',
  components: { UploadProgressBar },
  data() {
    return {
      schematic: undefined,
      uploading: false,
      progress: 0.0,
    }
  },
  computed: {
    readyForUpload() {
      return !!this.schematic
    },
  },
  methods: {
    async upload() {
      if (this.readyForUpload) {
        this.uploading = true

        const formData = new FormData()
        formData.append('schematic', this.schematic)

        try {
          const resp = await this.$axios.post(config.upload_url, formData, {
            'Content-Type': 'multipart/form-data',
            onUploadProgress: (event) => {
              if (!event.lengthComputable) return
              this.progress = Math.round((event.loaded * 100) / event.total)
            },
          })

          this.$emit('success', {
            download_key: resp.data.download_key,
            delete_key: resp.data.delete_key,
          })
        } catch (err) {
          let status
          if (err.response) {
            status = err.response.status
          }

          let error
          switch (status) {
            case 400:
              error =
                'The file you uploaded was not valid NBT, and so it has been rejected. Please upload a valid NBT file.'
              break
            case 500:
              error =
                'The file could not be saved at the server level, and so it your upload was rejected. Please try again, or report this issue to the developer.'
              break
            case undefined:
            default:
              error =
                'An unknown error occurred while trying to upload your file. Please try again, or report this issue to the developer.'
              break
          }

          this.$emit('failed', error)
        }

        this.uploading = false
      }
    },
  },
}
</script>
