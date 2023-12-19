<template>
    <div>
      <br>
      <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" v-on:click="$emit('Back')" >
          <span class="btn-label">
            <i class="fa fa-angle-double-left"></i>
          </span>
        Cancelar
      </button>
      <br>
      <br>
      <br>
      <crud-form v-bind="{url: urlRemove,formData: formDataRemove ,valid,tittle:'Desvincular a:',alert:true}" @validate="Validate">
        <div class="panel panel-info">
          <div class="panel-heading">
            Datos de la Persona
          </div>
          <div class="panel-body">
            <div class="row">
              <center>
                <h3> {{FullName}} <small>(ci: {{Document}})</small></h3>
                <h4>{{Positions}} de {{Dependency}}</h4>
              </center>
            </div>
          </div>
        </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            Información de la Desvinculación
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-4">
                <label>Motivo de la Desvinculación</label>
                <div>
                  <el-select class="select-info"
                             size="large"
                             placeholder="Seleccione Motivo"
                             v-model="CauseId">

                    <el-option v-for="option in selectMotivoBaja.values"
                               class="select-danger"
                               :value="option.Id"
                               :label="option.Name"
                               :key="option.Id">
                    </el-option>

                  </el-select>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label>Fecha Fin</label>
                <datepicker :typeable="false"
                            :bootstrap-styling="true"
                            :format="format" :language="es"
                            placeholder="Fecha Finalizacion"
                            v-model="EndDate">
                </datepicker>
              </div>
            </div>
          </div>
        </div>
      </crud-form>
    </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'

  export default {
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    computed: {
      CauseId: {
        get () {
          return this.$store.state.crud.formData.CauseId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CauseId', val: value})
        }
      },
      FullName: {
        get () {
          return this.$store.state.crud.formData.FullName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'FullName', val: value})
        }
      },
      Document: {
        get () {
          return this.$store.state.crud.formData.Document
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Document', val: value})
        }
      },
      Dependency: {
        get () {
          return this.$store.state.crud.formData.Dependency
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Dependency', val: value})
        }
      },
      Positions: {
        get () {
          return this.$store.state.crud.formData.Positions
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Positions', val: value})
        }
      },
      EndDate: {
        get () {
          return this.$store.state.crud.formData.EndDate
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'EndDate', val: (value.getMonth() + 1) + '-' + value.getDate() + '-' + value.getFullYear()})
        }
      }
    },
    data () {
      return {
        es: es,
        format: 'dd-MMM-yyyy',
        urlRemove: '/Contract/Baja',
        valid: false,
        formDataRemove: {
          Cause: null,
          FullName: null,
          CUNI: null,
          Document: '',
          EndDate: '',
          Dependency: '',
          Positions: ''
        },
        selectMotivoBaja: {
          select: '',
          values: [{Id: 'FIN CONTRATO', Name: 'Fin de Contrato'},
            {Id: 'RENUNCIA', Name: 'Renuncia'},
            {Id: 'JUBILACION', Name: 'Jubilación'},
            {Id: 'DESTITUCION', Name: 'Destitución'},
            {Id: 'FIN DESIGNACION', Name: 'Fin Designación'},
            {Id: 'MUERTE', Name: 'Muerte'},
            {Id: 'MODIFICACION', Name: 'Modificación'}]
        }
      }
    },
    methods: {
      init () {
        axios.get('/Contract/' + this.index, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
            .then(response => {
              console.log(response.data)
              this.FullName = response.data.FullName
              this.CUNI = response.data.CUNI
              this.Document = response.data.Document
              this.Positions = response.data.Positions
              this.Dependency = response.data.Dependency
            })
            .catch(error => console.log(error))
      },
      loadCause () {
        axios.get('/CauseOfMovement/Baja', {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(response.data)
            this.selectMotivoBaja = response.data
          })
          .catch(error => console.log(error))
      },
      Validate () {
        this.valid = true
      }
    },
    created () {
      let baseurl = '/Contract/Baja/'
      this.urlRemove = baseurl + this.index
      this.init()
      this.loadCause()
    },
    components: {
      Datepicker
    }
  }
</script>

<style scoped>

</style>
