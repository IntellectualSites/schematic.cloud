<template>
  <div>
    <div v-if="result.error" class="text">
      <b class="d-block py-4">{{ result.error }}</b>
    </div>
    <div v-else>
      <div
        class="modal fade bg-opacity-50 bg-dark show"
        :class="{
          'd-block': modal,
        }"
        tabindex="-1"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Really delete?</h1>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="toggleDeleteModal"
              ></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete the schematic? If you do this,
              your file will be immediately deleted from our server. This cannot
              be undone.
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-info"
                data-bs-dismiss="modal"
                @click="toggleDeleteModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="handleDeleteConfirm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text">
        <p>
          You'll only see these values once. Make sure to make note of these
          values if you ever need them. Most importantly, keep your delete key
          otherwise you won't be able to delete this schematic.
        </p>
      </div>
      <UploadCopyableText name="Download Key" :value="result.download_key" />
      <UploadCopyableText name="Delete Key" :value="result.delete_key" />
      <UploadCopyableText
        name="Download URL"
        :value="downloadUrl(result.download_key!)"
        :is-url="true"
        url-button-txt="Download"
        url-button-variant="success"
      />
      <UploadCopyableText
        name="Delete URL"
        :value="deleteUrl(result.delete_key!)"
        :is-url="true"
        url-button-txt="Delete"
        url-button-variant="danger"
      />
      <div class="row">
        <div class="col-6">
          <button
            class="btn btn-danger d-block w-100"
            @click="toggleDeleteModal"
          >
            Delete
          </button>
        </div>

        <div class="col-6">
          <button
            class="btn btn-success d-block w-100"
            @click="handleDownloadClick"
          >
            Download
          </button>
        </div>
      </div>
    </div>
    <button
      class="btn btn-secondary d-block w-100 mt-3"
      @click="emits('reset')"
    >
      Upload another File
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Config } from '~/types'

const modal = ref(false)
const emits = defineEmits(['reset'])

const props = defineProps({
  result: {
    type: Object as PropType<{
      download_key: string | undefined
      delete_key: string | undefined
      error: string | undefined
    }>,
    required: true,
  },
})

const downloadUrl = async (key: string) => {
  return `${(await $fetch<Config>('/config.json')).public_url}/download/${key}`
}

const deleteUrl = async (key: string) => {
  return `${(await $fetch<Config>('/config.json')).public_url}/delete/${key}`
}

const handleDownloadClick = async () => {
  await useRouter().push(`/download/${props.result!.download_key}`)
}

const toggleDeleteModal = () => {
  modal.value = !modal.value
}

const handleDeleteConfirm = async () => {
  await useRouter().push(`/delete/${props.result!.delete_key}`)
}
</script>
