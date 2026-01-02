<template>
  <div>
    <LoadingSchematicData v-if="loading || state === 'unset'" />
    <IconScreen
      v-else-if="state === 'not_found'"
      icon="/icons/help-circle.svg"
      text="Schematic not found"
    />
    <IconScreen
      v-else-if="state === 'gone'"
      icon="/icons/trash-2.svg'"
      text="Schematic has already been deleted"
    />
    <IconScreen
      v-else-if="state === 'unknown'"
      icon="/icons/alert-triangle.svg"
      text="An unknown error has occurred"
    />
    <IconScreen v-else icon="/icons/check-circle.svg" :text="finalText" />
    <nuxt-link to="/" class="btn btn-secondary d-block w-100 mt-5"
      >Head Home</nuxt-link
    >
  </div>
</template>

<script>
import LoadingSchematicData from '~/components/LoadingSchematicData.vue'
import IconScreen from '~/components/IconScreen.vue'

export default {
  name: 'SchematicWorkflow',
  components: { LoadingSchematicData, IconScreen },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    state: {
      type: String,
      default: 'unset',
    },
    finalText: {
      type: String,
      required: true,
    },
  },
}
</script>
