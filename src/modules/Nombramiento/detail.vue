<template>
  <div>User {{ formData}}</div>
</template>
<script>
  import axios from 'axios'

  export default {
    computed: {
    },
    data () {
      return {
        formData: {
          id: null
        }
      }
    },
    methods: {
      init: function () {
        this.formData.id = this.$route.params.id
        axios.get('contract/' + this.formData.id)
          .then(response => {
            this.formData = response.data
          })
          .catch()
      }
    },
    created () {
      this.init()
    }
  }
</script>
<style>
</style>
