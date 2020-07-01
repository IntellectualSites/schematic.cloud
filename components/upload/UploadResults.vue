<template>
  <div>
    <div v-if="result.error" class="text">
      <p>{{ result.error }}</p>
    </div>
    <div v-else>
      <div class="text">
        <p>
          You'll only see these values once. Make sure to make note of these
          values if you ever need them. Most importantly, keep your delete key
          otherwise you won't be able to delete this schematic.
        </p>
      </div>
      <CopyableText name="Download Key" :value="result.download_key" />
      <CopyableText name="Delete Key" :value="result.delete_key" />
      <CopyableText
        name="Download URL"
        :value="downloadUrl(result.download_key)"
        :is-url="true"
        url-button-txt="Download"
        url-button-variant="success"
      />
      <CopyableText
        name="Delete URL"
        :value="deleteUrl(result.delete_key)"
        :is-url="true"
        url-button-txt="Delete"
        url-button-variant="danger"
      />
      <b-row>
        <b-col cols="6">
          <b-button variant="danger" block @click="handleDeleteClick">
            Delete
          </b-button>
        </b-col>
        <b-col cols="6">
          <b-button variant="success" block @click="handleDownloadClick">
            Download
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-button class="resetBtn" block @click="$emit('reset')"
      >Upload Another File</b-button
    >
  </div>
</template>

<script>
import CopyableText from '~/components/upload/CopyableText'
import config from '~/config'

export default {
  name: 'UploadResults',
  components: { CopyableText },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downloadUrl(key) {
      return `${config.public_url}/download/${key}`
    },
    deleteUrl(key) {
      return `${config.public_url}/delete/${key}`
    },
    async handleDeleteClick() {
      const result = await this.$bvModal.msgBoxConfirm(
        'Are you sure you want to delete the schematic? If you do this, your file will be immediately deleted from our server. This cannot be undone.',
        {
          title: 'Really delete?',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelVariant: 'info',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          centered: true,
          headerBgVariant: 'dark-transparent',
          headerTextVariant: 'light',
          headerBorderVariant: 'transparent',
          bodyBgVariant: 'dark-transparent',
          bodyTextVariant: 'light',
          footerBgVariant: 'dark-transparent',
          footerTextVariant: 'light',
          footerBorderVariant: 'transparent',
        }
      )

      if (result) {
        this.$router.push(`/delete/${this.result.delete_key}`)
      }
    },
    handleDownloadClick() {
      this.$router.push(`/download/${this.result.download_key}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.text {
  font-family: 'Fredoka One';
  margin-bottom: 20px;

  p {
    margin-bottom: 3px;
  }
}

.resetBtn {
  margin-top: 15px;
}
</style>
