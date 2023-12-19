<template>
  <div v-if="!IsFetching" class="col-md-12">
    <div class="panel-body">
      <!--Fechas-->
      <div class="row">
        <div class="form-group col-md-8 col-md-offset-2">
          <div class="form-group col-md-4">
            <label> Fecha Inicio* </label> <br>
            <date-picker
              v-model="busqDate1"
              :format=format
              :use-utc="utc"
              style="background-color: #f0efeb"
              placeholder="DD/MM/YYYY"
            ></date-picker>
          </div>
          <div class="form-group col-md-4 col-md-offset-2">
            <label> Fecha Fin* </label><br>
            <date-picker
              v-model="busqDate2"
              :format=format
              :use-utc="utc"
              style="background-color: #f0efeb"
              placeholder="DD/MM/YYYY"
            ></date-picker>
          </div>
        </div>
      </div>
      <!--Proyecto-->
      <div class="row">
        <div class="form-group col-md-8 col-md-offset-2">
          <label>Proyecto</label>
          <div>
            <model-select class="select-info"
                          :options="projects"
                          @input="loadModulesUsedByProject"
                          v-model="busqProjects">
            </model-select>
          </div>
        </div>
      </div>
      <!--Modulo-->
      <div class="row">
        <div class="form-group col-md-8 col-md-offset-2">
          <label>Módulo</label>
          <div>
            <model-select class="select-info"
                          :options="modulos"
                          v-model="busqModules">
            </model-select>
          </div>
        </div>
      </div>
      <!--Docente-->
      <div class="row">
        <div class="form-group col-md-6 col-md-offset-2">
          <label>Docente</label>
          <model-select class="select-info"
                        :options="teachers"
                        v-model="busqTeacherCUNI"
          >
          </model-select>
        </div>
        <div class="form-group col-md-2">
          <label>Origen</label>
          <model-select class="select-info"
                        :options="origins"
                        v-model="busqOrigenQuery"
          >
          </model-select>
        </div>
      </div>
      <!--Tarea Mes Gestion-->
      <div class="row">
        <div class="form-group col-md-4 col-md-offset-2">
          <label>Tipo Tarea</label>
          <div>
            <model-select class="select-info"
                          :options="tipoTarea"
                          v-model="busqTarea">
            </model-select>
          </div>
        </div>
        <div class="col-md-2">
          <label>Mes</label>
          <div>
            <model-select class="select-info"
                          :options="months"
                          v-model="busqMes">
            </model-select>
          </div>
        </div>
        <div class="col-md-2">
          <label >Gestión</label>
          <input type="text" style="text-transform: uppercase;" class="form-control textBox" v-model="busqGestion">

        </div>
      </div>
      <!--Botón que envía la información del form-->
      <div class="row">
        <div class="form-group col-md-2 col-md-offset-4">
           <reporte :url="formatData()"></reporte>
        </div>
        <div class="col-md-2">
          <button class="btn btn-danger btn-fill" @click="cleanScreen()">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'vue2-datepicker/index.css'
  import 'vue2-datepicker/locale/es'
  import swal from 'sweetalert2'
  import { ModelSelect } from 'vue-search-select'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import Reporte from './ReporteFechas'
  import DatePicker from 'vue2-datepicker'
  export default {
    components: {
      ModelSelect,
      Reporte,
      DatePicker
    },
    data: function () {
      return {
        format: 'DD/MM/YYYY',
        utc: true,
        months: [],
        origins: [],
        selectMes: [{Id: '01', Name: 'ENERO'},
            {Id: '02', Name: 'FEBRERO'},
            {Id: '03', Name: 'MARZO'},
            {Id: '04', Name: 'ABRIL'},
            {Id: '05', Name: 'MAYO'},
            {Id: '06', Name: 'JUNIO'},
            {Id: '07', Name: 'JULIO'},
            {Id: '08', Name: 'AGOSTO'},
            {Id: '09', Name: 'SEPTIEMBRE'},
            {Id: '10', Name: 'OCTUBRE'},
            {Id: '11', Name: 'NOVIEMBRE'},
            {Id: '12', Name: 'DICIEMBRE'}],
        selectOrigen: [{Id: '0', Name: 'TODOS'},
          {Id: '1', Name: 'DEPEN'},
          {Id: '2', Name: 'INDEP'}],
        dependencyOptions: [],
        but: false,
        IsFetching: true,
        projects: [],
        modulos: [],
        tipoTarea: [],
        dependiente: true,
        or: false,
        teacherIdentifier: '',
        teacherArray: [],
        teachers: [],
        busqProjects: null,
        busqModules: null,
        busqTeacherCUNI: null,
        busqDependencyCod: null,
        busqStudent: null,
        busqMes: null,
        busqGestion: null,
        busqOrigen: 'DEPEN',
        busqModalidad: null,
        busqTarea: null,
        busqOrigenQuery: '0',
        busqDate1: null,
        busqDate2: null
      }
    },
    methods: {
      // --------------------------Para la validación antes del POST/PUT----------------------------
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      },
      loadProjects () {
        let proyectos = this.projects
        axios.get('ProyectosUsed')
          .then(response => {
            console.log('Proyectos: si cargo')
            response.data.forEach(function (element) {
              proyectos.push({value: element.Cod, text: element.Cod + '-' + element.Name, BranchesId: element.BranchesId, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadModulesUsed () {
        let modulo = this.modulos
        axios.get('ModulesUsed')
          .then(response => {
            console.log('Modulos: si cargo')
            response.data.forEach(function (element) {
              modulo.push({value: element.Cod, text: element.CodAux + '-' + element.Cod + '-' + element.Name, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadModulesUsedByProject () {
        this.modulos = []
        let modulo = this.modulos
        axios.get('ModulesUsedByProject/' + this.busqProjects)
          .then(response => {
            console.log('Modulos por proyecto: si cargo')
            response.data.forEach(function (element) {
              modulo.push({value: element.Cod, text: element.CodAux + '-' + element.Cod + '-' + element.Name, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadMonth () {
        let month = this.months
        this.selectMes.forEach(function (element) {
          console.log('Mes: si cargo')
          month.push({value: element.Id, text: element.Name})
        })
      },
      loadOrigin () {
        let month = this.origins
        this.selectOrigen.forEach(function (element) {
          console.log('Origen: si cargo')
          month.push({value: element.Id, text: element.Name})
        })
      },
      convert (str) {
        let date = new Date(str)
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join('-')
      },
      loadTeachers () {
        let teachers = this.teachers
        axios.get('DocentesListBusquedaPost')
            .then(response => {
              console.log('Teachers: si cargo')
              response.data.forEach(function (element) {
                // Se envío el BP como CUNI para que solo llegara un valor en el value, que se asignará después a teacherCUNI o teacherBP dependiendo de su origen
                teachers.push({value: element.FullName, text: element.Regional + '-' + element.FullName, name: element.FullName})
                // console.log('Terachers' + element.CUNI + '-' + element.FullName)
                // Creamos un array con los docentes dependientes
              })
              // console.log('el array de los profesores es:')
              // console.log(firstTeachers)
            })
            .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadTipoTarea () {
        let tipot = this.tipoTarea
        axios.get('TipoTarea')
          .then(response => {
            console.log('Tarea: si cargo')
            response.data.forEach(function (element) {
              tipot.push({value: element.Id, text: element.Tarea})
            })
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      cleanScreen () {
        // este método limpia la pantalla
        this.busqProjects = null
        this.busqModules = null
        this.busqTeacherCUNI = null
        this.busqMes = null
        this.busqGestion = null
        this.busqTarea = null
        this.busqOrigenQuery = '0'
        this.busqDate2 = null
        this.busqDate1 = null
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
      convertDate (str) {
        let date = new Date(str)
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join('-')
      },
      formatData () {
        console.log(this.busqProjects + '/' + this.busqModules + '/' + this.busqTeacherCUNI + '/' + this.busqOrigenQuery + '/' + this.busqTarea + '/' + this.busqMes + '/' + this.busqGestion + '/' + this.convertDate(this.busqDate1) + '/' + this.convertDate(this.busqDate2))
        return this.busqProjects + '/' + this.busqModules + '/' + this.busqTeacherCUNI + '/' + this.busqOrigenQuery + '/' + this.busqTarea + '/' + this.busqMes + '/' + this.busqGestion + '/' + this.convertDate(this.busqDate1) + '/' + this.convertDate(this.busqDate2)
      }
    },
    created () {
      this.loadProjects()
      this.loadModulesUsed()
      this.loadTeachers()
      this.loadOrigin()
      this.loadTipoTarea()
      this.loadMonth()
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
    text-transform: uppercase;
  }
</style>
