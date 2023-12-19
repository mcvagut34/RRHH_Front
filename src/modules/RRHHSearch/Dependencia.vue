<template>
  <div class="row">
    <div class="col-md-12 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns, actions: false}">
      </data-tables>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        url: '/dependency',
        propsToSearch: ['Name', 'Cod', 'Parent', 'OrganizationalUnit', 'OUCod', 'Branch', 'PerformanceArea'],
        tableColumns: [
          {
            prop: 'Cod',
            label: 'Codigo',
            minWidth: 75
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 290
          },
          {
            prop: 'ParentCod',
            label: 'Codigo Padre',
            minWidth: 75
          },
          {
            prop: 'Parent',
            label: 'Padre',
            minWidth: 300
          },
          {
            prop: 'OUCod',
            label: 'Codigo UO',
            minWidth: 75
          },
          {
            prop: 'OrganizationalUnit',
            label: 'Unidad Organizacional',
            minWidth: 300
          },
          {
            prop: 'Branch',
            label: 'Sede',
            minWidth: 75
          },
          {
            prop: 'Academic',
            label: 'Academico',
            minWidth: 60
          },
          {
            prop: 'Active',
            label: 'Activo',
            minWidth: 60
          },
          {
            prop: 'PerformanceArea',
            label: 'Area de Desempeño',
            minWidth: 100
          }
        ],
        selectParent: {
          select: '',
          values: []
        },
        selectOrg: {
          select: '',
          values: []
        },
        selectBranches: {
          select: '',
          values: []
        },
        selectPerformanceArea: {
          select: '',
          values: []
        },
        formData: {
          Name: null,
          Cod: null,
          ParentId: '',
          OrganizationalUnitId: '',
          Active: false,
          PerformanceAreaId: ''
        }
      }
    },
    methods: {
      loadParentData () {
        axios.get('dependency/')
          .then(response => {
            this.selectParent.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadOrgData () {
        axios.get('organizationalunit/')
          .then(response => {
            this.selectOrg.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadBrData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadPerformanceAreaData () {
        axios.get('PerformanceArea/')
          .then(response => {
            this.selectPerformanceArea.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadParentData()
      this.loadOrgData()
      this.loadBrData()
      this.loadPerformanceAreaData()
    }
  }
</script>
<style>
</style>
