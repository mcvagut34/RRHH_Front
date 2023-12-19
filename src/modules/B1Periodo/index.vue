<template>
  <div class="row">
    <div class="card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions}">
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
        actions: false,
        url: '/CostCenters/Periodo/',
        propsToSearch: ['PrcCode', 'PrcName', 'U_GestionPeriodo', 'U_TipoPeriodo'],
        tableColumns: [
          {
            prop: 'PrcCode',
            label: '#',
            minWidth: 100
          },
          {
            prop: 'PrcName',
            label: 'Nombre',
            minWidth: 150
          },
          {
            prop: 'U_GestionPeriodo',
            label: 'Gestion',
            minWidth: 100
          },
          {
            prop: 'U_TipoPeriodo',
            label: 'Tipo',
            minWidth: 100
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
<style>
</style>
