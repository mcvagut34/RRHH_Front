<template>
  <div>
    <div class="card-header">
    </div>
    <div class="card-content row">
      <div class="col-sm-4">
        <el-select
          class="select-default"
          v-model="pagination.perPage"
          placeholder="Per page">
          <el-option
            class="select-default"
            v-for="item in pagination.perPageOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="col-sm-8">
        <div class="pull-right">
          <div class="row">
            <div class="col-sm-2">
              <label style="vertical-align: middle;">
                Buscar
              </label>
            </div>
            <div class="col-sm-6">
              <input type="search" class="form-control input-sm" placeholder="Criterio de busqueda" v-model="searchQuery" aria-controls="datatables">
            </div>
            <!--<div class="col-sm-2" v-if="tipoExcel==='esp'">

              <el-tooltip
                content="Exportar en formato Excel"
                placement="top-start">
                <!--<vue-excel-xlsx
                  :data="items"
                  :columns="tableColumns"
                  :filename="'Export'"
                  :sheetname="'Hoja1'"
                  class="bott"
                ><a class="btn btn-icon btn-success pull-right btn-fill">
                  <i class="fa fa-file-excel fa-lg" style=""></i>
                </a>
                </vue-excel-xlsx>-->
                <!--<download-excel :data="items" type="xlsx">
                  <a class="btn btn-icon btn-success pull-right btn-fill">
                    <i class="fa fa-file-excel fa-lg" style=""></i>
                  </a>
                </download-excel>
              </el-tooltip>
            </div>
            <div class="col-sm-2" v-else>-->
            <div class="col-sm-2">
              <el-tooltip class="item" effect="dark" content="Exportar en formato Excel" placement="top-start">
                <a class="btn btn-icon btn-success pull-right btn-fill" @click="exportExcel()">
                  <i class="fa fa-file-excel fa-lg" style=""></i>
                </a>
              </el-tooltip>
            </div>
            <div class="col-sm-2">
              <el-tooltip class="item" effect="dark" content="Exportar en formato PDF" placement="top-start">
                <a class="btn btn-icon btn-danger pull-right btn-fill" @click="exportPDF()">
                  <i class="fa fa-file-pdf fa-lg" style=""></i>
                </a>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12">
      <el-table class="table-striped"
                :data="queriedData"
                border
                style="width: 100%">
        <el-table-column v-for="column in tableColumns"
                         :key="column.label"
                         :min-width="column.minWidth"
                         :formatter="cellValueRenderer"
                         :prop="column.prop"
                         :label="column.label">
        </el-table-column>
        <el-table-column v-if="actions"
                         :min-width="40"
                         fixed="right"
                         label="">
          <template slot-scope="props">
            <slot name="buttons" :queriedData="queriedData" :index="props.$index" :handleEdit="handleEdit" :handleDelete="handleDelete">
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="col-sm-6 pagination-info">
      <p class="category">Mostrando {{from + 1}} a {{to}} de {{pagination.total}} registros</p>
    </div>
    <div class="col-sm-6">
      <p-pagination class="pull-right"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="total">
      </p-pagination>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import { mapState } from 'vuex'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import axios from 'axios'
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      ...mapState({
        tableData: state => state.crud.data
      }),
      dataResult () {
        let result = this.tableData
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
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.tableData.length
          return this.pagedData
        }
        let result = this.dataResult
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.tableData.length
        return this.dataResult.length
      }
    },
    props: {
      pagination: {
        type: Object,
        default: function () {
          return {
            perPage: 5,
            currentPage: 1,
            perPageOptions: [5, 10, 25, 50],
            total: 0
          }
        }
      },
      actions: {
        type: Boolean,
        default: true
      },
      url: {
        type: String,
        required: true
      },
      propsToSearch: {
        type: Array,
        required: true
      },
      tableColumns: {
        type: Array,
        required: true
      },
      searchQueryProp: {
        type: String,
        default: ''
      },
      tipoExcel: {
        type: String,
        default: ''
      },
      tituloPDF: {
        type: String,
        default: ''
      },
      fuentePDF: {
        type: String,
        default: 'BASE DE DATOS NACIONAL PERSONAS'
      },
      sizeTitulo: {
        type: Number,
        default: 12
      }
    },
    data () {
      return {
        searchQuery: '',
        formattedData: '',
        items: [],
        tipo: ''
      }
    },
    methods: {
      hacer_excel () {
        axios.get(this.url)
          .then(response => {
            this.items = response.data
          })
          .catch()
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      },
      getPDFBody () {
        // este metodo convierte un array de objetos en un array de arrays, necesario para el reporte PDF
        var pdf = []
        var data = this.dataResult
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
      exportPDF () {
        const doc = new jsPDF('landscape')
        // Armando la cabecera para el reporte
        var img = new Image()
        img.src = './../static/img/logo_ucb3.png'
        doc.addImage(img, 'png', 14, 10, 20, 29)
        doc.setFontSize(8)
        doc.text('Fecha:' + this.formattedDate, 280, 10, null, null, 'right')
        doc.text('Fuente: ' + this.fuentePDF, 280, 15, null, null, 'right')
        doc.setFontStyle('bold')
        doc.setFontSize(18)
        doc.text('Universidad Católica Boliviana "San Pablo" ', 145, 25, null, null, 'center')
        // El nombre de la ruta actual
        doc.setFontSize(this.sizeTitulo)
        doc.text(this.tituloPDF, 145, 35, null, null, 'center')
        // Para controlar donde comienza el reporte en el eje Y
        let y = 54
        // El cuerpo del header y de la tabla
        var body = this.getPDFBody()
        var header = Object.keys(this.queriedData[0])
        // el primer elemento es el Id, por eso se remueve
        header.splice(0, 1)
        // controla el tamaño de la fuente basado en el numero de columnas
        var fontSize = 10
        if (header.length >= 10) {
          fontSize = 8
        }
        if (header.length >= 12) {
          fontSize = 6
        }
        if (header.length >= 14) {
          fontSize = 4.5
        }
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
        doc.save('export.pdf')
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
      exportExcel () {
        this.downloadCSV()
      },
      convertArrayOfObjectsToCSV (args) {
        let result, ctr, keys, columnDelimiter, lineDelimiter, data
        data = args.data || null
        if (data == null || !data.length) {
          return null
        }
        columnDelimiter = args.columnDelimiter || ';'
        lineDelimiter = args.lineDelimiter || '\n'
        keys = Object.keys(data[0])
        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter
        data.forEach(function (item) {
          ctr = 0
          keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter
            result += item[key]
            ctr++
          })
          result += lineDelimiter
        })
        return result
      },
      downloadCSV () {
        let data, filename, link
        let csv = this.convertArrayOfObjectsToCSV({
          data: this.dataResult
        })
        if (csv == null) return
        filename = 'export.csv'
        if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv
        }
        data = encodeURI(csv)
        link = document.createElement('a')
        link.setAttribute('href', data)
        link.setAttribute('download', filename)
        link.click()
      },
      handleEdit (index) {
        const formData = {
          url: this.url,
          id: index
        }
        this.$store.commit('crud/editSetter', true)
        this.$store.dispatch('crud/find', formData)
      },
      handleDelete (index) {
        const formData = {
          url: this.url,
          id: index
        }
        this.$store.dispatch('crud/remove', formData)
      },
      cellValueRenderer (row, column, cellValue) {
        const isBool = typeof row[column.property] === 'boolean'
        return !isBool ? cellValue : String(cellValue)
      }
    },
    mounted () {
      this.$store.dispatch('crud/loadData', this.url)
      this.$store.commit('crud/formDataCleaner')
      this.$store.commit('crud/editSetter', false)
      this.searchQuery = this.searchQueryProp
      this.date_function()
      this.hacer_excel()
    }
  }
</script>
<style>
  .bott{
    border: none;
  }
</style>
