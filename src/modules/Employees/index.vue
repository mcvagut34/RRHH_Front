<template>
  <div class="row">
    <div class="col-md-12 card" v-if="actions==='LIST'">

      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <template v-if="actions==='MODIFY'">
      <div class=" col-md-12 card">
        <br>
        <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Back">
            <span class="btn-label">
              <i class="fa fa-angle-double-left"></i>
            </span>
          Volver
        </button>
        <br>
        <br>
        <br>
        <DetailEmpleado :index="i" action="SEARCH"></DetailEmpleado>
      </div>
    </template>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'
  import DetailEmpleado from '../Employees/DetailEmpleado'

  export default {
    components: {
      Datepicker,
      DetailEmpleado
    },
    data () {
      return {
        i: null,
        actions: 'LIST',
        en: en,
        es: es,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/people',
        propsToSearch: ['Id', 'CUNI', 'Document', 'FullName', 'Status'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 25,
            field: 'Id'
          },
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 50,
            field: 'CUNI'
          },
          {
            prop: 'Document',
            field: 'Document',
            label: 'Documento',
            minWidth: 50
          },
          {
            prop: 'FullName',
            field: 'FullName',
            label: 'Nombre Completo',
            minWidth: 80
          },
          {
            prop: 'Status',
            field: 'Status',
            label: 'Estado',
            minWidth: 80
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 20, 50],
          total: 0
        },
        create: false
      }
    },
    methods: {
      Modify (index) {
        console.log(index)
        this.i = index
        this.actions = 'MODIFY'
      },
      Back () {
        this.actions = 'LIST'
      }
    },
    created () {
    }
  }
</script>
<style>
  .btn-group{
    margin: 20px;
  }
</style>
