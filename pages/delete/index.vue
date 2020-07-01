<template>
  <KeyForm
    placeholder="Enter Delete Key"
    button="Delete Schematic"
    path="/delete"
  />
</template>

<script>
import KeyForm from '~/components/KeyForm'

export default {
  components: { KeyForm },
}
</script>
