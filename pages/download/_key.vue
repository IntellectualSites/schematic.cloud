<template>
  <DownloadInterface :access_key="$route.params.key" />
</template>

<script>
import DownloadInterface from '~/components/download/DownloadInterface'

export default {
  components: { DownloadInterface },
}
</script>
