<template>
  <div style="background-color: ghostwhite">
    <data-tables :url="url" :propsToSearch="propsToSearch" :tableColumns="tableColumns" :pagination="pagination" :tipoExcel="tipoExcel">
    </data-tables>
  </div>
</template>

<script>
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
        tipoExcel: 'esp',
        propsToSearch: ['CUNI', 'Document', 'FirstSurName', 'SecondSurName', 'MariedSurName', 'Names'],
        tableColumns: [
          {
            prop: 'Branches',
            field: 'Branches',
            label: 'Regional',
            minWidth: 100
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
            prop: 'Dedication',
            field: 'Dedication',
            label: 'Dedicación',
            minWidth: 150
          },
          {
            prop: 'Link',
            field: 'Link',
            label: 'Vinculacion',
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
          }
        ],
        pagination: {
          perPage: 50,
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

