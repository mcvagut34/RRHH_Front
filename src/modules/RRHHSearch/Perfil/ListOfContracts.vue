<template>
  <div>
    <br>
    <button v-if="action==='BAJA'" class="btn btn-danger pull-right" @click="$emit('Remove','ALL')">Baja</button>
    <br>
    <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions: hasActions,tipoExcel: 'esp'}">
      <template slot="buttons" slot-scope="props">
        <el-tooltip v-if="action==='MODIFY'" class="item" effect="dark" content="Modificar" placement="top-start">
          <a class="btn btn-simple btn-xs btn-icon btn-info" @click="$emit('Modify',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
        </el-tooltip>
        <el-tooltip v-if="action==='BAJA'" class="item" effect="dark" content="Baja" placement="top-start">
          <a class="btn btn-simple btn-xs btn-icon btn-danger" @click="$emit('Remove',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
        </el-tooltip>
      </template>
    </data-tables>
  </div>
</template>

<script>
  // import axios from 'axios'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      },
      action: {
        type: String,
        required: true
      }
    },
    computed: {
      hasActions: {
        get () {
          return this.action === 'MODIFY' || this.action === 'BAJA'
        }
      }
    },
    data () {
      return {
        url: '/people/Contracts/' + this.personId,
        propsToSearch: ['Id', 'Cod', 'Dependency', 'Positions'],
        tableColumns: [
          {
            prop: 'Id',
            field: 'Id',
            label: '#',
            minWidth: 80
          },
          {
            prop: 'Cod',
            field: 'Cod',
            label: 'Cod.',
            minWidth: 80
          },
          {
            prop: 'Dependency',
            field: 'Dependency',
            label: 'Dependencia',
            minWidth: 200
          },
          {
            prop: 'Positions',
            field: 'Positions',
            label: 'Posición',
            minWidth: 150
          },
          {
            prop: 'StartDatestr',
            field: 'StartDatestr',
            label: 'Desde',
            minWidth: 120
          },
          {
            prop: 'EndDatestr',
            field: 'EndDatestr',
            label: 'Hasta',
            minWidth: 120
          },
          {
            prop: 'Branches',
            field: 'Branches',
            label: 'Regional',
            minWidth: 120
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        }
      }
    }
  }
</script>

<style scoped>

</style>
