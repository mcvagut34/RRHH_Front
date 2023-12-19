<template>
  <div class="row">
    <div class="col-md-12" >
      <div v-if="this.$store.state.civ.uploadedFiles.state==='INICIADO' || this.$store.state.civ.uploadedFiles.state==='ESPERANDO APROBACION'">
        <div class="sa-success" style="margin: 0 auto">
          <div class="sa-success-tip"></div>
          <div class="sa-success-long"></div>
          <div class="sa-success-placeholder"></div>
          <div class="sa-success-fix"></div>
        </div>
        <br/>
        <br/>
        <div style="text-align:center">
          <div class="row">
            <div class="form-group col-md-3 col-md-offset-3"><button  type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="comprobante">
            <span class="btn-label">
                <i class="fa fa-file-excel" ></i>
                   Descargar Detalle
            </span>
            </button></div>
            <div class="form-group col-md-3">
              <reporte :id="this.$store.state.civ.uploadedFiles.id"></reporte></div>
          </div>
          <button v-if="!inprogress" type="submit" class="btn btn-wd btn-fill btn-danger" style="margin: 5px auto" @click="cancel">
              <span v-if="this.$store.state.civ.uploadedFiles.state==='ESPERANDO APROBACION'" class="btn-label">
                  <i class="fa fa-exclamation-triangle" ></i>
                     RECHAZAR
              </span>
              <span v-if="this.$store.state.civ.uploadedFiles.state==='INICIADO'" class="btn-label">
                  <i class="fa fa-exclamation-triangle" ></i>
                     ANULAR
              </span>
          </button>
          <br>
          <input type="checkbox" id="checkbox" v-model="checked" >
            <span style="font-size: 120%; font-weight: bold">
              He verificado y confirmo la información registrada
            </span>
          <br><br>
          <template v-if="checked">
            <template v-if="!ToAprove">
              <button type="button" class="btn btn-wd btn-fill btn-success" style="margin: 0 auto" @click="SendToApprove">
                <span class="btn-label">
                  <i class="fa fa-file-excel" ></i>
                     Enviar a Aprobación
                </span>
              </button>
            </template>

            <template v-else>
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
                                :use-utc="true"
                                :required=true
                                style="margin-left: auto;margin-right: auto">
                    </datepicker></div>

                </div>
              </div>
              <button v-if="!inprogress" type="submit" class="btn btn-wd btn-fill btn-success" style="margin: 0 auto" @click="SAPVoucher">
              <span class="btn-label">
                  <i class="fa fa-file-excel" ></i>
                     Contabilizar en SAP
              </span>
              </button>
              <progressbar v-if="inprogress" :currentValue="value" :addtext="loadingText" :is_error="is_error">
              </progressbar>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import progressbar from 'src/components/UIComponents/ProgrssBar'
  import swal from 'sweetalert2'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import router from 'src/router/index'
  import Reporte from '../Report'
  import 'jspdf-autotable'

  export default {
    props: {
      ToAprove: {
        type: Boolean,
        default: false
      }
    },
    components: {
      progressbar,
      swal,
      Datepicker,
      Reporte
    },
    data () {
      return {
        es: es,
        format: 'dd-MMM-yyyy',
        formattedDate: '',
        date: null,
        is_error: false,
        timer: null,
        value: '0',
        estimatedTime: 0,
        loadingText: '',
        inprogress: false,
        rowCount: 0,
        rowsUploaded: 0,
        tableData: [],
        body: [],
        recordsD: '',
        checked: false,
        url: '/ServContract/GetDetail/' + this.$store.state.civ.uploadedFiles.id
      }
    },
    methods: {
      comprobante () {
        console.log('/ServContract/getdistribution/' + this.$store.state.civ.uploadedFiles.id)
        axios.get('/ServContract/getdistribution/' + this.$store.state.civ.uploadedFiles.id,
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
      // Metodo para generar el reporte
      dataResult () {
        let result = this.body
          .filter((row) => {
            let isIncluded = true
            let all = ''
            for (let key of this.propsToSearch) {
              let rowValue = (row[key] == null ? '' : row[key]).toString()
              rowValue = rowValue.toUpperCase().replace(' ', '')
              all += rowValue
            }
            let separateStr = this.searchQuery.toUpperCase().split(' ')
            separateStr.forEach(function (word) {
              if (all.includes && !all.includes(word)) {
                isIncluded = false
              }
            })
            return isIncluded
          })
        return result
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
      SAPVoucher () {
        if (this.date !== null) {
          this.inprogress = true
          this.getRows()
          this.initloader()
          console.log(this.$store.state.civ.uploadedFiles.id + 'es el serv que se manda')
          console.log('esta es la fecha' + this.date)
          axios.post('/ServContractToSAP/' + this.$store.state.civ.uploadedFiles.id,
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
             console.log(response.data + 'respuesta original')
             console.log(resp + 'respuesta con formato')
             console.log(JSON.stringify(response.headers) + 'Son los headers de respuesta')
             console.log(localStorage.getItem('token') + 'los tokens mandaados en el header')
             console.log(this.date + 'es la fecha enviada')
             let newkeyStr = ''
             try {
               newkeyStr = '\nEl número de comprobante contable en SAP es: ' + resp
             } catch (e) {
               newkeyStr = ''
             }
             swal('Perfecto!', 'Se generó el asiento contable con exito.' + newkeyStr, 'success').then(c => {
               router.go(0)
               router.push('/proceso')
             }).catch()
             this.inprogress = false
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
      SendToApprove () {
        axios.get('/ServContractToApproval/' + this.$store.state.civ.uploadedFiles.id)
        .then(response => {
          this.$store.dispatch('civ/uploadedFiles')
          this.redirect('Se envió a aprobación')
        })
        .catch(error => console.log(error))
      },
      cancel () {
        axios.delete('/ServContract/' + this.$store.state.civ.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.$store.dispatch('civ/uploadedFiles')
            this.redirect('Se anuló la operación.')
          })
          .catch(error => console.log(error))
      },
      getRows () {
        axios.get('/ServContractprocessRows/' + this.$store.state.civ.uploadedFiles.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.rowCount = response.data.rowCount
            this.estimatedTime = (0.0328 * this.rowCount * this.rowCount) + (102.42 + this.rowCount) - 1605.5
            console.log(this.rowCount + ' es el row Count' + '- ' + this.estimatedTime)
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
      },
      redirect (text) {
        if (this.$store.state.civ.uploadedFiles.state === 'ESPERANDO APROBACION') {
          swal('Perfecto!', 'Se rechazó la operación.', 'success').then(r => {
            router.go(0)
            router.push('/proceso')
          })
        }
        if (this.$store.state.civ.uploadedFiles.state === 'INICIADO') {
          swal('Perfecto!', text, 'success').then(r => {
            router.go(0)
            router.push('/ContratosCiviles')
          })
        }
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
