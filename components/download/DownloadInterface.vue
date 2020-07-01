<template>
  <LoadingSchematicData />
</template>

<script>
import LoadingSchematicData from '~/components/LoadingSchematicData'
import AccessKeyMixin from '~/mixin/access-key-mixin'

export default {
  name: 'DownloadInterface',
  components: { LoadingSchematicData },
  mixins: [AccessKeyMixin],
}
</script>
