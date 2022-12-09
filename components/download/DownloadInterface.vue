<template>
  <SchematicWorkflow
    :loading="loading"
    :not-found="errors.notFound"
    :gone="errors.gone"
    :unknown="errors.unknown"
    final-text="Your schematic has been downloaded."
  />
</template>

<script>
import SchematicWorkflow from '~/components/SchematicWorkflow'
import SchematicWorkflowMixin from '~/mixin/schematic-workflow-mixin'

export default {
  name: 'DownloadInterface',
  components: { SchematicWorkflow },
  mixins: [SchematicWorkflowMixin],
  async mounted() {
    await this.checkHeaders(await this.downloadUrl, true)
    await this.download()
  },
  methods: {
    async download() {
      try {
        const file = (
          await this.$axios.get(await this.downloadUrl, {
            responseType: 'arraybuffer',
          })
        ).data
        const blob = new Blob([file])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${Date.now()}.schematic`
        link.click()
      } catch (err) {
        // eslint-disable-next-line
        console.error("Failed to download file. This should not happen.")
      }
    },
  },
}
</script>
