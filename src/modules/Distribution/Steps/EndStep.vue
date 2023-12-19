<template>
  <div class="row">
    <div class="col-md-12" style="text-align:center">
      <data-tables v-if="this.$store.state.dist.uploadedFiles.state==='WARNING' || this.$store.state.dist.uploadedFiles.state==='ERROR'"  v-bind="{url, propsToSearch, tableColumns,actions}">
      </data-tables>
      <el-table v-if="this.$store.state.dist.uploadedFiles.state==='VALIDATED'" class="table-striped" :data="tableData">
        <el-table-column label="Columna" property="name"></el-table-column>
        <el-table-column label="Monto" property="total"></el-table-column>
      </el-table>
      <button  v-if="this.$store.state.dist.uploadedFiles.state==='STARTED'"  type="button" class="btn btn-wd btn-fill btn-success" style="margin-top: 25px; margin-left: 10px" @click="validate">
        <span class="btn-label">
            <i class="fa fa-check"></i>
               VALIDAR ARCHIVOS
        </span>
      </button>
      <button  v-if="this.$store.state.dist.uploadedFiles.state==='VALIDATED'" type="button" class="btn btn-wd btn-fill btn-success" style="margin-top: 25px; margin-left: 10px" @click="process">
        <span class="btn-label">
            <i class="fa fa-check"></i>
               PROCESAR ARCHIVOS
        </span>
      </button>
      <button v-if="this.$store.state.dist.uploadedFiles.state==='WARNING'" type="button" class="btn btn-wd btn-fill btn-warning" style="margin-top: 25px; margin-left: 10px" @click="ignore">
        <span class="btn-label">
            <i class="fa fa-exclamation-circle"></i>
               IGNORAR ADVERTENCIAS
        </span>
      </button>
      <button v-if="this.$store.state.dist.uploadedFiles.state!='PROCESSED'" type="button" class="btn btn-wd btn-fill btn-danger" style="margin-top: 25px; margin-left: 10px" @click="cancel">
        <span class="btn-label">
            <i class="fa fa-times"></i>
               CANCELAR
        </span>
      </button>
      <div v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED'">
        <div class="sa-success" style="margin: 0 auto">
          <div class="sa-success-tip"></div>
          <div class="sa-success-long"></div>
          <div class="sa-success-placeholder"></div>
          <div class="sa-success-fix"></div>
        </div>
      </div>
      <br><br>
      <template v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED' || this.$store.state.dist.uploadedFiles.state==='INSAP'">

        <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="TotalGeneral">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Total General
          </span>
        </button>
        <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="TotalCuenta">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Total por Cuenta
          </span>
        </button>

        <button  type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="comprobante">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Descargar Detalle
          </span>
        </button>
      </template>
      <br><br>
      <template v-if="this.$store.state.dist.uploadedFiles.state==='INSAP'">
        <button  type="button" class="btn btn-wd btn-fill btn-warning" style="margin: 0 auto" @click="isTherePreliminar">
                <span class="btn-label">
                  <i class="fa fa-file" ></i>
                  Generar Comprobante Preliminar Interregional
                </span>
        </button>
        <br><br>
        <template v-if="therePreliminar==='true'">
          <div class="col-md-3 el-col-md-offset-9">
            <div class="form-group">
              <div align="center">
                <el-select
                  name="preliminar1"
                  filterable
                  size="little"
                  style="height: 40%; width: 95%;"
                  v-model="preliminarModel"
                  placeholder="Seleccione regional">
                  <el-option v-for="option in loadPreliminarOption"
                             :value="option.value"
                             :label="option.text"
                             :key="option.value">
                  </el-option>
                </el-select>
              </div>
              <br>
              <button  type="button" class="btn btn-wd btn-fill btn-success" style="margin: 0 auto" @click="preliminar(preliminarModel)">
                <span class="btn-label">
                  <i class="fa fa-file" ></i>
                  Generar Interregional
                </span>
              </button>
            </div>
          </div>

        </template>
      </template>
      <br><br>
      <template v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED' && bandera==='SI'">
        <form v-on:submit.prevent="SAPVoucher">
          <input type="checkbox" id="checkbox" v-model="checked"> He verificado los datos de la distribución
          <br><br>
          <template v-if="checked">
            <div class="form-group">
              <div class="row">
                <label>Fecha para el Registro Contable</label>
              </div>
              <div class="row">
                <div class="form-group" style="margin: 0 auto; width: 200px;">

                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Registro Contable"
                              v-model="date"
                              :required=true
                              :use-utc="true"
                              style="margin-left: auto;margin-right: auto">
                  </datepicker></div>

              </div>
            </div>
            <button v-if="!inprogress" type="submit" class="btn btn-wd btn-fill btn-success" style="margin: 0 auto">
              <span class="btn-label">
                  <i class="fa fa-file-excel" ></i>
                     Contabilizar en SAP
              </span>
            </button>
            <progressbar v-if="inprogress" :currentValue="value" :addtext="loadingText" :is_error="is_error">
            </progressbar>
          </template>
        </form>
      </template>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import progressbar from 'src/components/UIComponents/ProgrssBar'
  import swal from 'sweetalert2'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'

  export default {
    components: {
      progressbar,
      swal,
      Datepicker
    },
    data () {
      return {
        es: es,
        format: 'dd-MMM-yyyy',
        date: null,
        is_error: false,
        timer: null,
        value: '0',
        estimatedTime: 0,
        loadingText: '',
        inprogress: false,
        rowCount: 0,
        therePreliminar: '',
        rowsUploaded: 0,
        checked: false,
        loadPreliminarOption: [],
        preliminarModel: [],
        url: '/Payroll/Geterrors/' + this.$store.state.dist.uploadedFiles.id,
        state: this.$store.state.dist.uploadedFiles.state,
        propsToSearch: [ 'CUNI', 'Name', 'Type' ],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 40
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 60
          },
          {
            prop: 'Description',
            label: 'Descripción',
            minWidth: 100
          },
          {
            prop: 'Archivos',
            label: 'Archivos',
            minWidth: 60
          },
          {
            prop: 'Type',
            label: 'Tipo',
            minWidth: 20
          }
        ],
        actions: false,
        tableData: [],
        bandera: 'SI'
      }
    },
    methods: {
      validate () {
        axios.get('/payroll/validate/' + this.$store.state.dist.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
            this.$store.dispatch('crud/loadData', '/Payroll/Geterrors/' + this.$store.state.dist.uploadedFiles.id)
            this.loadTotales()
          })
          .catch(error => console.log(error))
      },
      ignore () {
        this.tableData = []
        axios.get('/payroll/acceptwarnings/' + this.$store.state.dist.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
            this.loadTotales()
          })
          .catch(error => console.log(error))
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 10000)
      },
      comprobante () {
        axios.get('/payroll/getdistribution/' + this.$store.state.dist.uploadedFiles.id,
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
          })
          .catch(error => console.log(error))
      },
      isTherePreliminar () {
        console.log('/PreliminarFromProcess/' + this.$store.state.dist.uploadedFiles.id)
        axios.get('Preliminar/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            this.therePreliminar = response.data
            console.log(this.therePreliminar)
            if (this.therePreliminar === 'true') {
              this.getPreliminar()
            } else {
              swal('Ups!', 'Aún no se cuenta con registros Interregionales para su regional', 'error')
            }
          })
          .catch(error => console.log(error))
      },
      getPreliminar () {
        let aux = this.loadPreliminarOption
        console.log('/GetPreliminarFromProcess/' + this.$store.state.dist.uploadedFiles.id)
        axios.get('/GetPreliminarFromProcess/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            response.data.forEach(function (element) {
              aux.push({value: element.RegionalOrigen, text: element.Name})
            })
            this.loadPreliminarOption = aux
          })
          .catch(error => console.log(error))
      },
      preliminar (regional) {
        /* var moment = require('moment') */
        /* this.date = moment(this.date).format('YYYY-MM-DD') */
        console.log('para esta:' + regional)
        this.fakeLoad()
        axios.post('/payroll/SendPreliminarSAP/' + this.$store.state.dist.uploadedFiles.id,
          {
            regionalOrigen: regional
          },
          {
            responseType: 'arraybuffer',
            headers: {
              'token': localStorage.getItem('token')
            }
          }
        )
          .then(response => {
            this.fakeLoad()
            this.value = '100'
            let resp = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.data)))
            let newkeyStr = ''
            try {
              this.fakeLoad()
              newkeyStr = '\nEl número de comprobante preliminar contable en SAP es: ' + resp.newkey
            } catch (e) {
              newkeyStr = ''
            }
            this.fakeLoad()
            swal('Perfecto!', 'Se generó el asiento contable con exito.' + newkeyStr, 'success').then(function () {
              // la página se recarga con frescura :v
              location.reload()
            })
            this.inprogress = false
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.is_error = true
              swal('Ups!', 'Su usuario no cuenta con los permisos necesatios para conabilizar ente comprobante contable.', 'error')
            } else {
              if (error.response.status === 500) {
                this.is_error = true
                swal('Ups!', 'Ocurrio un error en al generar el comprobante, por favor reporte este problema.', 'error')
              } else {
                window.clearTimeout(this.timer)
                this.is_error = true
                swal('Ups!', 'Inconsistencia con cuentas en SAP B1. Por favor reporte este error.', 'error')
              }
            }
          })
      },
      TotalGeneral () {
        axios.get('/payroll/GetTotalGeneral/' + this.$store.state.dist.uploadedFiles.id,
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
          })
          .catch(error => console.log(error))
      },
      TotalCuenta () {
        axios.get('/payroll/GetTotalCuenta/' + this.$store.state.dist.uploadedFiles.id,
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
          })
          .catch(error => console.log(error))
      },
      convert (str) {
        let date = new Date(str)
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join('-')
      },
      SAPVoucher () {
        /* var moment = require('moment') */
        if (this.date !== null) {
          this.inprogress = true
          this.getRows()
          this.initloader()
          /* this.date = moment(this.date).format('YYYY-MM-DD') */
          console.log('fecha' + this.date)
          axios.post('/payroll/GetSAPResume/' + this.$store.state.dist.uploadedFiles.id,
            {
              date: this.date
            },
            {
              responseType: 'arraybuffer',
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          )
            .then(response => {
              this.value = '100'
              this.rowsUploaded = this.rowCount
              this.loadingText = '[' + this.rowsUploaded + '/' + this.rowCount + '] Registros Completados'
              window.clearTimeout(this.timer)
              let resp = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.data)))
              let newkeyStr = ''
              try {
                newkeyStr = '\nEl número de comprobante contable en SAP es: ' + resp.newkey
              } catch (e) {
                newkeyStr = ''
              }
              swal('Perfecto!', 'Se generó el asiento contable con exito.' + newkeyStr, 'success')
              this.inprogress = false
              // bandera para que no salga el botón de volver a generar comprobante porque el cache del estado del proceso no se actualiza rapido
              this.bandera = 'NO'
            })
            .catch(error => {
              if (error.response.status === 401) {
                this.is_error = true
                this.loadingText = 'Usuario sin permisos suficientes'
                swal('Ups!', 'Su usuario no cuenta con los permisos necesatios para conabilizar ente comprobante contable.', 'error')
              } else {
                this.value = '100'
                this.rowsUploaded = this.rowCount
                this.loadingText = '[' + this.rowsUploaded + '/' + this.rowCount + '] Registros Completados'
                window.clearTimeout(this.timer)
                this.is_error = true
                this.loadingText = 'Ocurrio un error en la conexion con SAP B1.. Por favor reportar este problema'
                swal('Ups!', 'Inconsistencia con cuentas en SAP B1. Por favor reporte este error.', 'error')
              }
            })
        } else {
          swal('Ups!', 'Por favor selecciona una fecha valida .', 'error')
        }
      },
      process () {
        axios.get('/payroll/distribute/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
          })
          .catch(error => console.log(error))
      },
      loadTotales () {
        axios.get('/payroll/sumtotalesplanilla/' + this.$store.state.dist.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.tableData = response.data
          })
          .catch(error => console.log(error))
      },
      cancel () {
        axios.delete('/payroll/process/' + this.$store.state.dist.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
          })
          .catch(error => console.log(error))
      },
      getRows () {
        axios.get('/payroll/processRows/' + this.$store.state.dist.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.rowCount = response.data.rowCount
            this.estimatedTime = (0.0328 * this.rowCount * this.rowCount) + (102.42 + this.rowCount) - 1605.5
            console.log(this.rowCount + '-' + this.estimatedTime)
          })
          .catch(error => console.log(error))
      },
      initloader () {
        let uptaderate = 1000
        let i = 0
        this.timer = window.setInterval(() => {
          let cal = ((this.rowsUploaded / this.rowCount) * 100).toFixed(2)
          this.value = cal >= 100 ? '100' : cal
          let cal2 = ((-102.42 + (Math.sqrt(102.42 * 102.42 + 4 * 0.0328 * (1605.5 + i)))) / (2 * 0.0328)).toFixed(0)
          this.rowsUploaded = cal2 >= this.rowCount ? this.rowCount : cal2
          // console.log(i + ': ' + this.rowsUploaded + '-' + (this.value / 100) * this.rowCount)
          this.loadingText = '[' + this.rowsUploaded + '/' + this.rowCount + '] Registros Completados'
          i += uptaderate
        }, uptaderate)
      }
    }
  }

</script>
<style scoped>
  .row{
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;
  }
</style>
