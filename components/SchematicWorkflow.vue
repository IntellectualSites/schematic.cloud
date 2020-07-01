<template>
  <div>
    <LoadingSchematicData v-if="loading" />
    <IconScreen
      v-else-if="notFound"
      icon="question-circle"
      text="Schematic not found"
    />
    <IconScreen
      v-else-if="gone"
      icon="trash-alt"
      text="Schematic has already been deleted"
    />
    <IconScreen
      v-else-if="unknown"
      icon="exclamation-triangle"
      text="An unknown error has occurred"
    />
    <IconScreen v-else icon="check-circle" :text="finalText" />
    <b-button to="/" block>Head Home</b-button>
  </div>
</template>

<script>
import LoadingSchematicData from '~/components/LoadingSchematicData'
import IconScreen from '~/components/IconScreen'

export default {
  name: 'SchematicWorkflow',
  components: { LoadingSchematicData, IconScreen },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    notFound: {
      type: Boolean,
      default: false,
    },
    gone: {
      type: Boolean,
      default: false,
    },
    unknown: {
      type: Boolean,
      default: false,
    },
    finalText: {
      type: String,
      required: true,
    },
  },
}
</script>
