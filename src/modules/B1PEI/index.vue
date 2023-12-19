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
        url: '/CostCenters/PEI/',
        propsToSearch: ['PrcCode', 'PrcName', 'U_GestionCC', 'U_AmbitoPEI', 'U_DirectrizPEI', 'U_Indicador', 'ValidFrom', 'ValidTo'],
        tableColumns: [
          {
            prop: 'PrcCode',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'PrcName',
            label: 'Nombre',
            minWidth: 150
          },
          {
            prop: 'U_GestionCC',
            label: 'Gestion',
            minWidth: 40
          },
          {
            prop: 'U_AmbitoPEI',
            label: 'Ambito',
            minWidth: 40
          },
          {
            prop: 'U_DirectrizPEI',
            label: 'Directriz',
            minWidth: 40
          },
          {
            prop: 'U_Indicador',
            label: 'Indicador',
            minWidth: 40
          },
          {
            prop: 'ValidFrom',
            label: 'Valido Desde',
            minWidth: 120
          },
          {
            prop: 'ValidTo',
            label: 'Valido Hasta',
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
<style>
</style>
