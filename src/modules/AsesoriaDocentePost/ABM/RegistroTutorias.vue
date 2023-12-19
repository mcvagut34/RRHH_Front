<template>
  <div v-if="!IsFetching" class="col-md-12">
    <div class="panel-body">
      <!--PROYECTO Y MODULO-->
      <div class="row">
        <div class="form-group col-md-6">
          <label>Proyecto</label>
          <div>
            <model-select class="select-info"
                          v-bind:class="{fixI : action==='PUT'}"
                          :options="projects"
                          v-model="tutoria.Proyecto"
                          @input="loadModules"
                          placeholder="Seleccione un proyecto">
            </model-select>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Módulo</label>
          <div>
            <model-select class="select-info"
                          v-bind:class="{fixI : action==='PUT'}"
                          :options="modulos"
                          v-model="tutoria.Modulo"
                          @input="loadModuleInfo"
                          placeholder="Seleccione un módulo">
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
      <!--INFO MODULO-->
      <div class="row" v-for="infoMod in aux1">
        <div class="form-group col-md-4">
          <label for="exampleFormControlTextarea8">Fecha inicio del módulo</label>
          <input style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" id="exampleFormControlTextarea8" rows="2" v-model.lazy="infoMod.FechaInicio" readonly>
        </div>
        <div class="form-group col-md-4">
        <label for="exampleFormControlTextarea9">Fecha final del módulo</label>
        <input style="text-transform: uppercase; background-color: #f0efeb" class="form-control textBox" id="exampleFormControlTextarea9" rows="2" v-model.lazy="infoMod.FechaFin" readonly>
      </div>
      </div>
      <!--DOCENTE Y TIPO TAREA-->
      <div class="row">
        <div class="form-group col-md-1" style="margin-right: 10px; margin-top: 20px">
          <label >Dependiente?</label>
          <input type="checkbox" class="form-control" v-model="dependiente" @click="filterTeachers()">
        </div>
        <div class="form-group col-md-1" style="margin-right: 10px; margin-left: 10px">
          <label >Otra Regional?</label>
          <input type="checkbox" class="form-control" v-model="or" @click="ChangeButton()">
        </div>
        <div class="form-group col-md-5" style="margin-top: 25px">
          <label>Docente</label>
          <model-select class="select-info"
                        v-bind:class="{fixI : action==='PUT'}"
                        :options="teacherArray"
                        v-model="teacherIdentifier"
                        placeholder="Seleccionar docente"
                        @input="validateDocente()"
                        :onchange="actualCat()"
          >
          </model-select>
        </div>
        <!--
        <div class="form-group col-md-2">
          <label>Categoría</label>
          <model-select class="select-info"
                        v-bind:class="{fixI : action==='PUT'}"
                        :options="tipoDoc"
                        v-model="tutoria.Categoría"
                        placeholder="Categoría">
          </model-select>
        </div>-->
        <div class="form-group col-md-3" style="margin-top: 25px">
          <label>Tipo Tarea</label>
          <div>
            <model-select class="select-info"
                          v-bind:class="{fixI : action==='PUT'}"
                          :options="tipoTarea"
                          v-model="tutoria.TipoTareaId"
                          placeholder="Tipo de tarea">
            </model-select>
          </div>
        </div>
        <div class="form-group col-md-1">
          <label >Registrar estudiante?</label>
          <input type="checkbox" class="form-control" v-model="estudiante">
        </div>
        <!--
        <div class="form-group col-md-2">
          <label >Otra Regional?</label>
          <input type="checkbox" class="form-control" v-model="or" @click="ChangeButton()">
        </div>-->
      </div>
      <!--ESTUDIANTE-->
      <div class="row" v-if="estudiante">
        <div class="form-group col-md-12">
          <label >Estudiante</label>
          <input type="text" placeholder="JUAN PEREZ" style="text-transform: uppercase; background-color: #f0efeb" class="form-control" v-model="tutoria.StudentFullName">
        </div>
      </div>
      <!--OBSERVACION MODULO CONDICIONAL-->
      <div class="row" v-for="infoMod in aux1">
        <div class="form-group col-md-8">
          <label for="exampleFormControlTextarea2">Observaciones del Módulo</label>
          <textarea class="form-control textBox" style="background-color: #e8e8e8" id="exampleFormControlTextarea2" rows="2" v-model.lazy="infoMod.Observaciones" readonly></textarea>
        </div>
      </div>
      <!--OBSERVACIONES-->
      <div class="row">
      <div class="form-group col-md-8">
          <label for="exampleFormControlTextarea1">Observaciones</label>
          <textarea class="form-control textBox" id="exampleFormControlTextarea1" rows="2" v-model.lazy="tutoria.Observaciones"></textarea>
      </div>
        <div class="form-group col-md-2">
          <label >Ignorar repetido?</label>
          <input type="checkbox" class="form-control" v-model="tutoria.Ignore">
        </div>
        <div class="form-group col-md-2" v-if="!dependiente">
        <label >Factura?</label>
        <input type="checkbox" class="form-control" v-model="tutoria.Factura" @click="facturaOn()">
      </div>
    </div>
      <!--COSTOS-->
      <div class="row">
        <div class="form-group col-md-2">
          <label >Horas</label>
          <input type="number" placeholder="Horas" class="form-control" v-model.lazy="tutoria.Horas" @change="validateHoras" style="background-color: white">
        </div>
        <div class="form-group col-md-2">
          <label >Costo Hora</label>
          <input type="number" placeholder="C/H" class="form-control" v-model.lazy="tutoria.MontoHora" @change="validateMontoHoras" style="background-color: white">
        </div>
        <div class="form-group col-md-2">
          <label >Total Bruto</label>
          <input type="number" placeholder="TB" class="form-control" readonly v-model="brutoCalculado">
        </div>
        <div v-if="dependiente" class="form-group col-md-2">
          <label >Deduccion(%)</label>
          <input type="number" placeholder="%" class="form-control textBox" v-model.lazy="Deduccion">
        </div>
        <div v-if="!dependiente" class="form-group col-md-2">
          <label >RC-IVA(%)</label>
          <input type="number" placeholder="%" class="form-control textBox" v-model.lazy="IUE" :readonly="ridy">
        </div>
        <div v-if="!dependiente" class="form-group col-md-2">
          <label >IT(%)</label>
          <input type="number" placeholder="%" class="form-control textBox" v-model.lazy="IT" :readonly="ridy">
        </div>
        <div class="form-group col-md-2">
          <label >Total Neto</label>
          <input type="number" placeholder="TN" class="form-control textBox" v-model="totalNeto" readonly>
        </div>
      </div>
      <!--Botón que envía la información del form-->
      <div class="row">
        <div class="col-md-2">
          <button class="btn btn-success btn-fill" @click="send()">Guardar</button>
        </div>
        <div class="col-md-2" v-if="action==='POST'">
          <button class="btn btn-warning btn-fill" @click="exit()">Salir</button>
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
  /* import Datepicker from 'vuejs-datepicker' */
  import swal from 'sweetalert2'
  import { ModelSelect } from 'vue-search-select'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  /* import {es} from 'vuejs-datepicker/dist/locale' */
  export default {
    components: {
      ModelSelect,
      DatePicker,
      FormWizard,
      TabContent
    },
    props: {
      tutoriaId: {
        type: Number,
        required: false
      },
      action: {
        // Por defecto es POST, y cuando haya que actualizar, la función send revisará el prop
        type: String,
        required: false,
        default: 'POST'
      },
      origin: {
        type: String,
        required: false,
        default: 'DEPEN'
      }
    },
    data: function () {
      return {
        projectSelected: [],
        delay: 500,
        apareceObs: 'NO',
        module: {
          Id: 0,
          BranchesId: 0,
          CodModule: '',
          CodProject: '',
          NameModule: '',
          TeacherFullName: '',
          TeacherCI: '',
          Horas: 0,
          MontoHora: 0,
          FechaInicio: '',
          FechaFin: '',
          Observaciones: '',
          SocioNegocio: ''
        },
        aux: [],
        aux1: [],
        format: 'DD/MM/YYYY',
        opendate: new Date(),
        initialview: 'day',
        but: false,
        IsFetching: true,
        totalBruto: 0,
        options: [],
        projects: [],
        modulos: [],
        branches: [],
        modalidades: [],
        tipoTarea: [],
        dependiente: true,
        estudiante: false,
        or: false,
        Deduccion: 0,
        teacherIdentifier: '',
        teacherArray: [],
        IUE: 0,
        IT: 0,
        acta: true,
        porHora: true,
        monto: null,
        teachers: [],
        tutoria: {
          Id: 0,
          Proyecto: '',
          Modulo: '',
          TeacherCUNI: '',
          TeacherBP: '',
          BranchesId: 0,
          DependencyCod: '',
          Horas: 0,
          MontoHora: 0,
          TotalNeto: 0,
          TotalBruto: 0,
          Mes: 0,
          Gestion: 0,
          Observaciones: '',
          Valid: false,
          Deduccion: 0,
          Origen: 'DEPEN',
          TipoTareaId: 0,
          Ignore: false,
          IUE: 0,
          IT: 0,
          StudentFullName: '',
          Factura: false
        },
        formError: {
          Acta: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          Student: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          }
        },
        auxproy: [],
        ridy: false
      }
    },
    computed: {
      // --------------------------Para el cálculo de los montos----------------------------
      totalNeto: function () {
        this.totalBruto = this.tutoria.TotalBruto
        // Los calculos cambian si es DEPENDIENTE O INDEPENDIENTE
        if (this.dependiente) {
          this.tutoria.TotalNeto = (this.totalBruto - (this.totalBruto * (this.Deduccion / 100))).toFixed(2)
          this.tutoria.Deduccion = this.tutoria.TotalBruto - this.tutoria.TotalNeto
          return (this.totalBruto - (this.totalBruto * (this.Deduccion / 100))).toFixed(2)
        } else {
          // Cuando es independiente se calculan nuevos tipos de descuentos que no aplican para los independientes
          this.tutoria.IUE = (this.totalBruto * (this.IUE / 100)).toFixed(2)
          this.tutoria.IT = (this.totalBruto * (this.IT / 100)).toFixed(2)
          this.tutoria.Deduccion = (this.tutoria.IUE + this.tutoria.IT)
          this.tutoria.TotalNeto = (this.totalBruto - (this.tutoria.IUE) - (this.tutoria.IT)).toFixed(2)
          return (this.totalBruto - this.tutoria.IUE - this.tutoria.IT).toFixed(2)
        }
      },
      brutoCalculado: function () {
        this.tutoria.TotalBruto = (this.tutoria.Horas * this.tutoria.MontoHora).toFixed(2)
        return this.tutoria.TotalBruto
      },
      lockDependiente: function () {
        if (this.or && !this.dependiente) {
          this.dependiente = false
        }
      }
    },
    methods: {
      exit () {
        router.push('../HistorialPostgrado')
      },
      // --------------------------Para la validación antes del POST/PUT----------------------------
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      // --------------------------Para el cálculo de los montos-----------------------------------------
      // --------------------------Para encontrar y asignar datos del docente----------------------------
      filterTeachers: function () {
        let boolean
        if (this.dependiente) {
          boolean = '0'
        } else {
          boolean = '1'
        }
        console.log('Si filtro' + this.dependiente + boolean)
        console.log('Boolean ' + boolean)
        this.teacherArray = this.teachers.filter(function (e) {
          return e.TipoPago === boolean
        })
      },
      facturaOn: function () {
        if (!this.tutoria.Factura) {
          this.ridy = true
          this.Deduccion = 0
          this.IUE = 0
          this.IT = 0
        } else {
          this.ridy = false
        }
      },
      actualCat: function () {
        for (var i = 0; i < this.teacherArray.length; i++) {
          // si es dependiente y el valor iguala, entonces se guarda en el CUNI, sino en el BP
          // resetea el otro identificador, para no guardar el identificador de un docente seleccionado antes
          if (this.dependiente && this.teacherArray[i]['value'] === this.teacherIdentifier) {
            this.tutoria.TeacherBP = ''
            this.tutoria.TeacherCUNI = this.teacherArray[i]['value']
            this.teacherIdentifier = this.teacherArray[i]['value']
          }
          if (!this.dependiente && this.teacherArray[i]['value'] === this.teacherIdentifier) {
            // console.log(this.teacherArray[i]['value'])
            this.tutoria.TeacherCUNI = ''
            this.tutoria.TeacherBP = this.teacherArray[i]['value']
            this.teacherIdentifier = this.teacherArray[i]['value']
          }
        }
        return this.tutoria.Categoría
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 3000)
      },
      ChangeButton () {
        if (this.but) {
          this.but = false
        }
        if (!this.but) {
          this.but = true
        }
        this.loadTeachers()
      },
      // Usamos esta función en el PUT, para cargar los datos actuales del registro
      loadTutoria: function () {
        axios.get('AsesoriaPostgrado/' + this.tutoriaId)
          .then(response => {
            this.tutoria = response.data
            console.log('Obs: ' + this.tutoria.Observaciones)
            // Dependiendo dl origen del docente se carga el CUNI o el BP
            if (this.tutoria.Origen === 'DEPEN' || this.tutoria.Origen === 'OR') {
              // para mostrar al docente del registro
              // console.log('CUNI is loaded')
              this.teacherIdentifier = this.tutoria.TeacherCUNI
              // console.log('aqui businees partner. ' + this.teacherIdentifier + '=' + this.tutoria.TeacherCUNI)
              console.log('DEPEN ' + this.teacherIdentifier)
              if (this.tutoria.Origen === 'OR') {
                // console.log('OR is set to true')
                this.or = true
              }
              // para igualar costos, es necesario hacer un cálculo inverso porque nosotros guardamos monto pero desplegamos porcentaje
              this.Deduccion = ((100 * this.tutoria.Deduccion) / this.tutoria.TotalBruto).toFixed(2)
            } else if (this.tutoria.Origen === 'INDEP') {
              this.teacherIdentifier = this.tutoria.TeacherBP
              // console.log('aqui businees partner. ' + this.teacherIdentifier + '=' + this.tutoria.TeacherBP)
              // console.log('INDEP' + this.tutoria.TeacherFullName)
              console.log('INDEP ' + this.teacherIdentifier)
              this.dependiente = false
              // para igualar costos
              this.IUE = ((100 * this.tutoria.IUE) / this.tutoria.TotalBruto).toFixed(2)
              this.IT = ((100 * this.tutoria.IT) / this.tutoria.TotalBruto).toFixed(2)
            }
            if (this.tutoria.Horas <= 0) {
              // para que no oculte el valor de la edición
              this.porHora = false
              // para que no cargue el total bruto ni el neto desde 0
              this.totalBruto = this.tutoria.TotalBruto
            }
            this.loadModules()
            this.IsFetching = false
            console.log('Modulo' + this.tutoria.Modulo)
            /*
            console.log('Aqui la info:')
            console.log('DependencyCod' + this.tutoria.DependencyCod)
            console.log('Observaciones' + this.tutoria.Observaciones)
            console.log('MontoHora' + this.tutoria.MontoHora)
            console.log('Horas' + this.tutoria.Horas)
            console.log('ModuloId' + this.tutoria.ModuloId)
            console.log('Modulo' + this.tutoria.Modulo)
            console.log('TotalBruto' + this.tutoria.TotalBruto)
            console.log('TotalNeto' + this.tutoria.TotalNeto)
            console.log('Acta' + this.tutoria.Acta)
            console.log('ActaFecha' + this.tutoria.ActaFecha)
            console.log('TeacherFullName' + this.tutoria.TeacherFullName)
            console.log('TeacherBP' + this.tutoria.TeacherBP)
            console.log('TeacherCUNI' + this.tutoria.TeacherCUNI)
            console.log('ModalidadId' + this.tutoria.ModalidadId)
            console.log('TipoTareaId' + this.tutoria.TipoTareaId)
            console.log('StudentFullName' + this.tutoria.StudentFullName)
            console.log('Id' + this.tutoria.Id)
            console.log('Carrera' + this.tutoria.Carrera)
            console.log('BranchesId' + this.tutoria.BranchesId)
            console.log('Mes' + this.tutoria.Mes)
            console.log('Gestion' + this.tutoria.Gestion)
            console.log('Valid' + this.tutoria.Valid)
            console.log('Origen' + this.tutoria.Origen)
            console.log('Ignore' + this.tutoria.Ignore)
            // Variables del componente
            console.log('Deduccion' + this.tutoria.Deduccion)
            console.log('IUE' + this.tutoria.IUE)
            console.log('IT' + this.tutoria.IT)
            */
            this.loadModuleInfo()
          })
          .catch(error => { console.log('el error es:' + error) })
      },
      loadProjects () {
        let proyectos = this.projects
        axios.get('GetProjectUsed/')
          .then(response => {
            response.data.forEach(function (element) {
              proyectos.push({value: element.PrjCode, text: element.PrjCode + '-' + element.PrjName, BranchesId: element.BranchesId, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadModules () {
        this.loadProjectsInfo()
        this.fakeLoad()
        this.modulos = []
        // this.teacherIdentifier = ''
        this.aux.Observaciones = ''
        this.apareceObs = 'NO'
        let module = this.modulos
        axios.get('/GetModule/' + this.tutoria.Proyecto)
          .then(response => {
            response.data.forEach(function (element) {
              module.push({value: element.CodModule, text: element.CodModule + '-' + element.NameModule, BranchesId: element.BranchesId, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadProjectsInfo () {
        console.log('GetProjectInfo/' + this.tutoria.Proyecto)
        axios.get('GetProjectInfo/' + this.tutoria.Proyecto)
          .then(response => {
            this.projectSelected = response.data
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      cleanModuleInfo () {
        this.apareceObs = 'NO'
        this.teacherIdentifier = ''
        this.aux.CodModule = ''
        this.aux.CodProject = ''
        this.aux.FechaFin = ''
        this.aux.FechaInicio = ''
        this.aux.Horas = 0
        this.aux.Id = 0
        this.aux.MontoHora = 0
        this.aux.NameModule = ''
        this.aux.Observaciones = ''
        this.aux.SocioNegocio = ''
        this.aux.TeacherCI = ''
        this.aux.TeacherFullName = ''
      },
      loadModuleInfo () {
        this.fakeLoad()
        if (this.action !== 'PUT') {
          this.cleanModuleInfo()
        }
        this.loadModuleInfoBruto()
        console.log('/GetModuleInfo/' + this.tutoria.Modulo + '/' + this.tutoria.Proyecto + '/' + this.tutoria.Id)
        axios.get('/GetModuleInfo/' + this.tutoria.Modulo + '/' + this.tutoria.Proyecto)
          .then(response => {
            this.aux = response.data
            if (this.action !== 'PUT') {
              this.tutoria.MontoHora = this.aux.MontoHora
              this.tutoria.Horas = this.aux.Horas
              if (this.aux.TeacherCI !== '') {
                this.dependiente = true
                this.teacherArray = this.teachers.filter(function (e) {
                  return e.TipoPago === '1'
                })
                this.teacherIdentifier = this.aux.TeacherCI
              }
              if (this.aux.SocioNegocio !== '') {
                this.dependiente = false
                this.teacherArray = this.teachers.filter(function (e) {
                  return e.TipoPago === '0'
                })
                this.teacherIdentifier = this.aux.SocioNegocio
              }
              if (this.aux.Observaciones !== '' && this.aux.Observaciones != null) {
                this.apareceObs = 'SI'
              }
              console.log(this.aux.SocioNegocio)
              console.log(this.aux.TeacherCI)
            }
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadModuleInfoBruto () {
        this.fakeLoad()
        if (this.action !== 'PUT') {
          this.cleanModuleInfo()
        }
        console.log('/GetModuleInfoBruto/' + this.tutoria.Modulo + '/' + this.tutoria.Proyecto + '/' + this.tutoria.Id)
        axios.get('/GetModuleInfoBruto/' + this.tutoria.Modulo + '/' + this.tutoria.Proyecto)
          .then(response => {
            this.aux1 = response.data
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
      loadTeachers () {
        if (!this.but) {
          let teachers = this.teachers
          // Este array guarda la info de los profesores que se cargan la primera vez
          let firstTeachers = this.teacherArray
          let selectedOrigin = '1'
          if (this.origin === 'INDEP') {
            // console.log('This is the PUT action and the selected origin is:' + selectedOrigin)
            selectedOrigin = '0'
          }
          axios.get('DocentesListPostgrado')
            .then(response => {
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a teacherCUNI o teacherBP dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago, Categoria: element.Categoria})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.Regional + '-' + element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago, Categoria: element.Categoria})
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
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a teacherCUNI o teacherBP dependiendo de su origen
                teachers.push({value: element.CUNI, text: element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago, Categoria: element.Categoria})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
                if (element.TipoPago === selectedOrigin) {
                  // console.log('This is the update action: ' + selectedOrigin)
                  firstTeachers.push({value: element.CUNI, text: element.CUNI + '-' + element.FullName, name: element.FullName, TipoPago: element.TipoPago, Categoria: element.Categoria})
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
      loadModalidades () {
        let mods = this.modalidades
        axios.get('Modalidades')
          .then(response => {
            response.data.forEach(function (element) {
              mods.push({value: element.Id, text: element.Modalidad})
            })
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      loadTipoTarea () {
        let tipot = this.tipoTarea
        axios.get('TipoTarea')
          .then(response => {
            response.data.forEach(function (element) {
              tipot.push({value: element.Id, text: element.Tarea})
            })
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      // Envío de datos
      send () {
        if (this.action === 'POST') {
          this.post()
        } else if (this.action === 'PUT') {
          console.log('Algo si entrá al PUT')
          this.put()
        } else {
          console.log('something was printed:' + this.action + ' ')
          // resetear variables de validación
          this.validationMessage()
        }
      },
      cleanScreen () {
        // este método limpia la pantalla, con excepcion del porcentaje y la carrera
        // Variables del objeto que se envía mediante el POST
        this.tutoria.DependencyCod = ''
        this.tutoria.Observaciones = ''
        this.tutoria.TotalNeto = null
        this.tutoria.MontoHora = null
        this.tutoria.Horas = null
        this.tutoria.TotalBruto = null
        this.totalBruto = 0
        this.tutoria.TotalNeto = null
       // this.tutoria.TeacherFullName = ''
        this.tutoria.TeacherBP = ''
        this.tutoria.TeacherCUNI = ''
        this.tutoria.TipoTareaId = null
        this.tutoria.Modulo = ''
        this.tutoria.Proyecto = ''
        this.teacherIdentifier = ''
        this.tutoria.StudentFullName = ''
        this.estudiante = false
        this.tutoria.Factura = false
        this.tutoria.Ignore = false
        // Variables del componente
        this.Deduccion = 0
        this.IUE = 0
        this.IT = 0
        this.apareceObs = 'NO'
        this.teacherIdentifier = ''
        this.aux.CodModule = ''
        this.aux.CodProject = ''
        this.aux.FechaFin = ''
        this.aux.FechaInicio = ''
        this.aux.Horas = 0
        this.aux.Id = 0
        this.aux.MontoHora = 0
        this.aux.NameModule = ''
        this.aux.Observaciones = ''
        this.aux.SocioNegocio = ''
        this.aux.TeacherCI = ''
        this.aux.TeacherFullName = ''
        // Variables de control de errores
      },
      post () {
        /*
        console.log('Aqui la info:')
        console.log('DependencyCod: ' + this.tutoria.DependencyCod)
        console.log('Observaciones: ' + this.tutoria.Observaciones)
        console.log('MontoHora: ' + this.tutoria.MontoHora)
        console.log('Horas: ' + this.tutoria.Horas)
        console.log('CodModulo: ' + this.tutoria.Modulo)
        console.log('TotalBruto: ' + this.tutoria.TotalBruto)
        console.log('TotalNeto: ' + this.tutoria.TotalNeto)
        console.log('TeacherBP: ' + this.tutoria.TeacherBP)
        console.log('TeacherCUNI: ' + this.tutoria.TeacherCUNI)
        console.log('TipoTareaId: ' + this.tutoria.TipoTareaId)
        console.log('Id: ' + this.tutoria.Id)
        console.log('Proyecto: ' + this.tutoria.Proyecto)
        console.log('BranchesId: ' + this.tutoria.BranchesId)
        console.log('Mes: ' + this.tutoria.Mes)
        console.log('Gestion: ' + this.tutoria.Gestion)
        console.log('Origen: ' + this.tutoria.Origen)
        console.log('Ignore: ' + this.tutoria.Ignore)
        // Variables del componente
        console.log('Deduccion: ' + this.tutoria.Deduccion)
        console.log('IUE: ' + this.tutoria.IUE)
        console.log('IT: ' + this.tutoria.IT) */
        axios.post('AsesoriaPostgrado', this.tutoria)
          .then(response => {
            /*
            console.log('Aqui la info:')
            console.log('DependencyCod' + this.tutoria.DependencyCod)
            console.log('Observaciones' + this.tutoria.Observaciones)
            console.log('MontoHora' + this.tutoria.MontoHora)
            console.log('Horas' + this.tutoria.Horas)
            console.log('Categoría' + this.tutoria.Modulo)
            console.log('TotalBruto' + this.tutoria.TotalBruto)
            console.log('TotalNeto' + this.tutoria.TotalNeto)
            console.log('TeacherBP' + this.tutoria.TeacherBP)
            console.log('TeacherCUNI' + this.tutoria.TeacherCUNI)
            console.log('TipoTareaId' + this.tutoria.TipoTareaId)
            console.log('Id' + this.tutoria.Id)
            console.log('Carrera' + this.tutoria.Proyecto)
            console.log('BranchesId' + this.tutoria.BranchesId)
            console.log('Mes' + this.tutoria.Mes)
            console.log('Gestion' + this.tutoria.Gestion)
            console.log('Origen' + this.tutoria.Origen)
            console.log('Ignore' + this.tutoria.Ignore)
            // Variables del componente
            console.log('Deduccion' + this.tutoria.Deduccion)
            console.log('IUE' + this.tutoria.IUE)
            console.log('IT' + this.tutoria.IT) */
            this.successMessage()
            this.cleanScreen()
          })
          .catch(error => {
            this.errorMessage(error.response.data.Message)
            console.log(error.response.data.Message)
          })
      },
      // Actualización de datos
      put () {
        // console.log('AsesoriaDocente/' + this.tutoriaId, this.tutoria)
        axios.put('AsesoriaPostgrado/' + this.tutoriaId, this.tutoria)
          .then(response => {
            console.log('Aqui la info:')
            console.log('DependencyCod' + this.tutoria.DependencyCod)
            console.log('Observaciones' + this.tutoria.Observaciones)
            console.log('MontoHora' + this.tutoria.MontoHora)
            console.log('Horas' + this.tutoria.Horas)
            console.log('Categoría' + this.tutoria.Modulo)
            console.log('TotalBruto' + this.tutoria.TotalBruto)
            console.log('TotalNeto' + this.tutoria.TotalNeto)
            console.log('Acta' + this.tutoria.Acta)
            console.log('ActaFecha' + this.tutoria.ActaFecha)
            console.log('TeacherBP' + this.tutoria.TeacherBP)
            console.log('TeacherCUNI' + this.tutoria.TeacherCUNI)
            console.log('ModalidadId' + this.tutoria.ModalidadId)
            console.log('TipoTareaId' + this.tutoria.TipoTareaId)
            console.log('StudentFullName' + this.tutoria.StudentFullName)
            console.log('Id' + this.tutoria.Id)
            console.log('Carrera' + this.tutoria.Carrera)
            console.log('BranchesId' + this.tutoria.BranchesId)
            console.log('Mes' + this.tutoria.Mes)
            console.log('Gestion' + this.tutoria.Gestion)
            console.log('Valid' + this.tutoria.Valid)
            console.log('Origen' + this.tutoria.Origen)
            console.log('Ignore' + this.tutoria.Ignore)
            // Variables del componente
            console.log('Deduccion' + this.tutoria.Deduccion)
            console.log('IUE' + this.tutoria.IUE)
            console.log('IT' + this.tutoria.IT)
            this.successMessage()
            this.cleanScreen()
            this.onClose()
          })
          .catch(error => {
            this.errorMessage(error.response.data.Message)
          })
      },
      onClose () {
        // emit para cerrar el componente
        this.$emit('back')
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
      validationMessage: function () {
        swal({
          title: `Ups!`,
          text: 'Algunos datos no están validados',
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
      validateDocente () {
        if (this.tutoria.Modulo !== '0') {
          if (this.aux.TeacherCI === '' && this.aux.SocioNegocio !== this.teacherIdentifier) {
            console.log('CI 1if' + this.aux.TeacherCI)
            console.log('SocioNegocio ' + this.aux.SocioNegocio)
            console.log('teacherIdentifier ' + this.teacherIdentifier)
            this.warnMessage('El docente registrado no coincide con el docente del módulo.')
          }
          if (this.aux.SocioNegocio === '' && this.aux.TeacherCI !== this.teacherIdentifier) {
            this.warnMessage('El docente registrado no coincide con el docente del módulo.')
            console.log('CI 2if' + this.aux.TeacherCI)
            console.log('SocioNegocio ' + this.aux.SocioNegocio)
            console.log('teacherIdentifier ' + this.teacherIdentifier)
          }
        }
      },
      validateHoras () {
        if (this.tutoria.Modulo !== '0') {
          if (Number(this.aux.Horas) === Number(this.tutoria.Horas)) {
            console.log(':)')
          } else {
            console.log('Horas registradas' + this.aux.Horas.valueOf())
            console.log('Hora' + this.tutoria.Horas.valueOf())
            this.warnMessage('La cantidad de horas no coincide con lo registrado en el módulo.')
          }
        }
      },
      validateMontoHoras () {
        if (this.tutoria.Modulo !== '0') {
          if (Number(this.aux.MontoHora) === Number(this.tutoria.MontoHora)) {
            console.log(':)')
          } else {
            console.log('3if' + this.aux.MontoHora.valueOf())
            console.log('3if' + this.tutoria.MontoHora.valueOf())
            this.warnMessage('El monto por hora no coincide con lo registrado en el módulo.')
          }
        }
      }
    },
    watch: {
      porHora: function () {
        // Para que el dato de la tutoria no se quede con el valor anterior si fue marcada como "por horas"
        if (!this.porHora) { this.tutoria.Horas = 0 }
      },
      acta: function () {
        if (!this.acta) {
          this.tutoria.Acta = ''
          this.tutoria.ActaFecha = null
        }
      },
      or: function () {
        if (this.or) {
          // Si no es dependiente no puede ser OR
          if (!this.dependiente) {
            this.or = false
          } else {
            // Pero si lo es, entonces el origen es OR
            this.tutoria.Origen = 'OR'
          }
        } else {
          if (this.dependiente) {
            this.tutoria.Origen = 'DEPEN'
          }
        }
      },
      dependiente: function () {
        if (this.dependiente) {
          if (!this.or) {
            this.tutoria.Origen = 'DEPEN'
          }
        }
        if (!this.dependiente) {
          this.tutoria.Origen = 'INDEP'
          // si no es dependiente no puede ser OR
          this.or = false
        }
        // borrar la categoría actual
        this.tutoria.Categoría = ''
        // borramos los datos del docente
        // this.tutoria.TeacherFullName = ''
        this.tutoria.TeacherCUNI = ''
        this.tutoria.TeacherBP = ''
        this.tutoria.IUE = null
        this.tutoria.IT = null
      }
    },
    created () {
      if (this.action === 'PUT') {
        // Solo cargamos los datos de la tutoría cuando hay un PUT, sino cargamos todo menos eso
        this.fakeLoad()
        this.loadTutoria()
        this.loadModalidades()
        this.loadTipoTarea()
        this.loadTeachers()
        this.loadProjects()
      } else {
        this.loadProjects()
        this.loadModalidades()
        this.loadTipoTarea()
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
