<template>
  <div>
  <template v-if="!canEditForm">
    <div class="alert alert-danger">
      <strong>Ojo!</strong> No se puede dar de baja este registro.
    </div>
  </template>
  <template v-else>
  <div v-if="ContractIds.length>0" class="panel panel-info">
    <div class="panel-body" id="scrollhere">
      <template v-if="moreThanOne">
        <div class="alert alert-danger">
          <strong>Ojo!</strong> Esta persona tiene mas de una ubicacion activa. Por favor seleccionar cuales dar de baja.
        </div>
        <h5>Seleccione las ubicaciones que quiere dar de baja:</h5>

        <div style="margin-left: 30%">
          <span v-for="item in ContractIds">
            <input type="checkbox" :value="item.Id" v-model="selectedContracts"> <span class="checkbox-label"> {{item.Positions}} en {{item.Dependency}} </span> <br>
          </span>
          <br>
        </div>
      </template>
      <template v-else>
        <div style="text-align: center"><h3>{{ContractIds[0].Positions}} en {{ContractIds[0].Dependency}}</h3></div>
      </template>
      <div class="row">
        <div class="form-group col-md-4 col-md-offset-3">
          <label>Fecha Desvinculacion</label>
          <datepicker :typeable="false"
                      :bootstrap-styling="true"
                      :format="format" :language="es"
                      placeholder="Fecha Inicio"
                      v-model="contract.EndDate">
          </datepicker>
          <small v-if="formError.EndDate.active" class="form-text text-muted text-danger">{{formError.EndDate.message}}</small>
        </div>
        <div class="form-group col-md-4 col-md-offset-0">
          <label >Motivo de la Desvinculacion</label>
          <div >
            <el-select class="select-info"
                       size="large"
                       autofocus
                       placeholder="Seleccione Motivo"
                       v-model="motivoCambio.select">
              <el-option v-for="option in motivoCambio.values"
                         class="select-danger"
                         :value="option.Id"
                         :label="option.Name"
                         :key="option.Id">
              </el-option>
            </el-select>
            <small v-if="formError.Cause.active" class="form-text text-muted text-danger">{{formError.Cause.message}}</small>
          </div>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-danger" @click="$emit('cancel')">Cancelar</button>
        <button class="btn btn-success pull-right" @click="send()">Enviar</button>
      </div>
    </div>
  </div>
  </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import { ModelSelect } from 'vue-search-select'
  import swal from 'sweetalert2'

  export default {
    props: {
      ContractIds: {
        type: Array,
        required: true
      },
      PersonId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        selectedContracts: [],
        formError: {
          EndDate: {
            active: false,
            message: '*Selecciona una Fecha'
          },
          Cause: {
            active: false,
            message: '*Selecciona un motivo'
          }
        },
        contract: {
          EndDate: null,
          Cause: null
        },
        es: es,
        format: 'dd-MMM-yyyy',
        options: [],
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
      loadCause () {
        axios.get('/CauseOfMovement/Baja', {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.motivoCambio.values = response.data
          })
          .catch(error => console.log(error))
      },
      valid: function () {
        let x = true
        let endDate = this.contract.EndDate
        this.formError.EndDate.active = this.isEmptyBlanckOrNull(this.contract.EndDate)
        this.ContractIds.forEach(function (val) {
          x = x && new Date(val.StartDate) <= endDate
        })
        if (!x) {
          this.formError.EndDate.message = '*Esta fecha no puede ser menor a ninguna de las ubicaciones seleccionadas'
        }
        this.formError.EndDate.active = !x || this.formError.EndDate.active
        this.formError.Cause.active = this.isEmptyBlanckOrNull(this.contract.Cause)
        x = x && this.formError.Cause.active
        return x
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      send: function () {
        this.$store.commit('crud/loadSetter', true)
        let entorno = this
        if (this.valid()) {
          let fin = {
            EndDate: this.contract.EndDate,
            Cause: this.motivoCambio.select,
            PeopleId: this.personId
          }
          if (!this.moreThanOne) {
            this.selectedContracts.push(this.ContractIds[0].Id)
          }
          console.log(this.selectedContracts)
          this.selectedContracts.forEach(function (element) {
            axios.post('/Contract/Baja/' + element, fin, {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
              .then(response => {
                // refresh data
                entorno.clearData()
                entorno.$emit('refresh')
                entorno.$emit('cancel')
                entorno.$store.commit('crud/loadSetter', false)
                entorno.successMessage()
              })
              .catch(error => {
                console.log(error)
                entorno.$store.commit('crud/loadSetter', false)
                entorno.errorMessage(error.response.data.Message)
              })
          })
        } else {
          // send message
          entorno.$store.commit('crud/loadSetter', false)
        }
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
        this.contract.EndDate = null
        this.motivoCambio.select = null
      }
    },
    created () {
      this.loadCause()
    },
    mounted () {
      this.autoFocus()
    },
    computed: {
      canEditForm: {
        get () {
          let x = true
          let today = new Date()
          this.ContractIds.forEach(function (val) {
            // let
            x = x && (val.EndDate === '' || val.EndDate === null || new Date(val.EndDate) >= today)
          })
          return x
        }
      },
      moreThanOne: {
        get () {
          return this.ContractIds.length > 1
        }
      }
    },
    components: {
      Datepicker,
      ModelSelect
    }
  }
</script>

<style scoped>

</style>
