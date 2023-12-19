<template>
  <button class="px-0 m-0 btn btn-info" @click="control">Generar PDF</button>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  export default {
    props: {
      origin: {
        default: ''
      },
      state: {
        default: 'PRE-APROBADO'
      },
      proyecto: {
        default: ''
      }
    },
    data () {
      return {
        // agregar imagen y todas las variables de la tabla
        selectBranches: [],
        // datos de la tabla
        headers: ['Docente', 'Tarea', 'Modulo', 'Horas', 'Costo Hora', 'Total Bruto', 'Deduccion', 'Total Neto', 'Observaciones', 'Dup'],
        careers: [],
        records: [],
        careerResult: [],
        finalResult: []
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
        let doc = new jsPDF('landscape')
        var img = new Image()
        img.src = './../static/img/logo_ucb3.png'
        doc.addImage(img, 'PNG', 14, 10, 20, 29)
        doc.setFontSize(8)
        doc.text('Fecha:' + this.formattedDate, 280, 10, null, null, 'right')
        doc.text('Fuente: ISAAC II', 280, 15, null, null, 'right')
        doc.setFontSize(18)
        doc.setFontStyle('bold')
        doc.text('Universidad Católica Boliviana "San Pablo" ', 85, 25)
        doc.setFontSize(15)
        doc.text('Actividades Académicas en Postgrado ' + this.proyecto, 85, 32)
        // Para controlar donde comienza el reporte en el eje Y
        let y = 54
        // Para no volver a pasar por un mismo índice de los registros de tutorías
        let index = 0
        // Iteración basada en el número de carreras --> número de tablas a generar
        for (let i = 0; i < this.careers.length; i++) {
          // Nombre de la carrera para filtro
          let careerName = this.careers[i]
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
            return tutoria.Proyecto === careerName
          }).length
          console.log('El número de filas para la carrera: ' + careerName + ' es:' + tableLength)
          // Cuerpo de la tabla
          let files = this.records
          let tableBody = []
          for (var tableIndex = index; tableIndex < index + tableLength; tableIndex++) {
            // Crear un array de arrays con los elementos que correspondan
            tableBody.push([files[tableIndex].Docente, files[tableIndex].Tarea, files[tableIndex].Modulo, files[tableIndex].Horas, files[tableIndex].Costo_Hora, files[tableIndex].Total_Bruto, files[tableIndex].Deduccion, files[tableIndex].IUE, files[tableIndex].IT, files[tableIndex].Total_Neto, files[tableIndex].Observaciones, files[tableIndex].Dup])
          }
          // console.log('this is the body with results: ')
          // console.log(tableBody)
          // Para no recorrer el array desde su primera posicion
          index = index + tableLength
          // cargamos la tabla con el cuerpo para la carrera actual
          doc.autoTable({
            startY: doc.previousAutoTable.finalY,
            head: [['Docente', 'Tarea', 'Modulo', 'Horas', 'Costo Hora', 'Total Bruto', 'Deduccion', 'IUE', 'IT', 'Total Neto', 'Observaciones', 'Dup']],
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
              0: {cellWidth: 60},
              1: {cellWidth: 10},
              2: {cellWidth: 54},
              3: {cellWidth: 10},
              4: {cellWidth: 10},
              5: {cellWidth: 14},
              6: {cellWidth: 12},
              7: {cellWidth: 12},
              8: {cellWidth: 12},
              9: {cellWidth: 14.5},
              10: {cellWidth: 50},
              11: {cellWidth: 10}
            }
          })
          // -------------------------------------Tabla con totales por carrera-----------------------------------------
          let careerResults = this.careerResult.filter(function (result) {
            return result.Proyecto === careerName
          })
          let resultBody = []
          resultBody.push([careerResults[0].Total_Bruto, careerResults[0].Deduccion, careerResults[0].IUE, careerResults[0].IT, careerResults[0].Total_Neto])
          doc.autoTable({
            startY: doc.previousAutoTable.finalY,
            // para que aparezca debajo de los montos
            margin: {left: 158.2},
            theme: 'grid',
            body: resultBody,
            columnStyles: {0: {cellWidth: 14}, 1: {cellWidth: 12}, 2: {cellWidth: 12}, 3: {cellWidth: 12}, 4: {cellWidth: 14.5}},
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
          margin: {left: 158.2},
          columnStyles: {0: {cellWidth: 14}, 1: {cellWidth: 12}, 2: {cellWidth: 12}, 3: {cellWidth: 12}, 4: {cellWidth: 14.5}},
          styles: {cellPadding: 0.5, fontSize: 8, fillColor: [222, 222, 222], fontStyle: 'bold'}
        })
        doc.setFontSize(8)
        doc.setFontStyle('normal')
        doc.text('Reporte generado por: ' + this.username, 14, y + (205 - y) - 10)
        doc.save('ReporteAgrupado' + this.proyecto + '.pdf')
        return doc
      },
      loadCareerBody () {
        // Cargar el cuerpo, es decir datos por carrera
        let rec = this.records
        console.log('PDFReportBodyXProyecto?part=Body;' + this.state + ';' + this.origin + ';' + this.proyecto)
        axios.get('PDFReportBodyXProyecto?part=Body;' + this.state + ';' + this.origin + ';' + this.proyecto)
          .then(response => {
            response.data.forEach(function (tutoria) {
              rec.push(tutoria)
            })
          })
          .catch(error => console.log(error))
      },
      loadCareerTotals () {
        // Cargar el agrupado por carrera, montos Totales
        // Cargamos los nombres de las carreras
        let uniqueCareers = this.careers
        let currentResults = this.careerResult
        axios.get('PDFReportBodyXProyecto?part=Results;' + this.state + ';' + this.origin + ';' + this.proyecto)
          .then(response => {
            response.data.forEach(function (element) {
              uniqueCareers.push(element.Proyecto)
              currentResults.push(element)
            })
          })
          .catch(error => console.log(error))
      },
      loadAllTotals () {
        // Cargar el total de todas las regionales que ve el usuario
        let final = this.finalResult
        axios.get('PDFReportBodyXProyecto?part=FinalResult;' + this.state + ';' + this.origin + ';' + this.proyecto)
          .then(response => {
            response.data.forEach(function (element) {
              final.push([element.Total_Bruto, element.Deduccion, element.IUE, element.IT, element.Total_Neto])
            })
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
      control () {
        this.generatePDF()
        location.reload()
      }
    },
    created () {
      this.loadCareerBody()
      this.loadCareerTotals()
      this.loadAllTotals()
      this.loadBranchData()
      this.sayMyName()
      this.date_function()
    }
  }
</script>

<style scoped>
</style>
