import AccessKeyMixin from './access-key-mixin'
import config from '~/config'

export default {
  mixins: [AccessKeyMixin],
  data() {
    return {
      loading: true,
      errors: {
        gone: false,
        notFound: false,
        unknown: false,
      },
    }
  },
  computed: {
    downloadUrl() {
      return this.url('download')
    },
    deleteUrl() {
      return this.url('delete')
    },
    hasError() {
      return this.errors.gone || this.errors.notFound || this.errors.unknown
    },
  },
  methods: {
    url(path) {
      return `${config.api_url}/${path}/${this.access_key}`
    },
    async checkHeaders(url, stopLoading) {
      try {
        await this.$axios.head(url)
      } catch (err) {
        let status
        if (err.response) {
          status = err.response.status
        }

        switch (status) {
          case 404:
            this.errors.notFound = true
            break
          case 410:
            this.errors.gone = true
            break
          default:
            this.errors.unknown = true
            break
        }
      }

      if (stopLoading) {
        this.loading = false
      }
    },
  },
}
