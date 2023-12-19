<template>
  <div class="panel panel-info" id="scrollhere">
    <div class="panel-heading">
      Movilidad Organizacional
    </div>
    <br>
    <div class="panel-body">
      <div class="row" v-if="hasContracts">
        <div class="form-group col-md-3">
          <label>Reemplazar cargo actual?</label>
          <div>
            <el-select class="select-info"
                       size="large"
                       placeholder="Seleccione Opcion"
                       v-model="replace">
              <el-option class="select-danger"
                         value= true
                         label="Reemplazar cargo Actual">
              </el-option>

              <el-option class="select-danger"
                         value= false
                         label="Crear actividad Paralela">
              </el-option>
            </el-select>
            <small v-if="formError.replace" class="form-text text-muted text-danger">*Selecciona un valor.</small>
          </div>
        </div>
        <template v-if="replace==='true'">
          <div class="form-group col-md-4">
            <label >Cargo Antiguo</label>
            <div >
              <el-select class="select-info"
                         size="large"
                         placeholder="Seleccione Cargo"
                         v-model="OldCotractsSelect.select">
                <el-option v-for="option in OldCotractsSelect.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Positions +' en '+ option.Cod +'-'+ option.Dependency"
                           :key="option.Id">
                </el-option>
              </el-select>
              <small v-if="formError.OldCotractsSelect" class="form-text text-muted text-danger">*Selecciona un valor.</small>
            </div>
          </div>
          <div class="form-group col-md-3">
            <label >Motivo del movimiento</label>
            <div >
              <el-select class="select-info"
                         size="large"
                         placeholder="Seleccione Motivo"
                         v-model="motivoCambio.select">
                <el-option v-for="option in motivoCambio.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
              <small v-if="formError.motivoCambio" class="form-text text-muted text-danger">*Selecciona un valor.</small>
            </div>
          </div>
        </template>
      </div>

      <add-contract-form :people-id="personId" :show-messages="showMessage" :external-valid="valid" v-on:ContractCreated="send"></add-contract-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  import AddContractForm from './AddContractForm'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        showMessage: false,
        formError: {
          replace: false,
          motivoCambio: false,
          OldCotractsSelect: false
        },
        url: '/Contract/GetPersonHistory',
        options: [],
        replace: null,
        OldCotractsSelect: {
          select: null,
          values: []
        },
        motivoCambio: {
          select: null,
          values: []
        }
      }
    },
    methods: {
      autoFocus () {
        document.getElementById('scrollhere').scrollIntoView()
      },
      history: function () {
        axios.get('/Contract/GetPersonHistory/' + this.personId + '?all=false')
          .then(response => {
            this.OldCotractsSelect.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadCause () {
        axios.get('/CauseOfMovement/Movement', {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.motivoCambio.values = response.data
          })
          .catch(error => console.log(error))
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      send: function (contract) {
        this.$store.commit('crud/loadSetter', true)
        let entorno = this
        if (this.valid && this.replace === 'true') {
          let fin = {
            EndDate: new Date(contract.StartDate - 86400 * 1000),
            Cause: this.motivoCambio.select
          }
          axios.post('/Contract/Baja/' + this.OldCotractsSelect.select, fin, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              entorno.clearData()
              entorno.$emit('refresh')
              entorno.successMessage()
              entorno.$store.commit('crud/loadSetter', false)
            })
            .catch(error => {
              console.log(error)
              entorno.errorMessage(error.response.data)
              entorno.$store.commit('crud/loadSetter', false)
            })
        }
        entorno.$emit('refresh')
        this.$store.commit('crud/loadSetter', false)
      },
      successMessage: function () {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      errorMessage: function (text) {
        swal({
          title: `Ups!`,
          text: 'Ocurrio un error!\n' + text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      },
      clearData: function () {
      }
    },
    created () {
      this.history()
      this.loadCause()
    },
    mounted () {
      this.autoFocus()
    },
    computed: {
      hasContracts: {
        get () {
          return this.OldCotractsSelect.values.length > 0
        }
      },
      valid: {
        get () {
          let x = true
          this.formError.replace = this.isEmptyBlanckOrNull(this.replace)
          if (this.replace === 'true') {
            this.formError.motivoCambio = this.isEmptyBlanckOrNull(this.motivoCambio.select)
            this.formError.OldCotractsSelect = this.isEmptyBlanckOrNull(this.OldCotractsSelect.select)
          } else {
            this.formError.motivoCambio = false
            this.formError.OldCotractsSelect = false
          }
          x = !(this.formError.replace || this.formError.motivoCambio || this.formError.OldCotractsSelect)
          return x
        }
      }
    },
    components: {
      AddContractForm
    }
  }
</script>

<style scoped>

</style>
