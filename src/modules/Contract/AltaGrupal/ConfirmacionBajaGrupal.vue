<template>
  <div class="container">
    <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
      <template slot="buttons" slot-scope="props">
        <el-tooltip class="item" effect="dark" content="Incluir" placement="top-start">
          <input type="checkbox" :id="props.queriedData[props.index].Id" :value="props.queriedData[props.index].Id" v-model="SelectedIds"/>
        </el-tooltip>
      </template>
    </data-tables>
    <div class="form-group">
      <button class="btn btn-lg btn-info  col-md-12" v-on:click="send()">
        Confirmar Bajas
      </button>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert2'

    export default {
      data () {
        return {
          SelectedIds: [],
          url: 'Contract/BajaPendiente',
          propsToSearch: ['Id', 'CUNI', 'FullName', 'Positions', 'Dependency', 'Branches', 'StartDate', 'EndDate'],
          tableColumns: [
            {
              prop: 'Id',
              label: '#',
              minWidth: 50
            },
            {
              prop: 'CUNI',
              label: 'CUNI',
              minWidth: 100
            },
            {
              prop: 'FullName',
              label: 'Nombre Completo',
              minWidth: 100
            },
            {
              prop: 'Positions',
              label: 'Cargo',
              minWidth: 100
            },
            {
              prop: 'Dependency',
              label: 'Dependencia',
              minWidth: 100
            },
            {
              prop: 'Branches',
              label: 'Regional',
              minWidth: 100
            },
            {
              prop: 'StartDate',
              label: 'Fecha Inicio',
              minWidth: 100
            },
            {
              prop: 'EndDate',
              label: 'Fecha Fin',
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
      },
      methods: {
        successMessage: function () {
          swal({
            title: `Buen trabajo!`,
            text: 'Se guardaron los cambios!',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'success'
          })
        },
        errorMessage: function (text) {
          swal({
            title: `Ups!`,
            text: 'Ocurrio un error!\n' + text,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'error'
          })
        },
        isEmptyBlanckOrNull: function (val) {
          return !val || val.length === 0 || !val.toString().trim()
        },
        send () {
          axios.post('contract/confirmbajapendiente',
            {data: this.SelectedIds},
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          )
            .then(response => {
              this.successMessage()
            })
            .catch(error => {
              console.log(error)
              this.errorMessage()
            })
        },
        Reset () {
        }
      }
    }
</script>

<style scoped>

</style>
