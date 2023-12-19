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
        url: '/ContractSAP/',
        propsToSearch: ['CUNI', 'Document', 'FullName', 'DependencyCod', 'Dependency'],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 60
          },
          {
            prop: 'Document',
            label: 'Documento',
            minWidth: 50
          },
          {
            prop: 'FullName',
            label: 'Nombre Completo',
            minWidth: 120
          },
          {
            prop: 'DependencyCod',
            label: 'Cod. Dependencia',
            minWidth: 45
          },
          {
            prop: 'Dependency',
            label: 'Dependencia',
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
