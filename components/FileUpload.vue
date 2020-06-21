<template>
  <input type="file" name="fileUpload" @change="onFileChange" />
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    target: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      default: 'POST',
    },
    alias: {
      type: String,
      default: 'file',
    },
  },
  data() {
    return {
      file: null,
    }
  },
  methods: {
    emitter(event, data) {
      this.$emit(event, data)
    },
    uploadProgress(oEvent) {
      const vm = this
      if (oEvent.lengthComputable) {
        const percentComplete = Math.round((oEvent.loaded * 100) / oEvent.total)
        vm.emitter('progress', percentComplete)
      } else {
        // Unable to compute progress information since the total size is unknown
        vm.emitter('progress', false)
      }
    },
    getCookie(name) {
      let arr
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    onFileChange(e) {
      const vm = this

      if (!this.target || this.target === '') {
        // eslint-disable-next-line no-console
        console.log('Please provide the target url')
      } else if (!this.action || this.action === '') {
        // eslint-disable-next-line no-console
        console.log('Please provide file upload action ( POST / PUT )')
      } else if (this.action !== 'POST' && this.action !== 'PUT') {
        // eslint-disable-next-line no-console
        console.log('File upload component only allows POST and PUT Actions')
      } else {
        const files = e.target.files || e.dataTransfer.files

        if (!files.length) {
          return
        }

        /* global FormData XMLHttpRequest:true */
        /* eslint no-undef: "error" */

        this.file = files[0]
        const formData = new FormData()
        formData.append(this.alias, this.file)
        const xhr = new XMLHttpRequest()
        xhr.open(this.action, this.target)

        xhr.setRequestHeader('X-XSRF-TOKEN', vm.getCookie('XSRF-TOKEN'))

        xhr.onloadstart = function (e) {
          vm.emitter('start', e)
        }
        xhr.onloadend = function (e) {
          vm.emitter('finish', e)
        }
        xhr.upload.onprogress = vm.uploadProgress
        xhr.send(formData)
      }
    },
  },
}
</script>
