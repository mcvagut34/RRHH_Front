<template>
  <div class="row">
    <div class="col-md-12">
      <data-tables  v-if="showTable" v-bind="{url, propsToSearch,tableColumns: tableColumns, actions, fuentePDF: 'SARAI'}">
      </data-tables>

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
        showTable: false,
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
        rowsUploaded: 0,
        checked: false,
        propsToSearch: [ 'CardName', 'DependencyCod', 'PEI', 'ServiceName' ],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 10
          },
          {
            prop: 'CardName',
            label: 'Nombre Socio',
            minWidth: 150
          },
          {
            prop: 'OU',
            label: 'U.O.',
            minWidth: 40
          },
          {
            prop: 'PEI',
            label: 'PEI',
            minWidth: 40
          },
          {
            prop: 'Credit',
            label: 'Monto Bruto',
            minWidth: 70
          },
          {
            prop: 'Debit',
            label: 'Monto a Pagar',
            minWidth: 70
          },
          {
            prop: 'LineMemo',
            label: 'Detalle',
            minWidth: 120
          },
          {
            prop: 'Memo',
            label: 'Nombre Servicio',
            minWidth: 120
          },
          {
            prop: 'AssignedAccount',
            label: 'Cuenta asignada',
            minWidth: 70
          }
        ],
        actions: false,
        tableData: []
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
      SAPVoucher () {
        if (this.date !== null) {
          this.inprogress = true
          this.getRows()
          this.initloader()
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
    },
    computed: {
      FileId: {
        get () {
          return this.$store.state.civ.uploadedFiles.id
        }
      },
      url: {
        get () {
          return '/ServContract/GetDetail/' + this.$store.state.civ.uploadedFiles.id
        }
      }
    },
    watch: {
      FileId (newValue, oldValue) {
        this.showTable = false
        this.$nextTick(() => {
          this.showTable = true
        })
      }
    },
    created () {
      if (typeof this.FileId === 'number') {
        this.showTable = true
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
