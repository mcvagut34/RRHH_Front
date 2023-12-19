<template>
<div v-if="!IsFetching" class="col-md-12">
  <div class="panel-body" style="background-color: #FFF">
    <!--PROYECTO-->
      <div class="row">
                  <div class="form-group col-md-12">
                    <label>Proyecto</label>
                    <div>
            <model-select class="select-info"
                          v-bind:class="{fixI : action==='PUT'}"
                          :options="projects"
                          style="background-color: #f0efeb"
                          v-model="module.CodProject"
                          @input="loadProjectsInfo"
                          :isDisabled="readonly"
                          placeholder="SELECCIONAR PROYECTO">
            </model-select>
          </div>
        </div>
      </div>
    <!--INFO PROYECTO-->
      <div class="row" v-for="info in projectSelected">
                  <div class="form-group col-md-3">
                    <label >PEI/PO Proyecto</label>
                    <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" readonly v-model="info.U_PEI_PO">
                  </div>
                  <div class="form-group col-md-3">
                    <label >Fecha Inicio Proyecto</label>
                    <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" readonly v-model="info.ValidFrom">
                  </div>
                  <div class="form-group col-md-3">
                    <label >Fecha Fin Proyecto</label>
                    <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" readonly v-model="info.ValidTo">
                  </div>
        <div class="form-group col-md-3">
        <label >Tipo Proyecto</label>
        <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" readonly v-model="info.U_Tipo">
      </div>
                </div>
    <!--MODULO-->
      <div class="row">
        <div class="form-group col-md-2">
          <label >Código del módulo</label>
          <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" v-model.lazy="module.CodModule" :readonly="readonly">
          <small v-if="formError.CodigoModulo0.active" class="form-text text-muted text-danger">{{formError.CodigoModulo0.message}}</small>
        </div>
        <div class="form-group col-md-10">
          <label >Nombre del módulo</label>
          <input type="text" style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" v-model.lazy="module.NameModule">
        </div>
      </div>
    <!--DOCENTE-->
      <div class="row">
          <div class="form-group col-md-2">
            <label >Dependiente?</label>
            <input type="checkbox" class="form-control" v-model="dependiente" @click="filterTeachers()">
          </div>
          <div class="form-group col-md-6">
            <label>Docente</label>
            <model-select class="select-info"
                          style=" background-color: #f0efeb"
                          v-bind:class="{fixI : action==='PUT'}"
                          :options="teacherArray"
                          v-model="teacherIdentifier"
                          placeholder="SELECCIONAR DOCENTE"
                          :isDisabled="falseTeacher"
                          :onchange="actualCat()"
            >
            </model-select>
          </div>
        <div class="form-group col-md-2">
        </div>
      </div>
    <!--INFO MODULO-->
      <div class="row">
        <div>
          <div class="form-group col-md-2">
            <label>Cantidad de horas</label>
            <input type="number" min="1" class="form-control textBox" style="background-color: #f0efeb" v-model.lazy="module.Horas" :readonly="falseTeacher">
          </div>
          <div class="form-group col-md-2">
            <label>Costo por hora</label>
            <input type="number" min="1" class="form-control textBox" style="background-color: #f0efeb" v-model.lazy="module.MontoHora" :readonly="falseTeacher">
          </div>
        </div>
        <div class="form-group col-md-3">
          <label> Fecha Inicio </label> <br>
          <date-picker
            v-model="module.FechaInicio"
            :format=format
            :use-utc="utc"
            :disabled="falseTeacher"
            style="background-color: #f0efeb"
            placeholder="DD/MM/YYYY"
            @change="limpiarFechaInicio"
          ></date-picker>
          <small v-if="formError.fechaini.active" class="form-text text-muted text-danger">{{formError.fechaini.message}}</small>
          <small v-if="formError.fechas1.active" class="form-text text-muted text-danger">{{formError.fechas1.message}}</small>
        </div>
        <div class="form-group col-md-3">
          <label> Fecha Fin </label><br>
          <date-picker
            v-model="module.FechaFin"
            :format=format
            :use-utc="utc"
            :disabled="falseTeacher"
            style="background-color: #f0efeb"
            placeholder="DD/MM/YYYY"
            @change="limpiarFechaFin"
          ></date-picker>
          <small v-if="formError.fechafini.active" class="form-text text-muted text-danger">{{formError.fechafini.message}}</small>
          <small v-if="formError.fechas2.active" class="form-text text-muted text-danger">{{formError.fechas2.message}}</small>
        </div>
      </div>
    <!--OBSERVACIONES-->
      <div class="row">
        <div class="form-group col-md-12">
          <label for="exampleFormControlTextarea1">Observaciones</label>
          <textarea class="form-control textBox" style="background-color: #f0efeb" id="exampleFormControlTextarea1" rows="2" v-model.lazy="module.Observaciones"></textarea>
        </div>
      </div>
    <!--EN CASO DE QUE NO EXISTA EL MODULO 0-->
       <div class="row">
        <div v-if="errorCodProy === 'SI'" class="form-group col-md-8">
          <label >Nombre abreviado del proyecto (Máx. 45)</label>
          <input type="text" style="text-transform: uppercase;" class="form-control textBox" v-model.lazy="moduleGral.NameModule" maxlength="45">
          <small v-if="formError.NombreModulo.active" class="form-text text-muted text-danger">{{formError.NombreModulo.message}}</small>
          <br>
          <div class="col-md-2">
            <button class="btn btn-warning btn-fill" @click="postGral()">Guardar</button>
          </div>
        </div>
       </div>
      <br>
      <!--Botón que envía la información del form-->
      <div class="row" v-if="errorCodProy === 'NO'">
        <div class="col-md-2">
          <button class="btn btn-success btn-fill" @click="send()">Guardar</button>
        </div>
        <div class="col-md-2" v-if="action==='POST'">
          <button class="btn btn-warning btn-fill" @click="exit()">Salir</button>
        </div>
        <div class="col-md-2" v-if="action==='POST'">
          <button class="btn btn-danger btn-fill" @click="cleanScreen()">Reset</button>
        </div>
        <div class="col-md-2" v-if="action==='PUT'">
          <button class="btn btn-danger btn-fill" @click="onClose()">Cancelar</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import router from '../../../router/index.js'
  import DatePicker from 'vue2-datepicker'
  import 'vue2-datepicker/index.css'
  import 'vue2-datepicker/locale/es'
  import swal from 'sweetalert2'
  import { ModelSelect } from 'vue-search-select'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  export default {
    components: {
      ModelSelect,
      DatePicker,
      FormWizard,
      TabContent
    },
    props: {
      moduleId: {
        type: Number,
        required: false
      },
      action: {
        // Por defecto es POST, y cuando haya que actualizar, la función send revisará el prop
        type: String,
        required: false,
        default: 'POST'
      }
    },
    data: function () {
      return {
        flag: 0,
        MaxL: 100,
        utc: true,
        falseTeacher: false,
        readonly: false,
        projectSelected: [],
        errorCodProy: 'NO',
        projects: [],
        format: 'DD/MM/YYYY',
        opendate: new Date(),
        initialview: 'day',
        but: false,
        IsFetching: true,
        totalBruto: 0,
        options: [],
        careers: [],
        branches: [],
        modalidades: [],
        tipoTarea: [],
        dependiente: true,
        or: false,
        Deduccion: 0,
        teacherIdentifier: '',
        teacherArray: [],
        IUE: 13,
        IT: 3,
        acta: true,
        porHora: true,
        monto: null,
        teachers: [],
        module: {
          Id: null,
          CodProject: '',
          CodModule: '',
          NameModule: '',
          TeacherFullName: '',
          TeacherCI: '',
          SocioNegocio: '',
          BranchesId: null,
          Horas: null,
          MontoHora: null,
          FechaInicio: '',
          FechaFin: '',
          Observaciones: ''
        },
        moduleGral: {
          Id: null,
          CodProject: '',
          CodModule: '0',
          NameModule: '',
          TeacherFullName: '',
          TeacherCI: '',
          SocioNegocio: '',
          BranchesId: null,
          Horas: null,
          MontoHora: null,
          FechaInicio: '',
          FechaFin: '',
          Observaciones: ''
        },
        formError: {
          Professor: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          CodigoModulo: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          CodigoModulo0: {
            active: false,
            message: '*Este valor no puede ser 0.'
          },
          NombreModulo: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          fechaini: {
            active: false,
            message: '*Esta fecha no puede ser mayor a la fecha fin.'
          },
          fechafini: {
            active: false,
            message: '*Esta fecha no puede ser menor a la fecha inicio.'
          },
          fechas1: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          fechas2: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          }
        }
      }
    },
    methods: {
      // --------------------------Para la validación antes del POST/PUT----------------------------
      valid: function () {
        this.formError.CodigoModulo.active = this.isEmptyBlanckOrNull(this.module.CodModule)
        this.formError.NombreModulo.active = this.isEmptyBlanckOrNull(this.module.NameModule)
        if (this.module.FechaInicio != null && this.module.FechaFin != null) {
          if (this.module.FechaFin < this.module.FechaInicio) {
            this.formError.fechafini.active = true
          }
          if (this.module.FechaInicio > this.module.FechaFin) {
            this.formError.fechaini.active = true
          }
        }
        if (this.module.FechaInicio != null && this.module.FechaFin == null) {
          this.formError.fechas2.active = true
        }
        if (this.module.FechaInicio == null && this.module.FechaFin != null) {
          this.formError.fechas1.active = true
        }
        if (this.action !== 'PUT') {
          this.formError.Professor.active = this.isEmptyBlanckOrNull(this.module.TeacherFullName)
          if (this.module.CodModule === '0') {
            this.formError.Professor.active = false
            this.formError.CodigoModulo0.active = true
          }
        }
        var x = this.formError.Professor.active || this.formError.CodigoModulo.active || this.formError.NombreModulo.active || this.formError.fechafini.active || this.formError.fechaini.active || this.formError.fechas1.active || this.formError.fechas2.active || this.formError.CodigoModulo0.active
        console.log(this.formError.Professor.active + '||' + this.formError.CodigoModulo.active + '||' + this.formError.NombreModulo.active + '||' + this.formError.fechafini.active + '||' + this.formError.fechaini.active + '||' + this.formError.fechas1.active + '||' + this.formError.fechas2.active + '||' + this.formError.CodigoModulo0.active)
        return x
      },
      ClearValid: function () {
        this.formError.Professor.active = false
        this.formError.CodigoModulo.active = false
        this.formError.NombreModulo.active = false
        this.formError.fechafini.active = false
        this.formError.fechaini.active = false
        this.formError.fechas2.active = false
        this.formError.fechas1.active = false
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      filterTeachers: function () {
        let boolean
        if (this.dependiente) {
          boolean = '0'
        } else {
          boolean = '1'
        }
        this.teacherArray = this.teachers.filter(function (e) {
          return e.TipoPago === boolean
        })
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      },
      loadProjects () {
        let proyectos = this.projects
        axios.get('GetProjects/')
          .then(response => {
            response.data.forEach(function (element) {
              proyectos.push({value: element.PrjCode, text: element.PrjCode + '-' + element.PrjName, BranchesId: element.BranchesId, Id: element.PrjCode})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      convert (str) {
        let date = new Date(str)
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join('-')
      },
      // Envío de datos
      send () {
        if (!this.valid() && this.action === 'POST') {
          console.log('Algo si entrá al POST')
          this.post()
        } else if (!this.valid() && this.action === 'PUT') {
          console.log('Algo si entrá al PUT')
          this.put()
        } else {
          console.log('something was printed:' + this.action + ' ' + this.valid())
          // resetear variables de validación
          this.validationMessage()
          setTimeout(() => {
            this.ClearValid()
          }, 3000)
        }
      },
      exit () {
        router.push('../Modulos')
      },
      cleanScreen () {
        // este método limpia la pantalla, con excepcion del porcentaje y la carrera
        // Variables del objeto que se envía mediante el POST
        this.module.Id = null
        this.module.CodProject = ''
        this.module.CodModule = ''
        this.module.NameModule = ''
        this.module.TeacherFullName = ''
        this.module.TeacherCI = ''
        this.module.BranchesId = null
        this.module.Horas = null
        this.module.MontoHora = null
        this.module.Observaciones = ''
        this.module.FechaInicio = ''
        this.teacherIdentifier = ''
        this.module.SocioNegocio = ''
        this.module.FechaFin = ''
        this.moduleGral.NameModule = ''
        this.moduleGral.CodProject = ''
        this.projectSelected = []
        // Variables de control de errores
        this.ClearValid()
      },
      loadModule: function () {
        axios.get('/ProjectModules/' + this.moduleId)
          .then(response => {
            this.module = response.data
            if (this.module.SocioNegocio != null) {
              if (this.module.SocioNegocio.length > 0) {
                // console.log('aqui businees partner. ' + this.teacherIdentifier + '=' + this.tutoria.TeacherBP)
                // console.log('INDEP' + this.tutoria.TeacherFullName)
                // console.log('INDEP' + this.teacherIdentifier)
                console.log('Soy socio de negocio y cambio variables')
                this.dependiente = false
                console.log(this.dependiente)
                this.teacherIdentifier = this.module.SocioNegocio
              }
            }
            if (this.module.TeacherCI != null) {
              if (this.module.TeacherCI.length > 0) {
                console.log('DEP')
                this.teacherIdentifier = this.module.TeacherCI
              }
            }
            if (this.module.CodModule === '0') {
              this.falseTeacher = true
            }
            this.loadTeachersPut()
            this.loadProjectsInfo()
            console.log('Teacher' + this.teacherIdentifier)
            if (this.module.FechaInicio != null) {
              var actaYear = this.module.FechaInicio.substring(0, 4)
              var actaMonth = this.module.FechaInicio.substring(5, 7)
              var actaDay = this.module.FechaInicio.substring(8, 10)
              var date1 = new Date(actaYear, actaMonth - 1, actaDay)
              this.module.FechaInicio = date1
            }
            if (this.module.FechaFin != null) {
              var actaYear2 = this.module.FechaFin.substring(0, 4)
              var actaMonth2 = this.module.FechaFin.substring(5, 7)
              var actaDay2 = this.module.FechaFin.substring(8, 10)
              var date2 = new Date(actaYear2, actaMonth2 - 1, actaDay2)
              this.module.FechaFin = date2
            }
          })
          .catch(error => { console.log('el error es:' + error) })
      },
      post () {
        this.module.MontoHora = parseFloat(this.module.MontoHora).toFixed(2)
        /*
        this.module.NameModule = this.nombreModuloBien
        this.module.observaciones = this.observacionesBien
        this.module.Horas = this.cantidadHorasBien
        this.module.MontoHora = this.costoHoraBien
        */
        console.log('Aqui la info:')
        console.log(this.module.Id)
        console.log(this.module.CodProject)
        console.log('*' + this.module.CodModule + '*')
        console.log(this.module.NameModule)
        console.log(this.module.TeacherFullName)
        console.log(this.module.TeacherCI)
        console.log(this.module.BranchesId)
        console.log(this.module.Horas)
        console.log(this.module.MontoHora)
        console.log(this.module.Observaciones)
        console.log(this.module.FechaInicio)
        console.log(this.module.FechaFin)
        axios.post('ProjectModules', this.module)
          .then(response => {
            console.log('Modulo aqui' + this.module.TeacherFullName)
            this.successMessage(response)
            this.cleanScreen()
          })
          .catch(error => {
            this.warnMessage(error.response.data.Message)
            console.log(error.response.data.Message)
            if (error.response.data.Message === 'Este proyecto necesita estar habilitado para su registro. Por favor, a continuación ingrese el nombre del proyecto abreviado.') {
              this.errorCodProy = 'SI'
            }
          })
      },
      postGral () {
        console.log('Aqui la info:')
        this.moduleGral.CodProject = this.module.CodProject
        axios.post('ProjectModules', this.moduleGral)
          .then(response => {
            this.send()
            this.errorCodProy = 'NO'
          })
          .catch(error => {
            this.errorMessage(error.response.data.Message)
            console.log(error.response.data.Message)
          })
      },
      // Actualización de datos
      put () {
        console.log('ProjectModule/' + this.moduleId + '/' + this.flag, this.module)
        axios.put('ProjectModule/' + this.moduleId + '/' + this.flag, this.module)
          .then(response => {
            console.log('Aqui la info de la editacion:')
            console.log(this.module.Id)
            console.log(this.module.CodProject)
            console.log(this.module.CodModule)
            console.log(this.module.NameModule)
            console.log(this.module.TeacherFullName)
            console.log(this.module.TeacherCI)
            console.log(this.module.BranchesId)
            console.log(this.module.Horas)
            console.log(this.module.MontoHora)
            console.log(this.module.Observaciones)
            console.log(this.module.FechaInicio)
            console.log(this.module.FechaFin)
            this.successMessageReload()
          })
          .catch(error => {
            var vm = this
            if (error.response.data.Message === 'Ya se encuentran registros en ISAAC Postgrado con este módulo. ¿Quiere continuar con la modificación?') {
              vm.validacionPut(error.response.data.Message)
            } else {
              vm.errorMessage(error.response.data.Message)
            }
          })
      },
      onClose () {
        // emit para cerrar el componente
        this.$emit('back')
      },
      successMessage: function (res) {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      successMessageReload: function (res) {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        }).then(function () {
            // la página se recarga con frescura :v
          location.reload()
        }
        )
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
      warnMessage: function (text) {
        swal({
          title: `Ups!`,
          text: text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'warning'
        })
      },
      validationMessage: function () {
        swal({
          title: `Ups!`,
          text: 'Algunos datos no están validados',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      },
      loadTeachers () {
        if (!this.but) {
          let teachers = this.teachers
          // Este array guarda la info de los profesores que se cargan la primera vez
          let firstTeachers = this.teacherArray
          let selectedOrigin = '1'
          axios.get('DocentesListPostgrado')
            .then(response => {
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a TeacherCI o SocioNegocio dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago})
                  // console.log('FirstTeachers' + element.CUNI + '-' + element.FullName)
                }
              })
              // console.log('el array de los profesores es:')
              // console.log(firstTeachers)
            })
            .catch(error => console.log(error))
          this.IsFetching = false
        }
        if (this.but) {
          let teachers = this.teachers
          // Este array guarda la info de los profesores que se cargan la primera vez
          let firstTeachers = this.teacherArray
          let selectedOrigin = '1'
          if (this.origin === 'INDEP') {
            // console.log('This is the PUT action and the selected origin is:' + selectedOrigin)
            selectedOrigin = '0'
          }
          axios.get('DocentesListAllPostgrado')
            .then(response => {
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a TeacherCI o SocioNegocio dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName})
                  // console.log('FirstTeachers' + element.CUNI + '-' + element.FullName)
                }
              })
              // console.log('el array de los profesores es:')
              // console.log(firstTeachers)
            })
            .catch(error => console.log(error))
          this.IsFetching = false
        }
      },
      loadTeachersPut () {
        if (!this.but) {
          let teachers = this.teachers
          // Este array guarda la info de los profesores que se cargan la primera vez
          let firstTeachers = this.teacherArray
          let selectedOrigin = '1'
          console.log('Dependeiente ?' + this.dependiente)
          if (!this.dependiente) {
            selectedOrigin = '0'
          }
          axios.get('DocentesListPostgrado')
            .then(response => {
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a TeacherCI o SocioNegocio dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago})
                  // console.log('FirstTeachers' + element.CUNI + '-' + element.FullName)
                }
              })
              // console.log('el array de los profesores es:')
              // console.log(firstTeachers)
            })
            .catch(error => console.log(error))
          this.IsFetching = false
        }
        if (this.but) {
          let teachers = this.teachers
          // Este array guarda la info de los profesores que se cargan la primera vez
          let firstTeachers = this.teacherArray
          let selectedOrigin = '1'
          if (this.origin === 'INDEP') {
            // console.log('This is the PUT action and the selected origin is:' + selectedOrigin)
            selectedOrigin = '0'
          }
          axios.get('DocentesListAllPostgrado')
            .then(response => {
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a TeacherCI o SocioNegocio dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName})
                  // console.log('FirstTeachers' + element.CUNI + '-' + element.FullName)
                }
              })
              // console.log('el array de los profesores es:')
              // console.log(firstTeachers)
            })
            .catch(error => console.log(error))
          this.IsFetching = false
        }
      },
      actualCat: function () {
        for (var i = 0; i < this.teacherArray.length; i++) {
          // si es dependiente y el valor iguala, entonces se guarda en el CUNI, sino en el BP
          // resetea el otro identificador, para no guardar el identificador de un docente seleccionado antes
          if (this.dependiente && this.teacherArray[i]['value'] === this.teacherIdentifier) {
            this.module.SocioNegocio = ''
            this.module.TeacherCI = this.teacherArray[i]['value']
            this.module.TeacherFullName = this.teacherArray[i]['name']
          }
          if (!this.dependiente && this.teacherArray[i]['value'] === this.teacherIdentifier) {
            // console.log(this.teacherArray[i]['value'])
            this.module.TeacherCI = ''
            this.module.SocioNegocio = this.teacherArray[i]['value']
            this.module.TeacherFullName = this.teacherArray[i]['name']
          }
        }
      },
      loadProjectsInfo () {
        console.log('GetProjectInfo/' + this.module.CodProject)
        axios.get('GetProjectInfo/' + this.module.CodProject)
          .then(response => {
            this.projectSelected = response.data
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      limpiarFechaFin () {
        this.formError.fechafini.active = false
        this.formError.fechas2.active = false
      },
      limpiarFechaInicio () {
        this.formError.fechaini.active = false
        this.formError.fechas1.active = false
      },
      validacionPut (text) {
        var vm = this
        swal({
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, cambiar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          console.log('ESTE AL ACEPTAR ProjectModule/' + vm.moduleId + '/1', vm.module)
          axios.put('ProjectModule/' + vm.moduleId + '/1', vm.module)
            .then(response => {
              vm.successMessageReload()
            })
            .catch(error => {
              vm.successMessageReload(error.response.data.Message)
            })
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'No se cambió ningún registro.',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      }
    },
    created () {
      if (this.action === 'PUT') {
        this.readonly = true
        // Solo cargamos los datos de la tutoría cuando hay un PUT, sino cargamos todo menos eso
        this.fakeLoad()
        this.loadModule()
        this.loadProjects()
      } else {
        this.loadProjects()
        this.loadTeachers()
      }
    }
  }
</script>

<style scoped>
  .fixI i:link, .fixI i {
    top: 25px!important;
  }
  .calendarProp {
    color: red;
  }
  .textBox {
    background-color: white;
  }
</style>
