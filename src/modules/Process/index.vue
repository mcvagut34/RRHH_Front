<template>
  <div class="row">
    <div class="card" v-if="Seefile==='NO'">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Comparativo mes anterior" placement="top-start">
            <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="Comparativo(props.queriedData[props.index].Id)"><i class="fas fa-file-excel"></i></a>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
          <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
        </el-tooltip>
          <!--
          <el-tooltip class="item" effect="dark" content="Descargar archivos" placement="top-start">
            <a class="btn btn-simple btn-xs btn-info btn-icon"  @click="SeeProcess(props.queriedData[props.index].Id)"><i class="fas fa-file"></i></a>
          </el-tooltip>-->
        </template>
      </data-tables>
    </div>
    <!--
    <template v-if="Seefile==='SI'">
      <div class="card" align="center">
        <h3>ARCHIVOS SALOMON</h3>
        <div v-for="p in process" :key="p.Id">
        <TABLE>
          <tr>
            <td width="150px"><h5>Sede: </h5></td>
            <td width="150px" >{{p.Branches}}</td>
            <td width="150px"><h5>#Proceso: </h5></td>
            <td width="150px">{{p.Id}}</td>
          </tr>
          <tr>
          <td width="150px"><h5>Mes: </h5></td>
          <td width="150px">{{p.mes}}</td>
            <td width="150px"><h5>Gestión: </h5></td>
            <td width="150px">{{p.gestion}}</td>
          </tr>
        </TABLE>
        <table margin="1">
          <tr>
            <td>TIPO ARCHIVO</td>
            <td>Acciones</td>
          </tr>
          <tr  v-for="f in files">
            <td>{{f.FileType}}</td>
            <td><button class="btn btn-wd btn-fill btn-success">{{f.Name}}</button></td>
          </tr>
        </table>
        </div>
      </div>
    </template>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import axios from 'axios'
  import swal from 'sweetalert2'

  Vue.use(Tooltip)
  export default {
    data () {
      return {
        url: '/payroll/process/',
        propsToSearch: ['Name', 'gestion', 'mes', 'State'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Segmento  ',
            minWidth: 100
          },
          {
            prop: 'gestion',
            label: 'Gestion',
            minWidth: 100
          },
          {
            prop: 'mes',
            label: 'Mes',
            minWidth: 50
          },
          {
            prop: 'State',
            label: 'Estado',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        files: [],
        Seefile: 'NO',
        process: []
      }
    },
    methods: {
      Comparativo (index) {
        console.log('/payroll/compareLastMonth/' + index)
        axios.get('/payroll/compareLastMonth/' + index,
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
      SeeFiles (id) {
        this.Seefile = 'SI'
        console.log('DistProcess/Files/' + id)
        axios.get('DistProcess/Files/' + id)
          .then(response => {
            this.files = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      SeeProcess (id) {
        this.SeeFiles(id)
        console.log('DistProcess/' + id)
        axios.get('DistProcess/' + id)
          .then(response => {
            this.process = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>
<style>
</style>

