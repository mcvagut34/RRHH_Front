<template>
  <div v-if="!isFetching">
      <div class="panel-body">
        <div class="row">
          <div class="form-group col-md-5">
            <label>Dependencia</label>
            <div>
              <model-select class="select-info fixI"
                            :options="options"
                            v-model="contract.DependencyId"
                            placeholder="Seleccione una Dependencia">
              </model-select>
              <small v-if="formError.DependencyId.active" class="form-text text-muted text-danger">{{formError.DependencyId.message}}</small>
            </div>
          </div>

          <div class="form-group col-md-3">
            <label >Cargo</label>
            <div >
              <model-select class="select-info fixI"
                            :options="PositionsOptions"
                            v-model="contract.PositionsId"
                            placeholder="Seleccione un Cargo">
              </model-select>
              <small v-if="formError.PositionsId.active" class="form-text text-muted text-danger">{{formError.PositionsId.message}}</small>
            </div>
          </div>

          <div class="form-group col-md-3">
            <label >Descripcion del Cargo</label>
            <div >
              <input type="text" placeholder="Descripcion del Cargo" class="form-control" v-model="contract.PositionDescription"  style="text-transform:uppercase">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-4">
            <label>Dedicacion</label>
            <div>
              <el-select class="select-info"
                         size="large"
                         placeholder="Seleccione Dedicacion"
                         v-model="contract.Dedication">

                <el-option v-for="option in selectDedication.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>

              </el-select>
              <small v-if="formError.Dedication.active" class="form-text text-muted text-danger">{{formError.Dedication.message}}</small>
            </div>
          </div>

          <div class="form-group col-md-3 col-md-offset-1">
            <label>Vinculacion</label>
            <div>
              <el-select class="select-info"
                         size="large"
                         :disabled="disableLinkageSelectbox"
                         placeholder="Seleccione Vinculacion"
                         v-model="contract.Linkage">
                <el-option v-for="option in selectLinkage.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
              <small v-if="formError.Linkage.active" class="form-text text-muted text-danger">{{formError.Linkage.message}}</small>
            </div>
          </div>

          <div class="form-group col-md-3 ">
            <label>Interinato?</label>
            <div>
              <input type="checkbox" placeholder="Nombres" class="form-control" v-model="contract.AI">
            </div>
          </div>

        </div>

        <div class="row" v-if="isDesignated">
          <div class="form-group col-md-4 ">
            <label>Numero de Gestion</label>
            <div>
              <input type="text" placeholder="Numero de Gestion" class="form-control" v-model="contract.NumGestion">
            </div>
            <small v-if="formError.NumGestion.active" class="form-text text-muted text-danger">{{formError.NumGestion.message}}</small>
          </div>
          <div class="form-group col-md-4 ">
            <label>Respaldo</label>
            <div>
              <input type="text" placeholder="Respaldo" class="form-control" v-model="contract.Respaldo">
            </div>
            <small v-if="formError.Respaldo.active" class="form-text text-muted text-danger">{{formError.Respaldo.message}}</small>
          </div>
          <div class="form-group col-md-4 ">
            <label>Comunicado</label>
            <div>
              <input type="text" placeholder="Comunicado" class="form-control" v-model="contract.Comunicado">
            </div>
            <small v-if="formError.Comunicado.active" class="form-text text-muted text-danger">{{formError.Comunicado.message}}</small>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label>Fecha Inicio</label>
            <datepicker :typeable="false"
                        :bootstrap-styling="true"
                        :format="format" :language="es"
                        placeholder="Fecha Inicio"
                        v-model="contract.StartDate">
            </datepicker>
            <small v-if="formError.StartDate.active" class="form-text text-muted text-danger">{{formError.StartDate.message}}</small>
          </div>

          <div v-if="showEndDate" class="form-group col-md-4">
            <label>Fecha Fin</label>
            <datepicker :typeable="false"
                        :bootstrap-styling="true"
                        :format="format" :language="es"
                        :initialView="initialview"
                        placeholder="Fecha Finalizacion"
                        v-model="contract.EndDate">
            </datepicker>
            <small v-if="formError.EndDateNombramiento.active" class="form-text text-muted text-danger">{{formError.EndDate.message}}</small>
          </div>

          <div v-if="isDesignated" class="form-group col-md-4" readonly>
            <label>Fecha Fin Nombramiento</label>
            <datepicker :typeable="false"
                        :bootstrap-styling="true"
                        :format="format" :language="es"
                        :initialView="initialview"
                        placeholder="Fecha Fin Nombramiento"
                        v-model="contract.EndDateNombramiento">
            </datepicker>
            <small v-if="formError.EndDateNombramiento.active" class="form-text text-muted text-danger">{{formError.EndDateNombramiento.message}}</small>
          </div>

        </div>

        <div class="row">
          <div class="form-group col-md-6">
              <label>Seguimiento</label>
              <div>
                <textarea type="text" placeholder="Seguimiento" class="form-control" v-model="contract.Seguimiento" />
              </div>
          </div>

          <div class="form-group col-md-4 col-md-offset-1">
            <div>
              <label>Valido para:</label>
              <div>
                <el-select class="select-info"
                           size="large"
                           v-model="modelValid">

                  <el-option v-for="option in selectValid.values"
                             class="select-danger"
                             :value="option.Id"
                             :label="option.Name"
                             :key="option.Id">
                  </el-option>

                </el-select>
                <small v-if="formError.DependencyId.active" class="form-text text-muted text-danger">{{formError.DependencyId.message}}</small>
              </div>
            </div>
          </div>


        </div>

      </div>
      <!--button class="btn btn-success btn-block" @click="send()">Guardar</button-->

      <button class="btn btn-danger" @click="clearFormData()">Cancelar</button>
      <button class="btn btn-success pull-right" @click="send()">Guardar</button>
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
      PeopleId: {
        type: Number,
        required: true
      },
      ShowMessages: {
        type: Boolean,
        default: true
      },
      ExternalValid: {
        type: Boolean,
        default: true
      },
      ContractId: {
        type: Number,
        default: -1
      }
    },
    watch: {
      possitionWath: function (newval, oldval) {
        if (newval !== null /* && this.ContractId === -1 */) { // esta condición está bien suponiendo que no hay valores de entrada, no siempre es así
          let pos = null
          pos = this.FindPositionByCode(newval)
          console.log(pos)
          if (pos.DefaultLinkage !== null) {
            this.contract.Linkage = pos.DefaultLinkage
            this.disableLinkageSelectbox = true
          } else {
            console.log('default linkage is null')
            this.disableLinkageSelectbox = false
            // this.contract.Linkage = null
          }
          if (newval === 26) {
            // this.contract.Linkage = 3
            this.contract.Dedication = 'TH'
            this.contract.PositionDescription = 'DOCENTE TIEMPO HORARIO'
          }
          if (pos.IsDesignated) {
            this.isDesignated = true
            this.contract.EndDateNombramiento = this.contract.EndDate
          } else {
            this.isDesignated = false
            this.contract.ComentariosDesignacion = null
            this.contract.NumDesignacion = null
            this.contract.EndDateNombramiento = null
          }
        }
      },
      ContractIdWatch: function () {
        this.init()
      },
      ContractEndDateWatch: function () {
        if (this.isDesignated) {
          this.contract.EndDateNombramiento = this.contract.EndDate
        }
      }
    },
    data () {
      return {
        selectValid: {
          values: [{Id: 'S', Name: 'Sólo Salomon (Planillas)'},
            {Id: 'L', Name: 'Sólo Listados'},
            {Id: 'LYS', Name: 'Ambos'}]
        },
        modelValid: 'LYS',
        auxCUNI: '',
        auxTexto: 'Buen trabajo!',
        // date picker ---
        isFetching: true,
        disableLinkageSelectbox: false,
        canEdit: false,
        es: es,
        format: 'dd-MMM-yyyy',
        initialview: 'year',
        urlAdd: '/Contract/Alta',
        // stetic
        FullName: '',
        readonly: true,
        // end stetic
        isDesignated: false,
        contract: {
          Document: null,
          DependencyId: null,
          PositionsId: null,
          PositionDescription: null,
          Dedication: null,
          Linkage: null,
          StartDate: null,
          EndDate: null,
          AI: false,
          CUNI: null,
          PeopleId: null,
          NumGestion: null,
          Seguimiento: null,
          Respaldo: null,
          Comunicado: null
        },
        formError: {
          Document: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          DependencyId: {
            active: false,
            message: '*Por favor selecciona un valor.'
          },
          AI: {
            active: false,
            message: '*Por favor selecciona un valor.'
          },
          PositionsId: {
            active: false,
            message: '*Por favor selecciona un valor.'
          },
          PositionDescription: {
            active: false,
            message: ''
          },
          Dedication: {
            active: false,
            message: '*Por favor selecciona un valor.'
          },
          Linkage: {
            active: false,
            message: '*Por favor selecciona un valor.'
          },
          StartDate: {
            active: false,
            message: '*Por favor selecciona una fecha.'
          },
          EndDate: {
            active: false,
            message: '*Por favor selecciona una fecha menor a la fecha de inicio.'
          },
          PeopleId: {
            active: false,
            message: '*Por favor busca una persona.'
          },
          NumGestion: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          Seguimiento: {
            active: false,
            message: ''
          },
          Respaldo: {
            active: false,
            message: ''
          },
          Comunicado: {
            active: false,
            message: ''
          },
          EndDateNombramiento: {
            active: false,
            message: ''
          }
        },
        DepencencySelect: {
          select: '',
          values: []
        },
        options: [],
        PositionsOptions: [],
        PositionSelect: {
          select: '',
          values: []
        },
        BranchesSelect: {
          select: '',
          values: []
        },
        selectDedication: {
          select: '',
          values: [{Id: 'MT', Name: 'Medio Tiempo'},
            {Id: 'TC', Name: 'Tiempo Completo'},
            {Id: 'TH', Name: 'Tiempo Horario'}]
        },
        selectLinkage: {
          select: '',
          values: []
        }
      }
    },
    computed: {
      showEndDate: {
        get () {
          return this.contract.Linkage != null && (this.contract.Linkage !== 1)
        }
      },
      possitionWath: {
        get () {
          return this.contract.PositionsId
        }
      },
      ContractIdWatch: {
        get () {
          return this.ContractId
        }
      },
      ContractEndDateWatch: {
        get () {
          return this.contract.EndDate
        }
      }
    },
    methods: {
      FindPositionByCode: function (id) {
        return this.PositionSelect.values.filter(
          function (data) {
            return data.Id === id
          }
        )[0]
      },
      successMessage: function () {
        swal({
          title: `Buen trabajo!`,
          text: this.auxTexto,
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
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      valid: function () {
        let x = true
        this.formError.DependencyId.active = this.isEmptyBlanckOrNull(this.contract.DependencyId)
        this.formError.PositionsId.active = this.isEmptyBlanckOrNull(this.contract.PositionsId)
        this.formError.Dedication.active = this.isEmptyBlanckOrNull(this.contract.Dedication)
        this.formError.Linkage.active = this.isEmptyBlanckOrNull(this.contract.Linkage)
        this.formError.StartDate.active = this.isEmptyBlanckOrNull(this.contract.StartDate)
        this.formError.EndDate.active = this.showEndDate && this.isEmptyBlanckOrNull(this.contract.StartDate) || Date.parse(this.contract.EndDate) < Date.parse(this.contract.StartDate)
        this.formError.EndDateNombramiento.active = this.isDesignated && Date.parse(this.contract.EndDateNombramiento) < Date.parse(this.contract.EndDate)
        if (Date.parse(this.contract.EndDate) < Date.parse(this.contract.StartDate)) {
          this.formError.EndDate.message = '*Esta fecha no puede ser menor a la fecha Inicio'
        }
        if (Date.parse(this.contract.EndDateNombramiento) < Date.parse(this.contract.EndDate)) { // condición de validación
          this.formError.EndDateNombramiento.message = 'Esta fecha no puede ser menor a la fecha fin del contrato'
        }
        if (this.isDesignated) {
          this.formError.NumGestion.active = this.isEmptyBlanckOrNull(this.contract.NumGestion)
        }
        this.formError.PeopleId.active = this.isEmptyBlanckOrNull(this.PeopleId)
        x = !(!x || this.formError.DependencyId.active ||
          this.formError.PositionsId.active ||
          this.formError.Dedication.active ||
          this.formError.Linkage.active ||
          this.formError.StartDate.active ||
          this.formError.EndDate.active ||
          this.formError.PeopleId.active ||
          this.formError.NumGestion.active)
        console.log(x)
        return x && this.ExternalValid
      },
      send () {
        if (this.ContractId === -1) {
          this.post()
          console.log('EndDateNombramiento: ' + this.formError.EndDateNombramiento.active)
        } else {
          this.put()
        }
      },
      post () {
        this.$store.commit('crud/loadSetter', true)
        let entorno = this
        console.log('post in component')
        if (this.valid()) {
          this.contract.PeopleId = this.PeopleId
          axios.post('/Contract/Alta/' + this.modelValid, this.contract, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              // handle success
              console.log('/CheckFechaIngreso/' + this.auxCUNI)
              axios.get('/CheckFechaIngreso/' + this.auxCUNI)
                .then(response => {
                  this.auxTexto = response.data
                  console.log('si no no lo sabemos')
                  entorno.$store.commit('crud/loadSetter', false)
                  if (this.ShowMessages) entorno.successMessage()
                  this.$emit('ContractCreated', entorno.contract)
                  entorno.clearFormData()
                })
                .catch(error => console.log(error))
            })
            .catch(error => {
              // handle error
              console.log(error)
              entorno.$store.commit('crud/loadSetter', false)
              if (this.ShowMessages) entorno.errorMessage(error.response.data.Message)
            })
        } else {
          this.$store.commit('crud/loadSetter', false)
        }
      },
      put () {
        if (this.canEdit) {
          console.log(this.contract)
          delete this.contract.Dependency
          delete this.contract.Branches
          delete this.contract.Positions
          console.log(this.contract)

          this.$store.commit('crud/loadSetter', true)
          let entorno = this
          if (this.valid()) {
            this.contract.PeopleId = this.PeopleId
            axios.put('/Contract/' + this.ContractId + '/' + this.modelValid, this.contract, {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
              .then(response => {
                // handle success
                entorno.$store.commit('crud/loadSetter', false)
                if (this.ShowMessages) entorno.successMessage()
                this.$emit('ContractCreated', entorno.contract)
                entorno.clearFormData()
              })
              .catch(error => {
                // handle error
                console.log(error)
                entorno.$store.commit('crud/loadSetter', false)
                if (this.ShowMessages) entorno.errorMessage(error.response.data.Message)
              })
          } else {
            this.$store.commit('crud/loadSetter', false)
          }
        } else {
          this.errorMessage('Su usuario no cuenta con los permisos para hacer este cambio')
        }
      },
      checkPermisions: function () {
        let access = JSON.parse(localStorage.getItem('Menu'))
        let found = access.find(function (element) {
          return element.name === 'GPS'
        })
        let child = found.children.find(function (element) {
          return element.name === 'ABM'
        })
        this.canEdit = child.methods.includes('PUT')
      },
      clearFormData  () {
        this.contract.Document = null
        this.contract.DependencyId = null
        this.contract.PositionsId = null
        this.contract.PositionDescription = null
        this.contract.Dedication = null
        this.contract.Linkage = null
        this.contract.StartDate = null
        this.contract.EndDate = null
        this.contract.CUNI = null
        this.contract.Seguimiento = null
        this.contract.NumGestion = null
        this.contract.Respaldo = null
        this.contract.Comunicado = null
        this.FullName = null
        // this.ContractId = -1
      },
      cleanText (text) {
        return text.split(' ').join('').toUpperCase()
      },
      getCUNI () {
        axios.get('/getCUNI/' + this.PeopleId)
          .then(response => {
            this.auxCUNI = response.data
          })
          .catch(error => console.log(error))
      },
      loadDependency () {
        let op = this.options
        axios.get('dependency/')
          .then(response => {
            response.data.forEach(function (element) {
              // console.log(element)
              op.push({value: element.Id, text: element.Cod + '-' + element.Name})
            })
          })
          .catch(error => console.log(error))
      },
      loadLinkage () {
        axios.get('TableOfTables/Linkage/')
          .then(response => {
            this.selectLinkage.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadBranches () {
        axios.get('branches/')
          .then(response => {
            this.BranchesSelect.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadposition () {
        let op = this.PositionsOptions
        axios.get('positions/')
          .then(response => {
            console.log(response.data)
            this.PositionSelect.values = response.data
            response.data.forEach(function (element) {
              // console.log(element)
              op.push({value: element.Id, text: element.Cod + ' - ' + element.Name})
            })
          })
          .catch(error => console.log(error))
        this.isFetching = false
        console.log(this.PositionsOptions)
        console.log('isFetching: ' + this.isFetching)
      },
      init () {
        if (this.ContractId === -1) {
          this.contract = {
            Document: null,
            DependencyId: null,
            PositionsId: null,
            PositionDescription: null,
            Dedication: null,
            Linkage: null,
            StartDate: null,
            EndDate: null,
            AI: false,
            CUNI: null,
            PeopleId: null,
            NumGestion: null,
            Seguimiento: null,
            Respaldo: null,
            Comunicado: null,
            EndDateNombramiento: null
          }
        } else {
          axios.get('contract/' + this.ContractId)
            .then(response => {
              this.contract = response.data
              console.log(response.data)
              console.log(response.data.Linkage)
              this.modelValid = response.data.ValidoPara
              console.log('Estito: ' + response.data.ValidoPara)
              this.hasContract = true
            })
            .catch(this.hasContract = false)
        }
      }
    },
    created () {
      this.contract.PeopleId = this.PeopleId
      this.loadDependency()
      this.loadBranches()
      this.loadLinkage()
      this.loadposition()
      this.init()
      this.checkPermisions()
      this.getCUNI()
    },
    components: {
      Datepicker,
      ModelSelect
    }
  }
</script>

<style>
  .fixI i:link, .fixI i {
    top: 25px!important;
  }
</style>
