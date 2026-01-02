import { AxiosError } from 'axios'

// noinspection JSUnusedGlobalSymbols
export const useWorkflow = () => {
  const loading = ref(true)
  const state = ref<'success' | 'gone' | 'not_found' | 'unknown' | 'unset'>(
    'unset',
  )

  const url = async (path: string, key: string) => {
    return `${
      (await $fetch<{ api_url: string }>('/config.json')).api_url
    }/${path}/${key}`
  }

  const checkHeaders = async (url: string, stopLoading = true) => {
    try {
      await $fetch(url, {
        method: 'HEAD',
      })
      state.value = 'success'
    } catch (err) {
      let status
      if (err instanceof AxiosError && err.response) {
        status = err.response.status
      }

      switch (status) {
        case 404:
          state.value = 'not_found'
          break
        case 410:
          state.value = 'gone'
          break
        default:
          state.value = 'unknown'
          break
      }
    }

    if (stopLoading) {
      loading.value = false
    }
  }

  const downloadUrl = async (key: string) => await url('download', key)
  const deleteUrl = async (key: string) => await url('delete', key)
  const hasError = () => state.value && state.value !== 'success'

  return {
    loading,
    state,
    checkHeaders,
    downloadUrl,
    deleteUrl,
    hasError,
  }
}
