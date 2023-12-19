<template>
  <button class="btn btn-info btn-fill" @click="loadCareerBody">Buscar</button>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import swal from 'sweetalert2'
  export default {
    props: {
      url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        // agregar imagen y todas las variables de la tabla
        selectBranches: [],
        // datos de la tabla
        headers: ['CÓDIGO SOCIO', 'NOMBRE SOCIO', 'COD DEPENDENCIA', 'COD UO', 'PEI/PO', 'NOMBRE DEL SERVICIO', 'CÓDIGO CARRERA', 'DOCUMENTO BASE', 'POSTULANTE', 'TIPO TAREA ASIGNADA', 'CUENTA ASIGNADA', 'MONTO CONTRADO', 'MONTO IUE', 'MONTO IT', 'MONTO A PAGAR', 'OBSERVACIONES', 'DUP'],
        body: [],
        data: []
      }
    },
    methods: {
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
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
      generatePDF () {
        // Para que sea largo
        this.date_function()
        const doc = new jsPDF('landscape')
        // Armando la cabecera para el reporte
        var img = new Image()
        img.src = './../static/img/logo_ucb3.png'
        doc.addImage(img, 'png', 14, 10, 20, 29)
        doc.setFontSize(8)
        doc.text('Fecha:' + this.formattedDate, 280, 10, null, null, 'right')
        doc.text('Fuente: ISAAC', 280, 15, null, null, 'right')
        doc.setFontStyle('bold')
        doc.setFontSize(18)
        doc.text('Universidad Católica Boliviana "San Pablo" ', 145, 25, null, null, 'center')
        // El nombre de la ruta actual
        doc.setFontSize(18)
        doc.text('Información Sobre Actividades Académicas', 145, 35, null, null, 'center')
        // doc.text('Total Detalle', 145, 45, null, null, 'center')
        // Para controlar donde comienza el reporte en el eje Y
        let y = 45
        // El cuerpo del header y de la tabla
        var body = this.getPDFBody()
        var header = Object.keys(this.body[0])
        // el primer elemento es el Id, por eso se remueve
        // header.splice(0, 1)
        // controla el tamaño de la fuente basado en el numero de columnas
        var fontSize = 7
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
        doc.save('export.pdf')
      },
      loadCareerBody () {
        this.fakeLoad()
        // Cargar el cuerpo, es decir datos por carrera
        console.log('/BusquedaAvanzadaIsaac/' + this.url)
        axios.get('/BusquedaAvanzadaIsaac/' + this.url)
          .then(response => {
            this.body = response.data
            this.aux = response.data
            this.generatePDF()
          })
          .catch(error => {
            console.log(error)
            this.errorMessage(error.response.data.Message)
          })
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
        /*
        for (let i = 0; i < pdf.length; i++) {
          // remueve primer elemento del subArray
          pdf[i].splice(0, 1)
        } */
        return pdf
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
          text: text,
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
      this.sayMyName()
      this.date_function()
    }
  }
</script>

<style scoped>
</style>
