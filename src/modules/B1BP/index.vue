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
        url: '/CostCenters/BusinessPartners/',
        propsToSearch: ['CardCode', 'CardName', 'LicTradNum', 'CardType'],
        tableColumns: [
          {
            prop: 'CardCode',
            label: '#',
            minWidth: 100
          },
          {
            prop: 'CardName',
            label: 'Nombre',
            minWidth: 150
          },
          {
            prop: 'LicTradNum',
            label: 'NIT',
            minWidth: 120
          },
          {
            prop: 'CardType',
            label: 'Tipo',
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
