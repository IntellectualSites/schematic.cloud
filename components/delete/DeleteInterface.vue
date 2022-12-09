<template>
  <SchematicWorkflow
    :loading="loading"
    :not-found="errors.notFound"
    :gone="errors.gone"
    :unknown="errors.unknown"
    final-text="Your schematic has been deleted."
  />
</template>

<script>
import SchematicWorkflow from '~/components/SchematicWorkflow'
import SchematicWorkflowMixin from '~/mixin/schematic-workflow-mixin'

export default {
  name: 'DeleteInterface',
  components: { SchematicWorkflow },
  mixins: [SchematicWorkflowMixin],
  async mounted() {
    await this.checkHeaders(await this.deleteUrl, false)

    if (this.hasError) {
      this.loading = false
      return
    }

    await this.delete()
  },
  methods: {
    async delete() {
      try {
        await this.$axios.delete(await this.deleteUrl)
        this.loading = false
      } catch (err) {
        let status = 500
        if (err.response) {
          status = err.response.status
        }

        if (status === 500) {
          this.errors.unknown = true
        } else {
          // eslint-disable-next-line
          console.error("Unexpected error code in delete handler. This should not happen.")
        }
      }
    },
  },
}
</script>
