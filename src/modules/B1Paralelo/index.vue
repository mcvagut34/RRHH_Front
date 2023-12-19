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
        url: '/CostCenters/Paralelo/',
        propsToSearch: [ 'PrcCode', 'PrcName', 'U_Sigla', 'U_Materia', 'U_PeriodoPARALELO', 'U_Paralelo', 'U_EstadoParalelo', 'U_NivelParalelo', 'U_TipoParalelo' ],
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
            prop: 'U_PeriodoPARALELO',
            label: 'Periodo',
            minWidth: 100
          },
          {
            prop: 'U_Sigla',
            label: 'Sigla',
            minWidth: 100
          },
          {
            prop: 'U_Materia',
            label: 'Materia',
            minWidth: 220
          },
          {
            prop: 'U_Paralelo',
            label: 'Paralelo',
            minWidth: 70
          },
          {
            prop: 'U_NivelParalelo',
            label: 'Nivel',
            minWidth: 100
          },
          {
            prop: 'U_TipoParalelo',
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
