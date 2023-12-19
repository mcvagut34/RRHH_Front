<template>
  <div v-if="!IsFetching" class="col-md-12">
    <div class="panel-body">
      <!--Carrera-->
      <div class="row">
        <div class="form-group col-md-8 col-md-offset-2">
          <label>Carrera</label>
          <div>
            <model-select class="select-info"
                          :options="careers"
                          v-model="busqCarrera">
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
      <!--Modalidad-->
      <div class="row">
        <div class="form-group col-md-4 col-md-offset-2">
          <label>Modalidad</label>
          <div>
            <model-select class="select-info"
                          :options="modalidades"
                          v-model="busqModalidad">
            </model-select>
          </div>
        </div>
        <div class="form-group col-md-4">
          <label>Tipo Tarea</label>
          <div>
            <model-select class="select-info"
                          :options="tipoTarea"
                          v-model="busqTarea">
            </model-select>
          </div>
        </div>
      </div>
      <!--Estudiante-->
      <div class="row">
        <!-- <div class="form-group col-md-8 col-md-offset-2">
          <label >Nombre del Alumno</label>
          <input type="text" style="text-transform: uppercase;" class="form-control textBox" v-model.lazy="busqStudent">
        </div> -->
        <div class="form-group col-md-6 col-md-offset-2">
          <label>Nombre del Alumno</label>
          <model-select class="select-info"
                        :options="alumnos"
                        v-model="busqStudent"
          >
          </model-select>
        </div>
        <!--
        <div>
          <div class="form-group col-md-3">
            <label >Acta</label>
            <input type="text" placeholder="N° Acta" class="form-control textBox" v-model="busqueda.Acta">
            <small v-if="formError.Acta.active" class="form-text text-muted text-danger">{{formError.Acta.message}}</small>
          </div>
          <div class="form-group col-md-3">
            <label> Fecha </label>
            <div class="row">
              <date-picker
                v-model="busqueda.ActaFecha"
                :format=format
                :use-utc="true"
                placeholder="DD/MM/YYYY"
              ></date-picker>
            </div>
          </div>
        </div>
        -->
      </div>
      <!--Mes y Gestion-->
      <div class="row">
        <div class="form-group col-md-4 col-md-offset-2">
          <label>Mes</label>
          <div>
            <model-select class="select-info"
                          :options="months"
                          v-model="busqMes">
            </model-select>
          </div>
        </div>
        <div class="form-group col-md-4">
          <label >Gestión</label>
          <input type="text" style="text-transform: uppercase;" class="form-control textBox" v-model="busqGestion">

        </div>
      </div>
      <!--Botón que envía la información del form-->
      <div class="row">
        <div class="form-group col-md-2 col-md-offset-4">
           <reporte :url="busqCarrera + '/' + busqTeacherCUNI + '/' + busqDependencyCod + '/' + busqModalidad + '/' + busqTarea + '/' + busqStudent + '/' + busqMes + '/' + busqGestion + '/' + busqOrigenQuery"></reporte>
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
  import Reporte from './ReporteBusquedaAvanzada'
  export default {
    components: {
      ModelSelect,
      Reporte
    },
    data: function () {
      return {
        months: [],
        origins: [],
        selectMes: [{Id: '01', Name: 'Enero'},
            {Id: '02', Name: 'Febrero'},
            {Id: '03', Name: 'Marzo'},
            {Id: '04', Name: 'Abril'},
            {Id: '05', Name: 'Mayo'},
            {Id: '06', Name: 'Junio'},
            {Id: '07', Name: 'Julio'},
            {Id: '08', Name: 'Agosto'},
            {Id: '09', Name: 'Septiembre'},
            {Id: '10', Name: 'Octubre'},
            {Id: '11', Name: 'Noviembre'},
            {Id: '12', Name: 'Diciembre'}],
        selectOrigen: [{Id: '0', Name: 'TODOS'},
          {Id: '1', Name: 'DEPEN'},
          {Id: '2', Name: 'INDEP'}],
        dependencyOptions: [],
        but: false,
        IsFetching: true,
        alumnos: [],
        careers: [],
        modalidades: [],
        tipoTarea: [],
        dependiente: true,
        or: false,
        teacherIdentifier: '',
        teacherArray: [],
        teachers: [],
        busqCarrera: null,
        busqTeacherCUNI: null,
        busqDependencyCod: null,
        busqStudent: null,
        busqMes: null,
        busqGestion: null,
        busqOrigen: 'DEPEN',
        busqModalidad: null,
        busqTarea: null,
        busqOrigenQuery: '0'
      }
    },
    computed: {
      lockDependiente: function () {
        if (this.or && !this.dependiente) {
          this.dependiente = false
        }
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
      loadAlumno () {
        let alumnos = this.alumnos
        axios.get('AlumnosListBusqueda')
          .then(response => {
            console.log('Response Data:', response.data)
            response.data.forEach(function (element) {
              console.log('Adding Element:', element)
              alumnos.push({value: element.StudentFullName, text: element.StudentFullName})
            })
          })
          .catch(error => console.error('El error es ', error.response || error))
        this.IsFetching = false
      },
      loadCareers () {
        let carreras = this.careers
        axios.get('CarrerasListBusqueda')
          .then(response => {
            response.data.forEach(function (element) {
              carreras.push({value: element.Cod, text: element.Cod + '-' + element.Name, BranchesId: element.BranchesId, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadMonth () {
        let month = this.months
        this.selectMes.forEach(function (element) {
          month.push({value: element.Id, text: element.Name})
        })
      },
      loadOrigin () {
        let month = this.origins
        this.selectOrigen.forEach(function (element) {
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
        axios.get('DocentesListBusqueda')
            .then(response => {
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
      loadDependency () {
        let op = this.dependencyOptions
        axios.get('/AsesoriaDocente/dependenciasUsadas/')
          .then(response => {
            response.data.forEach(function (element) {
              // console.log(element)
              op.push({value: element.Cod, text: element.Cod + '-' + element.Name})
            })
          })
          .catch(error => console.log(error))
      },
      cleanScreen () {
        // este método limpia la pantalla, con excepcion del porcentaje y la carrera
        // Variables del objeto que se envía mediante el POST
        this.busqCarrera = null
        this.busqTeacherCUNI = null
        this.busqDependencyCod = null
        this.busqStudent = null
        this.busqMes = null
        this.busqGestion = null
        this.busqOrigen = 'DEPEN'
        this.busqModalidad = null
        this.busqTarea = null
        this.busqOrigenQuery = '0'
        // Variables del componente
        // Variables de control de errores
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
      }
    },
    created () {
      this.loadModalidades()
      this.loadTipoTarea()
      this.loadTeachers()
      this.loadCareers()
      this.loadAlumno()
      this.loadDependency()
      this.loadMonth()
      this.loadOrigin()
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
