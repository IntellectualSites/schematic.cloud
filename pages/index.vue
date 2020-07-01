<template>
  <div>
    <b-card-body>
      <div v-if="uploading">
        <b-progress
          :value="this.percentComplete"
          :max="100.0"
          show-progress
          animated
        />
      </div>
      <div v-else-if="done">
        <div v-if="result.error">
          <p>{{ result.error }}</p>
        </div>
        <div v-else>
          <p>Your file was successfully uploaded to SchematicWeb!</p>
          <b-input-group>
            <b-input-group-prepend is-text>Download Key</b-input-group-prepend>
            <b-form-input v-model="result.download_key" disabled />
            <b-input-group-append>
              <b-button
                ref="dl_key_btn"
                :variant="btn_flags.download_key ? 'success' : 'info'"
                :disabled="btn_flags.download_key"
                @click="onCopy('dl_key_btn')"
                >{{ btn_flags.download_key ? 'Copied' : 'Copy' }}</b-button
              >
            </b-input-group-append>
          </b-input-group>
          <b-input-group>
            <b-input-group-prepend is-text>Delete Key</b-input-group-prepend>
            <b-form-input v-model="result.delete_key" disabled />
            <b-input-group-append>
              <b-button
                ref="del_key_btn"
                :variant="btn_flags.delete_key ? 'success' : 'info'"
                :disabled="btn_flags.delete_key"
                @click="onCopy('del_key_btn')"
                >{{ btn_flags.delete_key ? 'Copied' : 'Copy' }}</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
        <b-button @click="reset">Reset</b-button>
      </div>
      <div v-else>
        <b-form-file v-model="schematic" @input="upload" />
      </div>
    </b-card-body>
  </div>
</template>

<script>
import config from '~/config'

export default {
  data() {
    return {
      schematic: null,
      uploading: false,
      percentComplete: 0.0,
      done: false,
      result: {
        error: undefined,
        download_key: undefined,
        delete_key: undefined,
      },
      btn_flags: {
        download_key: false,
        delete_key: false,
      },
    }
  },
  computed: {
    uploadUrl() {
      return config.upload_url
    },
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
          const resp = await this.$axios.post(this.uploadUrl, formData, {
            'Content-Type': 'multipart/form-data',
            onUploadProgress: (event) => {
              if (!event.lengthComputable) {
                this.progress(undefined)
              }

              this.progress(Math.round((event.loaded * 100) / event.total))
            },
          })

          this.result.download_key = resp.data.download_key
          this.result.delete_key = resp.data.delete_key
        } catch (err) {
          let status
          if (err.response) {
            status = err.response.status
          }

          switch (status) {
            case 400:
              this.result.error =
                'The file you uploaded was not valid NBT, and so it has been rejected. Please upload a valid NBT file.'
              break
            case 500:
              this.result.error =
                'The file could not be saved at the server level, and so it your upload was rejected. Please try again, or report this issue to the developer.'
              break
            case undefined:
            default:
              this.result.error =
                'An unknown error occurred while trying to upload your file. Please try again, or report this issue to the developer.'
              break
          }
        }

        this.uploading = false
        this.done = true
      }
    },
    progress(percentComplete) {
      if (percentComplete) {
        this.percentComplete = percentComplete
      }
    },
    reset() {
      this.schematic = null
      this.uploading = false
      this.percentComplete = 0.0
      this.done = false
      this.result = {
        error: undefined,
        download_key: undefined,
        delete_key: undefined,
      }
    },
    async onCopy(ref) {
      switch (ref) {
        case 'dl_key_btn':
          try {
            await this.$copyText(this.result.download_key)
            this.btn_flags.download_key = true
            setTimeout(() => (this.btn_flags.download_key = false), 3000)
          } catch {
            console.error(
              'Failed to copy download key: ' + this.result.download_key
            )
          }
          break
        case 'del_key_btn':
          try {
            await this.$copyText(this.result.delete_key)
            this.btn_flags.delete_key = true
            setTimeout(() => (this.btn_flags.delete_key = false), 3000)
          } catch {
            console.error(
              'Failed to copy delete key: ' + this.result.delete_key
            )
          }
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-group-prepend {
  width: 23%; /*adjust as needed*/

  .input-group-text {
    width: 100%;
    overflow: hidden;
  }
}
</style>
