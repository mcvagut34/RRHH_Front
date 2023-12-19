<template>
  <div class="row">
    <div class="card" v-if="Seefile==='NO'">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions: false}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Comparativo mes anterior" placement="top-start">
            <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="Comparativo(props.queriedData[props.index].Id)"><i class="fas fa-file-excel"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
          <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
        </el-tooltip>
        </template>
      </data-tables>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'

  Vue.use(Tooltip)
  export default {
    data () {
      return {
        url: '/GetInterregional/',
        propsToSearch: ['FullName', 'User', 'mes', 'gestion', 'State'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Destino',
            label: 'SegmentoDestino',
            minWidth: 50
          },
          {
            prop: 'Origen',
            label: 'SegmentoOrigen',
            minWidth: 50
          },
          {
            prop: 'mes',
            label: 'Mes',
            minWidth: 50
          },
          {
            prop: 'gestion',
            label: 'Gestion',
            minWidth: 50
          },
          {
            prop: 'State',
            label: 'Estado',
            minWidth: 50
          },
          {
            prop: 'TransNumber',
            label: '#Trans',
            minWidth: 50
          },
          {
            prop: 'UploadedDate',
            label: 'Fecha',
            minWidth: 70
          },
          {
            prop: 'User',
            label: 'Usuario',
            minWidth: 80
          },
          {
            prop: 'FullName',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'TransId',
            label: '#Comprobante SAP',
            minWidth: 50
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
    }
  }
</script>
<style>
</style>

