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
        url: '/CostCenters/Careers/',
        propsToSearch: ['PrcCode', 'PrcName', 'ValidFrom', 'ValidTo'],
        tableColumns: [
          {
            prop: 'PrcCode',
            label: '#',
            minWidth: 80
          },
          {
            prop: 'PrcName',
            label: 'Nombre  ',
            minWidth: 120
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
          },
          {
            prop: 'UO',
            label: 'Unidad Organizacional',
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
