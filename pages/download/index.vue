<template>
  <KeyForm
    placeholder="Enter Download Key"
    button="Download Schematic"
    path="/download"
  />
</template>

<script>
import KeyForm from '~/components/KeyForm'

export default {
  components: { KeyForm },
}
</script>
