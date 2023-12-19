<template>
  <div class="row">
    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <template class="col-md-12 card" v-if="action==='LIST'">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC', actions: false}">
        </data-tables>
      <div class="row">
        <div class="col-md-4 col-md-offset-2" align="center">
          <Info></Info>
        </div>
        <div class="col-md-4"  align="center">
          <button class="btn btn-info" @click="PDFCareer">Generar PDF por Carrera</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-md-offset-2"  align="center" style="margin-top: 10px">
          <button type="button" class="btn btn-info" @click="windowDateSALOMON">Generar archivo PREGRADO SALOMÓN</button>
        </div>
        <div class="col-md-4"  align="center" style="margin-top: 10px">
          <button class="btn btn-info" @click="windowDateSARAI">Generar archivo CARRERA SARAI</button>
        </div>
      </div>
      <template v-if="PDFcarrera==='SI'">
        <div class="row">
          <div class="form-group col-md-6 el-col-md-offset-5">
            <label>Carrera</label>
            <div>
              <model-select class="select-info"
                            :options="Carreras"
                            v-model="CarreraModel"
                            @input="actualCarrera"
                            placeholder="Seleccione una carrera">
              </model-select>
            </div>
          </div>
        </div>
        <div class="form-group col-md-6 el-col-md-offset-5" v-if="aparezco==='SI'">
          <reporte-carrera :origin="origen" :state="estado" :carrera="CarreraModel"></reporte-carrera>
        </div>
      </template>
    </template>
    <br>
    <!--Generacion del archivo SALOMON-->
    <template v-if="action==='MODIFY'">
      <h5 class="text-center">Identificar Periodo de Proceso para el archivo {{file}} .</h5>
      <div class="row">
        <div class="col-md-3 el-col-md-offset-3 form-group">
          <label>Segmento</label>
          <div>
            <el-select class="select-info"
                       name="segmento"
                       size="large"
                       placeholder="Segmento"
                       v-model="segmento">
              <el-option v-for="option in selectBranches"
                         class="select-danger"
                         :value="option.value"
                         :label="option.text"
                         :key="option.value">
              </el-option>
            </el-select>
            <small v-if="formError.Segmento.active" class="form-text text-muted text-danger">{{formError.Segmento.message}}</small>
          </div>
        </div>
        <div class="col-md-3">
          <label>Mes</label>
          <div>
            <el-select class="select-info"
                       name="mes"
                       size="large"
                       placeholder="Mes"
                       v-model="mes">
            <el-option v-for="option in selectMes.values"
                         class="select-danger"
                         :value="option.value"
                         :label="option.text"
                         :key="option.value">
              </el-option>
            </el-select>
            <small v-if="formError.Mes.active" class="form-text text-muted text-danger">{{formError.Mes.message}}</small>
          </div>
        </div>
        <div class="col-md-3">
          <label>Gestion</label>
          <div>
            <input class="form-control"
                   type="text"
                   name="gestion"
                   v-model="gestion"
            />
            <small v-if="isNaN(gestion)" class="form-text text-muted text-danger">El valor debe ser numérico.</small>
            <small v-if="!isNaN(gestion) && gestion!==null && gestion!=='' && ((gestion/1000)<1)" class="form-text text-muted text-danger">El valor debe tener al menos 4 dígitos.</small>
            <small v-if="formError.Gestion.active" class="form-text text-muted text-danger">{{formError.Gestion.message}}</small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 el-col-md-offset-9">
          <button class="btn btn-success btn-fill" @click="send">Generar archivo {{file}}</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import axios from 'axios'
  import { ModelSelect } from 'vue-search-select'
  import swal from 'sweetalert2'
  import Info from '../Report'
  import ReporteCarrera from '../ReportCareers'

  export default {
    components: {
      Datepicker,
      ModelSelect,
      Info,
      ReporteCarrera
    },
    data () {
      return {
        f: false,
        aparezco: 'NO',
        Carreras: [],
        CarreraModel: '',
        PDFcarrera: 'NO',
        fileUrl: '',
        file: 'PREGRADO',
        mes: null,
        segmento: null,
        gestion: null,
        action: 'LIST',
        i: null,
        tutoriaLoaded: false,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/AsesoriaDocente?by=PRE-APROBADO',
        username: '',
        // Nuevo PDF x carrera
        headersPDF: ['Docente', 'Categ', 'Modal', 'Tarea', 'Alumno', 'Acta', 'Fecha Acta', 'Horas', 'Costo Hora', 'Total Bruto', 'Total Neto', 'Observaciones'],
        careersPDF: [],
        teachersPDF: [],
        recordsPDF: [],
        recordsDPDF: [],
        careerResultPDF: [],
        teacherResultPDF: [],
        finalResultPDF: [],
        finalResultDPDF: [],
        selectMes: {
          values: [{value: '01', text: 'Enero'},
            {value: '02', text: 'Febrero'},
            {value: '03', text: 'Marzo'},
            {value: '04', text: 'Abril'},
            {value: '05', text: 'Mayo'},
            {value: '06', text: 'Junio'},
            {value: '07', text: 'Julio'},
            {value: '08', text: 'Agosto'},
            {value: '09', text: 'Septiembre'},
            {value: '10', text: 'Octubre'},
            {value: '11', text: 'Noviembre'},
            {value: '12', text: 'Diciembre'},
            {value: '13', text: 'Retroactivo Enero'},
            {value: '14', text: 'Retroactivo Febrero'},
            {value: '15', text: 'Retroactivo Marzo'},
            {value: '16', text: 'Retroactivo Abril'}]
        },
        formError: {
          Mes: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          Gestion: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          },
          Segmento: {
            active: false,
            message: '*Este valor no puede ser vacio.'
          }
        },
        propsToSearch: ['Id', 'Carrera', 'TeacherFullName', 'TipoTarea', 'StudentFullName', 'Modalidad', 'TotalNeto', 'TotalBruto'],
        tableColumns: [
          {
            prop: 'Id',
            field: 'Id',
            label: '#',
            minWidth: 20
          },
          {
            prop: 'Acta',
            field: 'Acta',
            label: 'Acta',
            minWidth: 15
          },
          {
            prop: 'Carrera',
            field: 'Carrera',
            label: 'Carrera',
            minWidth: 20
          },
          {
            prop: 'TeacherFullName',
            field: 'TeacherFullName',
            label: 'Profesor',
            minWidth: 55
          },
          {
            prop: 'TipoTarea',
            field: 'TipoTarea',
            label: 'Tarea',
            minWidth: 15
          },
          {
            prop: 'StudentFullName',
            field: 'StudentFullName',
            label: 'Estudiante',
            minWidth: 50
          },
          {
            prop: 'Modalidad',
            field: 'Modalidad',
            label: 'Modal',
            minWidth: 15
          },
          {
            prop: 'TotalBruto',
            field: 'TotalBruto',
            label: 'TB',
            minWidth: 20
          },
          {
            prop: 'TotalNeto',
            field: 'TotalNeto',
            label: 'TN',
            minWidth: 20
          },
          {
            prop: 'Duplicado',
            field: 'Duplicado',
            label: 'Dup',
            minWidth: 10
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 20, 50],
          total: 0
        },
        tutoria: null,
        allIds: [],
        selectBranches: []
      }
    },
    methods: {
      windowDateSALOMON () {
        this.action = 'MODIFY'
        this.fileUrl = 'ToPregradoFile?data='
        this.file = 'PREGRADO'
      },
      windowDateSARAI () {
        this.action = 'MODIFY'
        this.fileUrl = 'ToCarreraFile?data='
        this.file = 'CARRERA'
      },
      toPregrado () {
        let data = this.segmento + ';' + this.mes + ';' + this.gestion
        axios.get(this.fileUrl + data,
          {
            responseType: 'arraybuffer',
            headers: {
              'token': localStorage.getItem('token')
            }
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
            swal({
              title: 'Buen trabajo!!',
              text: 'Se enviaron los registros al historial',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            }).then(function () {
              // la página se recarga con frescura :v
              location.reload()
            })
          })
          .catch(error => {
            const blob = new Blob([error.response.data], {type: 'text/plain'})
            const reader = new FileReader()
            let text
            reader.addEventListener('loadend', (e) => {
              text = e.srcElement.result
              console.log(text)
              swal({
                title: `Ups!`,
                text: text,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill',
                type: 'warning'
              })
            })
            reader.readAsText(blob)
          })
      },
      send () {
        if (!this.valid()) {
          console.log('el valor de valid es:' + this.valid())
          this.toPregrado()
        }
      },
      valid: function () {
        // validaciones de la gestion
        this.formError.Gestion.active = this.isEmptyBlanckOrNull(this.gestion)
        this.formError.Gestion.active = isNaN(this.gestion)
        if (!isNaN(this.gestion) && !this.isEmptyBlanckOrNull(this.gestion) && (this.gestion / 1000) < 1) {
          console.log('gestion con menos de 4 dígitos')
          this.formError.Gestion.active = true
        }
        this.formError.Mes.active = this.isEmptyBlanckOrNull(this.mes)
        this.formError.Segmento.active = this.isEmptyBlanckOrNull(this.segmento)
        var x = this.formError.Mes.active || this.formError.Gestion.active || this.formError.Segmento.active
        console.log('el valor de la validación total es:' + x)
        return x
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      loadSegmentos () {
        let mods = this.selectBranches
        axios.get('Branches')
          .then(response => {
            response.data.forEach(function (element) {
              mods.push({value: element.Id, text: element.Abr})
            })
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      PDFCareer () {
        this.PDFcarrera = 'SI'
        this.loadCareers()
        if (this.origen === 'DEP') {
          this.origen = 'DEPEN'
        }
      },
      loadCareers () {
        let carrers = this.Carreras
        axios.get('/AseCarrera?by=PRE-APROBADO')

          .then(response => {
            response.data.forEach(function (element) {
              carrers.push({value: element.Cod, text: element.Cod + '-' + element.Carrera, Id: element.Cod})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      loadCareerBody () {
        if (this.origen === 'DEP') {
          this.origen = 'DEPEN'
        }
        // Cargar el cuerpo, es decir datos por carrera
        let rec = this.records
        axios.get('PDFReportBody?part=Body;' + this.estado + ';' + this.origen)
          .then(response => {
            response.data.forEach(function (tutoria) {
              rec.push(tutoria)
            })
          })
          .catch(error => console.log(error))
        if (this.origen === 'DEPEN') {
          this.origen = 'DEP'
        }
      },
      loadCareerTotals () {
        // Cargar el agrupado por carrera, montos Totales
        // Cargamos los nombres de las carreras
        if (this.origen === 'DEP') {
          this.origen = 'DEPEN'
        }
        let uniqueCareers = this.careers
        let currentResults = this.careerResult
        axios.get('PDFReportBody?part=Results;' + this.estado + ';' + this.origen)
          .then(response => {
            response.data.forEach(function (element) {
              uniqueCareers.push(element.Carrera)
              currentResults.push(element)
            })
          })
          .catch(error => console.log(error))
        if (this.origen === 'DEPEN') {
          this.origen = 'DEP'
        }
      },
      actualCarrera () {
        this.aparezco = 'SI'
      }
    },
    created () {
      this.loadSegmentos()
      this.loadCareerBody()
      this.loadCareerTotals()
    }
  }
</script>
<style>
  .fixI i:link, .fixI i {
    top: 25px!important;
  }
  .btnSpacing {
    padding-left: 120px;
    padding-right: 0px;
  }
</style>
