<template>
  <DeleteInterface :access_key="$route.params.key" />
</template>

<script>
import DeleteInterface from '~/components/delete/DeleteInterface'

export default {
  components: { DeleteInterface },
}
</script>
