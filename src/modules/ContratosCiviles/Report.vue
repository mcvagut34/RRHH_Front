<template>
  <button class="btn btn-wd btn-fill btn-info" @click="generatePDF">
    <span class="btn-label">
                    <i class="fa fa-file-pdf" ></i>
                       Generar PDF
                </span>
    </button>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        // agregar imagen y todas las variables de la tabla
        selectBranches: [],
        // datos de la tabla
        headers: ['CÓDIGO SOCIO', 'NOMBRE SOCIO', 'COD DEPENDENCIA', 'COD UO', 'PEI/PO', 'NOMBRE DEL SERVICIO', 'CÓDIGO CARRERA', 'DOCUMENTO BASE', 'POSTULANTE', 'TIPO TAREA ASIGNADA', 'CUENTA ASIGNADA', 'MONTO CONTRADO', 'MONTO IUE', 'MONTO IT', 'MONTO A PAGAR', 'OBSERVACIONES'],
        body: [],
        ID: '',
        REGIONAL: '',
        SERVICIO: '',
        ESTADO: ''
      }
    },
    methods: {
      date_function () {
        this.formattedDate = this.convert()
      },
      convert () {
        let date = new Date()
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [day, mnth, date.getFullYear()].join('-')
      },
      generatePDF () {
        // Para que sea largo
        console.log('Cuarpo' + this.body)
        this.date_function()
        const doc = new jsPDF('landscape')
        // Armando la cabecera para el reporte
        var img = new Image()
        img.src = './../static/img/logo_ucb3.png'
        doc.addImage(img, 'png', 14, 10, 20, 29)
        doc.setFontSize(8)
        doc.text('Fecha:' + this.formattedDate, 280, 10, null, null, 'right')
        doc.text('Fuente: SARAI', 280, 15, null, null, 'right')
        doc.setFontStyle('bold')
        doc.setFontSize(18)
        doc.text('Universidad Católica Boliviana "San Pablo" ', 145, 20, null, null, 'center')
        // El nombre de la ruta actual
        doc.setFontSize(18)
        doc.text('Sistema de Renumeraciones Académicas a Independientes', 145, 30, null, null, 'center')
        doc.setFontSize(15)
        doc.text('Total Detalle', 145, 40, null, null, 'center')
        doc.setFontSize(12)
        doc.text(this.REGIONAL + ' - ' + this.SERVICIO + ' - ' + this.ID + ' - ' + this.ESTADO, 145, 46, null, null, 'center')
        // Para controlar donde comienza el reporte en el eje Y
        let y = 54
        // El cuerpo del header y de la tabla
        var body = this.getPDFBody()
        var header = Object.keys(this.body[0])
        // el primer elemento es el Id, por eso se remueve
        header.splice(0, 1)
        // controla el tamaño de la fuente basado en el numero de columnas
        var fontSize = 7.5
        /*
        if (header.length >= 10) {
          fontSize = 15
        }
        if (header.length >= 12) {
          fontSize = 6
        }
        if (header.length >= 14) {
          fontSize = 4.5
        }
        */
        doc.autoTable({
          startY: y,
          head: [header],
          body: body,
          theme: 'grid',
          // tableWidth: 'wrap',
          styles: { fontSize: fontSize },
          headStyles: {
            fillColor: [4, 134, 230],
            fontSize: fontSize
          },
          columnStyles: { text: { cellWidth: 'auto' } }
        })
        doc.setFontSize(8)
        doc.setFontStyle('normal')
        doc.text('Reporte generado por: ' + this.username, 14, y + (205 - y) - 10)
        doc.save('TotalDetalle.pdf')
      },
      loadCareerBody () {
        // Cargar el cuerpo, es decir datos por carrera
        axios.get('/ServContract/getdistributionPDF/' + this.id)
          .then(response => {
            this.body = response.data
          })
          .catch(error => console.log(error))
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
      sayMyName () {
        axios.get('auth/UserData')
          .then(response => {
            this.username = response.data
            console.log(this.username + ' is the user who does the report')
          })
          .catch(error => console.log(error))
      },
      getPDFBody () {
        // este metodo convierte un array de objetos en un array de arrays, necesario para el reporte PDF
        var pdf = []
        var data = this.body

        for (let i = 0; i < data.length; i++) {
          pdf.push(Object.values(data[i]))
        }
        // recorrer el array de arrays y eliminar el primer elemento de cada array interno, es el Id y viene por defecto
        for (let i = 0; i < pdf.length; i++) {
          // remueve primer elemento del subArray
          pdf[i].splice(0, 1)
        }
        return pdf
      },
      infoProcess () {
        axios.get('ServContract/' + this.id)
          .then(response => {
            console.log(response.data.State)
            this.ESTADO = response.data.State
            console.log(response.data.Id)
            this.ID = response.data.Id
            console.log(response.data.FileType)
            this.SERVICIO = response.data.FileType
            console.log(response.data.BranchesId)
            if (response.data.BranchesId === 3) {
              this.REGIONAL = 'CBB'
            }
            if (response.data.BranchesId === 22) {
              this.REGIONAL = 'TEO'
            }
            if (response.data.BranchesId === 2) {
              this.REGIONAL = 'TJA'
            }
            if (response.data.BranchesId === 17) {
              this.REGIONAL = 'LPZ'
            }
            if (response.data.BranchesId === 18) {
              this.REGIONAL = 'EPC'
            }
            if (response.data.BranchesId === 16) {
              this.REGIONAL = 'SCZ'
            }
            if (response.data.BranchesId === 6) {
              this.REGIONAL = 'UCE'
            }
          })
          .catch()
      }
    },
    created () {
      this.infoProcess()
      this.loadCareerBody()
      this.loadBranchData()
      this.sayMyName()
      this.date_function()
    }
  }
</script>

<style scoped>
</style>
