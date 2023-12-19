<template>
  <div class="row">
    <!--Navbar, selección de opciones-->

    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <template class="col-md-12 card" v-if="actions==='LIST'">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC'}" id="datatable">
        <template slot="buttons" slot-scope="props">
          <!--Botones para modificar o hacer otras acciones-->
          <el-tooltip class="item" effect="dark" content="Editar" placement="top">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="removeAccess(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="Aprobar" placement="top">
            <input type="checkbox"
                   :value="props.queriedData[props.index].Id"
                   v-model="SelectedIds"
                   v-on:click="UpdateIds"/>
          </el-tooltip>
        </template>
      </data-tables>
    </template>
    <!--Si queremos modificar-->
    <template v-if="actions==='MODIFY'">
      <div class=" col-md-12 card">
        <EditTutoria :tutoria-id="i" :action="'PUT'" :origin="origen" v-on:back="Back"></EditTutoria>
      </div>
    </template>
    <!--Enviar a aprobación-->
    <div v-if="actions==='LIST'">
      <div v-if="allIds.length>0">
        <div class="row">
        <div class="col-md-2 el-col-md-offset-2">
          <button class="btn btn-info" @click="generatePDF">Generar PDF</button>
        </div>
        <div class="col-md-3">
          <button class="btn btn-info" @click="PDFCareer">Generar PDF por Carrera</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-info" @click="EraseSelected">
            <span v-if="SelectedIds.length===0">Marcar Todos</span>
            <span v-else>Desmarcar Todos</span>
          </button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-info" @click="UpdateState">Enviar a Pre-Aprobación</button>
        </div>
        </div>
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
    <template v-if="actions==='TOHISTORIC'">
      <h5 class="text-center">Identificar Periodo de Proceso para enviar los registros a Historico.</h5>
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
          <button class="btn btn-success btn-fill" @click="send">Enviar a Historico</button>
        </div>
      </div>
    </template>
    <template v-if="actions==='TOHISTORICOR'">
      <h5 class="text-center">Identificar Periodo de Proceso para enviar los registros a Historico.</h5>
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
          <button class="btn btn-success btn-fill" @click="send">Enviar a Historico</button>
        </div>
      </div>
    </template>
    <template v-if="actions==='OR'">
      <h5 class="text-center">Identificar Periodo de Proceso para generar el archivo SALOMON Otras Regionales.</h5>
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
          <label>Segmento Origen</label>
          <div>
            <el-select class="select-info"
                       name="segmento"
                       size="large"
                       placeholder="Segmento"
                       v-model="segmentoOrigen">
              <el-option v-for="option in selectOrigen"
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
          <button class="btn btn-success btn-fill" @click="send">Enviar a Historico</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { ModelSelect } from 'vue-search-select'
  import Datepicker from 'vuejs-datepicker'
  import EditTutoria from '../ABM/RegistroTutorias'
  import axios from 'axios'
  import swal from 'sweetalert2'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import 'vue2-datepicker/index.css'
  import 'vue2-datepicker/locale/es'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import ReporteCarrera from '../ReportCareers'

  export default {
    components: {
      Datepicker,
      EditTutoria,
      ModelSelect,
      FormWizard,
      TabContent,
      ReporteCarrera
    },
    data () {
      return {
        mes: null,
        segmento: null,
        segmentoOrigen: null,
        gestion: null,
        aparezco: 'NO',
        Carreras: [],
        CarreraModel: '',
        PDFcarrera: 'NO',
        i: null,
        actions: 'LIST',
        SelectedIds: [],
        tutoriaLoaded: false,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/AsesoriaDocente?by=' + this.estado + '-' + this.origen,
        propsToSearch: ['Id', 'Acta', 'Carrera', 'TeacherFullName', 'TipoTarea', 'StudentFullName', 'Modalidad', 'TotalNeto', 'TotalBruto', 'Duplicado'],
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
        create: false,
        allIds: [],
        // variables para el reporte PDF
        selectBranches: [],
        // datos de la tabla
        headers: ['Docente', 'Modal', 'Tarea', 'Alumno', 'Acta', 'Fecha Acta', 'Horas', 'Costo Hora', 'Total Bruto', 'Total Neto', 'Observaciones'],
        careers: [],
        teachers: [],
        records: [],
        recordsD: [],
        careerResult: [],
        teacherResult: [],
        finalResult: [],
        finalResultD: [],
        // Nuevo PDF x carrera
        headersPDF: ['Docente', 'Modal', 'Tarea', 'Alumno', 'Acta', 'Fecha Acta', 'Horas', 'Costo Hora', 'Total Bruto', 'Total Neto', 'Observaciones'],
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
        }
      }
    },
    props: {
      // INDEPENDIENTE, DEPENDIENTE, OR
      origen: {
        required: true
      },
      // REGISTRADO, PRE-APROBADO, APROBADO
      estado: {
        required: true
      },
      // Para complementar el titulo del reporte PDF
      tipo: {
        required: true
      }
    },
    methods: {
      showDateForHistoricOR () {
        this.actions = 'TOHISTORIC'
      },
      ToOR () {
        this.actions = 'OR'
      },
      send () {
        if (this.origen === 'OR') {
          this.UpdateStateOR()
        } else {
          this.SendHistoric()
        }
      },
      toArchivoOR () {
        let data = this.segmento + ';' + this.mes + ';' + this.gestion + ';' + this.segmentoOrigen
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
      enviar () {
        if (!this.valid() && this.origen === 'OR') {
          console.log('el valor de valid OR es:' + this.valid())
          this.UpdateStateOR()
        }
        if (!this.valid() && this.origen !== 'OR') {
          console.log('el valor de valid HISTORICO es:' + this.valid())
          this.SendHistoric()
        }
      },
      EraseSelected () {
        if (this.SelectedIds.length === 0) {
          this.SelectedIds = this.allIds
        } else {
          this.SelectedIds = []
        }
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      // TODO: Esta es la funcion donde envia todo a aprobacion, si es OR lo manda directo
      UpdateState () {
        var vm = this
        if (vm.SelectedIds.length < 1) {
          swal({
            title: 'Debe seleccionar al menos un registro antes de enviar a pre-aprobación.',
            text: 'Intentelo nuevamente.',
            type: 'error',
            confirmButtonClass: 'btn btn-info btn-fill',
            buttonsStyling: false
          })
        } else {
          if (vm.SelectedIds.length > 200) {
            swal({
              title: 'No se puede enviar más de 200 registros a pre-aprobación.',
              text: 'Intentelo nuevamente con menos registros.',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          } else {
            swal({
              title: 'Se enviaran a Pre-Aprobación ' + vm.SelectedIds.length + ' registros.',
              text: '¿Esta seguro?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, enviar!',
              cancelButtonText: 'No, cancelar',
              confirmButtonClass: 'btn btn-success btn-fill',
              cancelButtonClass: 'btn btn-danger btn-fill',
              buttonsStyling: false
            }).then(function () {
              axios.put('ToVerificacion?myArray=' + vm.SelectedIds.join())
                  .then(response => {
                    swal({
                      title: 'Buen trabajo!!',
                      text: 'Se enviaron los registros a pre-aprobación',
                      type: 'success',
                      confirmButtonClass: 'btn btn-success btn-fill',
                      buttonsStyling: false
                    }).then(function () {
                      // la página se recarga con frescura :v
                      location.reload()
                    })
                  })
                  .catch(error => swal({
                    title: 'Hubo un problema al enviar los registros',
                    text: error,
                    type: 'error',
                    confirmButtonClass: 'btn btn-info btn-fill',
                    buttonsStyling: false
                  }))
            }, function (dismiss) {
              if (dismiss === 'cancel') {
                swal({
                  title: 'Cancelado',
                  text: 'No se envió ningún registro a pre-aprobación',
                  type: 'error',
                  confirmButtonClass: 'btn btn-info btn-fill',
                  buttonsStyling: false
                })
              }
            })
          }
        }
      },
      // ta gueno
      errorMessage: function (text) {
        swal({
          title: `Ups!`,
          text: 'Ocurrio un error!\n' + text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      },
      UpdateIds () {
        this.$emit('childinfo', this.SelectedIds)
      },
      Modify (index) {
        this.i = index
        this.actions = 'MODIFY'
      },
      Back () {
        this.actions = 'LIST'
      },
      // SON LOS IDs necesarios para marcar todo lo que esta en la tabla
      loadTutoriaIds () {
        let id = this.allIds
        axios.get('AsesoriaDocente?by=' + this.estado + '-' + this.origen)
          .then(response => {
            response.data.forEach(function (element) {
              // console.log(6
              id.push(element.Id)
            })
            this.allIds = id
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      removeAccess (index) {
        swal({
          title: 'Estas Seguro?',
          text: 'No será posible volver atras!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          axios.delete('DeleteRecord/' + index)
            .then(response => {
              swal({
                title: 'Eliminado!',
                text: 'Se elimino de forma correcta',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              }).then(function () {
                // la página se recarga con frescura :v
                location.reload()
              })
            })
            .catch(error => swal({
              title: 'No se pudo eliminar el registro',
              text: error.response.data.Message,
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            }))
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'Este item está a salvo :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      },
      date_function () {
        this.formattedDate = this.convert()
      },
      convert () {
        let date = new Date()
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [day, mnth, date.getFullYear()].join('-')
      },
      con () {
        console.log('kheeee' + this.searchQueryProp)
      },
      // Metodo para generar el reporte
      generatePDF () {
        // Para que sea largo
        let doc = new jsPDF('landscape')
        doc.setFontSize(8)
        doc.text('Fecha:' + this.formattedDate, 280, 10, null, null, 'right')
        doc.text('Fuente: ISAAC', 280, 15, null, null, 'right')
        var img = new Image()
        img.src = './../static/img/logo_ucb3.png'
        doc.addImage(img, 'PNG', 14, 10, 20, 29)
        doc.setFontSize(18)
        doc.setFontStyle('bold')
        doc.text('Universidad Católica Boliviana "San Pablo" ', 85, 25)
        doc.setFontSize(15)
        doc.text('Actividades Académicas en Pregrado para ' + this.tipo, 85, 32)
        // Para controlar donde comienza el reporte en el eje Y
        let y = 54
        // Para no volver a pasar por un mismo índice de los registros de tutorías
        let index = 0
        // Iteración basada en el número de carreras --> número de tablas a generar
        for (let i = 0; i < this.careers.length; i++) {
          // Nombre de la carrera para filtro
          let careerName = this.careers[i]

          console.log('aqui puej:' + this.careers[i] + i)
          doc.autoTable({
            startY: y,
            head: [
              [
                {
                  content: careerName,
                  colSpan: 12,
                  styles: {halign: 'center', fillColor: [241, 196, 15]}
                }
              ]
            ],
            theme: 'grid'
          })
          // -----------------------------------Para generar la tabla con registros-------------------------------------
          // Para obtener el conteo de filas para la tabla: ocurrencias de la carrera en registros PRE-APROBADOS
          let tableLength = this.records.filter(function (tutoria) {
            console.log(tutoria.Carrera + '=' + careerName)
            return tutoria.Carrera === careerName
          }).length
          console.log('El número de filas para la carrera: ' + careerName + ' es:' + tableLength)
          // Cuerpo de la tabla
          let files = this.records
          let tableBody = []
          for (var tableIndex = index; tableIndex < index + tableLength; tableIndex++) {
            // Crear un array de arrays con los elementos que correspondan
            tableBody.push([files[tableIndex].Docente, files[tableIndex].Modal, files[tableIndex].Tarea, files[tableIndex].Alumno, files[tableIndex].Acta + ' ', (files[tableIndex].Fecha), files[tableIndex].Horas, files[tableIndex].Costo_Hora, files[tableIndex].Total_Bruto, files[tableIndex].Deduccion, files[tableIndex].IUE, files[tableIndex].IT, files[tableIndex].Total_Neto, files[tableIndex].Observaciones])
          }
          // console.log('this is the body with results: ')
          // console.log(tableBody)
          // Para no recorrer el array desde su primera posicion
          index = index + tableLength
          // cargamos la tabla con el cuerpo para la carrera actual
          doc.autoTable({
            startY: doc.previousAutoTable.finalY,
            head: [['Docente', 'Modal', 'Tarea', 'Alumno', 'Acta', 'Fecha', 'Horas', 'Costo Hora', 'Total Bruto', 'Dedu', 'RCIVA', 'IT', 'TotalNeto', 'Observaciones']],
            body: tableBody,
            theme: 'grid',
            styles: {cellPadding: 0.5, fontSize: 8, cellWidth: 'wrap', valign: 'middle'},
            headStyles: {
              fillColor: [4, 134, 230],
              fontSize: 8
            },
            // Las posiciones de los nombres y las observaciones se mantienen estáticas
            columnStyles: {
              text: {cellWidth: 'auto', valign: 'center'},
              0: {cellWidth: 45},
              1: {cellWidth: 10},
              2: {cellWidth: 10},
              3: {cellWidth: 45},
              4: {cellWidth: 15},
              5: {cellWidth: 20},
              6: {cellWidth: 10},
              7: {cellWidth: 15},
              8: {cellWidth: 15},
              9: {cellWidth: 15},
              10: {cellWidth: 15},
              11: {cellWidth: 15},
              12: {cellWidth: 15},
              13: {cellWidth: 23.5}
            }
          })
          // -------------------------------------Tabla con totales por carrera-----------------------------------------
          let careerResults = this.careerResult.filter(function (result) {
            return result.Carrera === careerName
          })
          let resultBody = []
          resultBody.push([careerResults[0].Total_Bruto, careerResults[0].Deduccion, careerResults[0].IUE, careerResults[0].IT, careerResults[0].Total_Neto])
          doc.autoTable({
            startY: doc.previousAutoTable.finalY,
            // para que aparezca debajo de los montos
            margin: {left: 184.2},
            theme: 'grid',
            body: resultBody,
            columnStyles: {0: {cellWidth: 14.7}, 1: {cellWidth: 15.3}, 2: {cellWidth: 14.8}, 3: {cellWidth: 15}, 4: {cellWidth: 15}},
            styles: {cellPadding: 0.5, fontSize: 8, fillColor: [222, 222, 222], fontStyle: 'bold'}
          })
          // Reset del cuerpo para otras carreras y sus resultados
          tableBody = []
          resultBody = []
          // para que el próximo título se posicione después de la tabla
          y = doc.previousAutoTable.finalY + 10
        }
        // ---------------------------------------Generar la tabla con costos finales ----------------------------------
        doc.autoTable({
          startY: y,
          theme: 'grid',
          body: this.finalResult,
          margin: {left: 184.2},
          columnStyles: {0: {cellWidth: 14.7}, 1: {cellWidth: 15.3}, 2: {cellWidth: 14.8}, 3: {cellWidth: 15}, 4: {cellWidth: 15}},
          styles: {cellPadding: 0.5, fontSize: 8, fillColor: [222, 222, 222], fontStyle: 'bold'}
        })
        doc.setFontSize(8)
        doc.setFontStyle('normal')
        doc.text('Reporte generado por: ' + this.username, 14, y + (205 - y) - 10)
        doc.save('ReporteAgrupado.pdf')
        return doc
      },
      // Metodos para el cuerpo del PDF
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
      loadAllTotals () {
        if (this.origen === 'DEP') {
          this.origen = 'DEPEN'
        }
        // Cargar el total de todas las regionales que ve el usuario
        let final = this.finalResult
        axios.get('PDFReportBody?part=FinalResult;' + this.estado + ';' + this.origen)
          .then(response => {
            response.data.forEach(function (element) {
              final.push([element.Total_Bruto, element.Deduccion, element.IUE, element.IT, element.Total_Neto])
            })
          })
          .catch(error => console.log(error))
        if (this.origen === 'DEPEN') {
          this.origen = 'DEP'
        }
      },
      loadBranchData () {
        let regionals = this.selectBranches
        axios.get('branches/')
          .then(response => {
            response.data.forEach(function (element) {
              regionals.push({value: element.Id, text: element.Name})
            })
          })
          .catch(error => console.log(error))
      },
      loadSegmentoOrigen () {
        let regionals = this.segmentoOrigen
        axios.get('AsesoriaDocente/segmentoOrigen/')
          .then(response => {
            response.data.forEach(function (element) {
              regionals.push({value: element.Id, text: element.Name})
            })
          })
          .catch(error => console.log(error))
      },
      sayMyName () {
        axios.get('auth/UserData')
          .then(response => {
            this.username = response.data
            console.log(this.username + ' is the user who does the report')
          })
          .catch(error => console.log(error))
      },
      loadCareers () {
        let carrers = this.Carreras
        axios.get('/AseCarrera?by=' + this.estado + '-' + this.origen)

          .then(response => {
            response.data.forEach(function (element) {
              carrers.push({value: element.Cod, text: element.Cod + '-' + element.Carrera, Id: element.Cod})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      PDFCareer () {
        this.PDFcarrera = 'SI'
        this.loadCareers()
        if (this.origen === 'DEP') {
          this.origen = 'DEPEN'
        }
      },
      actualCarrera () {
        this.fakeLoad()
        this.aparezco = 'SI'
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 1000)
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
        console.log('el valor de la validación total es:' + this.formError.Mes.active + '||' + this.formError.Gestion.active + '||' + this.formError.Segmento.active)
        console.log(this.formError.Mes.active)
        console.log(this.formError.Gestion.active)
        console.log(this.formError.Segmento.active)
        return x
      }
    },
    created () {
      this.date_function()
      this.loadTutoriaIds()
      // para el reporte
      this.loadCareerBody()
      this.loadCareerTotals()
      this.loadAllTotals()
// Docente PDF
      this.loadBranchData()
      this.sayMyName()
    }
  }
</script>
<style>
  .btn-group {
    margin: 20px;
  }
  input[type=radio] {
  }
</style>
