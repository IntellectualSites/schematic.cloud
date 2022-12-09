<template>
  <div v-if="uploading">
    <UploadProgressBar :progress="progress" />
  </div>
  <div v-else class="file-selector">
    <p class="welcome">
      Welcome to SchematicWeb! Please select the schematic that you want to
      upload:
    </p>
    <b-form-file v-model="schematic" @input="upload" />
    <p class="links">
      Click here to <nuxt-link to="/download">download</nuxt-link> a schematic,
      or here to <nuxt-link to="/delete">delete one</nuxt-link>.
    </p>
  </div>
</template>

<script>
import UploadProgressBar from '~/components/upload/UploadProgressBar'

export default {
  name: 'UploaderComponent',
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
          const resp = await this.$axios.post(
            `${(await this.$axios.get('/config.json')).data.api_url}/upload`,
            formData,
            {
              'Content-Type': 'multipart/form-data',
              onUploadProgress: (event) => {
                if (!event.lengthComputable) return
                this.progress = Math.round((event.loaded * 100) / event.total)
              },
            }
          )

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

<style lang="scss">
.file-selector {
  p {
    &.welcome {
      margin-bottom: 15px;
    }

    &.links {
      margin-top: 15px;
    }
  }
}
</style>
