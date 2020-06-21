<template>
  <b-container>
    <b-card bg-variant="dark-transparent" text-variant="light">
      <b-card-title>
        <h1>Upload a schematic</h1>
      </b-card-title>
      <b-card-body>
        <FileUpload :target="uploadUrl" action="POST" alias="schematic" />
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import FileUpload from '~/components/FileUpload'
import config from '~/config'

export default {
  components: { FileUpload },
  computed: {
    uploadUrl() {
      return config.upload_url
    },
  },
}
</script>
