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
        url: '/CostCenters/Proyectos/',
        propsToSearch: ['PrjCode', 'PrjName', 'ValidTo', 'U_ModalidadProy', 'U_Sucursal', 'U_Tipo', 'U_PEI_PO'],
        tableColumns: [
          {
            prop: 'PrjCode',
            label: '#',
            minWidth: 40
          },
          {
            prop: 'PrjName',
            label: 'Nombre  ',
            minWidth: 150
          },
          {
            prop: 'ValidTo',
            label: 'Valido Hasta',
            minWidth: 80
          },
          {
            prop: 'U_ModalidadProy',
            label: 'Modalidad',
            minWidth: 35
          },
          {
            prop: 'U_Sucursal',
            label: 'Sucursal',
            minWidth: 35
          },
          {
            prop: 'U_Tipo',
            label: 'Tipo',
            minWidth: 35
          },
          {
            prop: 'U_PEI_PO',
            label: 'PEI/PO',
            minWidth: 35
          },
          {
            prop: 'U_UORGANIZA',
            label: 'Unidad Org.',
            minWidth: 20
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
