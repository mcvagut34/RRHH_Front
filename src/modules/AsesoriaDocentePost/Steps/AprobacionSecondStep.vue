<template>
  <div class="row">
    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <template class="col-md-12 card" v-if="action==='LIST'">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC II', actions: false}">
        </data-tables>
      <div class="row">
        <div class="col-md-2 el-col-md-offset-2">
          <Info></Info>
        </div>
        <div class="col-md-4" align="center">
          <button type="button" class="btn btn-info" @click="windowDateSALOMON">Generar archivo POSGRADO SALOMÓN</button>
        </div>
        <div class="col-md-4" align="center">
          <button class="btn btn-info" @click="windowDateSARAI">Generar archivo PROYECTOS SARAI</button>
        </div>
      </div>
    </template>
    <br>
    <!--Generacion del archivo SALOMON-->
    <template v-if="action==='MODIFY'">
      <h5 class="text-center">Identificar Periodo de Proceso para el archivo {{title}} {{file}} .</h5>
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
      <div class="row" v-if="file==='PROYECTOS'">
        <div class="col-md-9 el-col-md-offset-3 form-group" align="center">
          <label>Proyecto</label>
          <div>
            <model-select class="select-info"
                          :options="projects"
                          v-model="Proyecto"
                          placeholder="Seleccione un proyecto">
            </model-select>
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

  export default {
    components: {
      Datepicker,
      ModelSelect,
      Info
    },
    data () {
      return {
        title: 'SALOMON',
        fileUrl: '',
        file: 'POSGRADO',
        Proyecto: '',
        projects: [],
        mes: null,
        segmento: null,
        gestion: null,
        action: 'LIST',
        i: null,
        tutoriaLoaded: false,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/AsesoriaPostgrado?by=PRE-APROBADO',
        username: '',
        propsToSearch: ['Id', 'Proyecto', 'Modulo', 'TeacherFullName', 'TipoTarea', 'TotalNeto', 'TotalBruto'],
        tableColumns: [
          {
            prop: 'Id',
            field: 'Id',
            label: '#',
            minWidth: 15
          },
          {
            prop: 'Proyecto',
            field: 'Proyecto',
            label: 'Proyecto',
            minWidth: 20
          },
          {
            prop: 'Modulo',
            field: 'Modulo',
            label: 'Módulo',
            minWidth: 20
          },
          {
            prop: 'TeacherFullName',
            field: 'TeacherFullName',
            label: 'Profesor',
            minWidth: 60
          },
          {
            prop: 'TipoTarea',
            field: 'TipoTarea',
            label: 'Tarea',
            minWidth: 20
          },
          {
            prop: 'TotalBruto',
            field: 'TotalBruto',
            label: 'TB',
            minWidth: 25
          },
          {
            prop: 'TotalNeto',
            field: 'TotalNeto',
            label: 'TN',
            minWidth: 25
          },
          {
            prop: 'Origen',
            field: 'Origen',
            label: 'Origen',
            minWidth: 25
          },
          {
            prop: 'Ignored',
            field: 'Ignored',
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
        selectBranches: [],
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
    methods: {
      windowDateSALOMON () {
        this.action = 'MODIFY'
        this.fileUrl = 'ToPostgradoFile?data='
        this.file = 'POSGRADO'
        this.title = 'SALOMON/'
      },
      windowDateSARAI () {
        this.action = 'MODIFY'
        this.fileUrl = 'ToProyectosFile?data='
        this.file = 'PROYECTOS'
        this.title = 'SARAI/'
      },
      toPregrado () {
        if (this.file === 'POSGRADO') {
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
        } else {
          let data = this.segmento + ';' + this.mes + ';' + this.gestion + ';' + this.Proyecto
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
        }
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
              mods.push({value: element.Id, text: element.Name})
            })
          })
          .catch(error => console.log(error + 'Im here cause I messed up'))
      },
      loadProjects () {
        let proyectos = this.projects
        axios.get('GetProjectsOptions/')
          .then(response => {
            response.data.forEach(function (element) {
              proyectos.push({value: element.PrjCode, text: element.PrjCode + '-' + element.PrjName, BranchesId: element.BranchesId, Id: element.Id})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      }
    },
    created () {
      this.loadSegmentos()
      this.loadProjects()
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
