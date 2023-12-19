<template>
  <div class="row">
    <div class="col-md-12 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="see(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
  </div>
</template>
<script>
  import router from 'src/router/index'

  export default {
    data () {
      return {
        url: '/Nombramiento/',
        propsToSearch: ['CUNI', 'Document', 'FullName', 'Positions', 'DependencyCod', 'Dependency', 'Branches', 'StartDate', 'EndDate'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 100
          },
          {
            prop: 'Document',
            label: 'Document',
            minWidth: 100
          },
          {
            prop: 'FullName',
            label: 'Nombre Completo',
            minWidth: 100
          },
          {
            prop: 'Positions',
            label: 'Cargo',
            minWidth: 100
          },
          {
            prop: 'DependencyCod',
            label: 'Cod',
            minWidth: 100
          },
          {
            prop: 'Dependency',
            label: 'Dependencia',
            minWidth: 100
          },
          {
            prop: 'Branches',
            label: 'Regional',
            minWidth: 100
          },
          {
            prop: 'StartDate',
            label: 'Fecha Inicio',
            minWidth: 100
          },
          {
            prop: 'EndDate',
            label: 'Fecha Fin',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        formData: {
          Cod: null,
          Category: null
        }
      }
    },
    methods: {
      see: function (id) {
        router.push('/Nombramiento/' + id)
      }
    }
  }
</script>
<style>
</style>
