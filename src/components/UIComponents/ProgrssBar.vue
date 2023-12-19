<template>
  <div>
    <div class="progress" style="height: 40px;">
      <div class="progress-bar progress-bar-striped progress-bar-animated active" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="percentage"> <h3 style="margin-top: 4px">{{currentValue}}%</h3></div>
    </div>
    <div>
      <template v-if="!is_error">
        {{comment}}
        {{addtext}}
        <br>
        Por favor espere..
      </template>
      <template v-else>
        <div class="alert alert-danger">
          <strong>Hubo un problema!</strong> {{addtext}}
        </div>
      </template>

    </div>
  </div>
</template>
<script>
  export default{
    name: 'ProgressBar',
    props: {
      currentValue: String,
      addtext: String,
      is_error: Boolean
    },
    computed: {
      percentage: {
        get () {
          return 'width: ' + this.currentValue + '%'
        }
      },
      comment: {
        get () {
          return 'Generando Comprobante Contable en SAP B1...'
        }
      }
    }
  }
</script>
<style>
</style>
