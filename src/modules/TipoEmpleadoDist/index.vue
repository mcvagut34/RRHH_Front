<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url,formData}">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Grupo Contable"
                     v-model="GrupoContableId">
            <el-option v-for="option in selectGroup.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <input type="text" placeholder="Descripción" class="form-control" v-model="Description">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    computed: {
      Name: {
        get () {
          return this.$store.state.crud.formData.Name
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Name', val: value})
        }
      },
      GrupoContableId: {
        get () {
          return this.$store.state.crud.formData.GrupoContableId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'GrupoContableId', val: value})
        }
      },
      Description: {
        get () {
          return this.$store.state.crud.formData.Description
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Description', val: value})
        }
      }
    },
    data () {
      return {
        url: '/tipoempleadodist/',
        propsToSearch: ['Name', 'EmployeeType'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 30
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 40
          },
          {
            prop: 'GrupoContable',
            label: 'Grupo Contable',
            minWidth: 45
          },
          {
            prop: 'Description',
            label: 'Descripción',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        formData: {
          Name: null,
          GrupoContableId: '',
          Description: null
        },
        selectGroup: {
          select: '',
          values: []
        }
      }
    },
    methods: {
      loadGroupCountData () {
        axios.get('grupocontable/')
          .then(response => {
            this.selectGroup.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadGroupCountData()
    }
  }
</script>
<style>
</style>
