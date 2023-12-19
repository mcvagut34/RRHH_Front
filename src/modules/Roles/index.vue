<template>
  <div>
    <div class="row" v-if="!access">
      <div class="col-md-8 card">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
          <template slot="buttons" slot-scope="props">
            <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Añadir Permisos" placement="top-start">
              <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="addAccess(props.queriedData[props.index].Id)"><i class="fa fa-plus"></i></a>
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
            <label>Nivel</label>
            <input type="text" placeholder="Nivel" class="form-control" v-model="Level">
          </div>
          <div class="form-group">
            <label>AD GroupName</label>
            <input type="text" placeholder="ADGroupName" class="form-control" v-model="ADGroupName">
          </div>
          <div class="form-group">
            <el-select class="select-info"
                       size="large"
                       placeholder="Recurso"
                       v-model="ResourceId">
              <el-option v-for="option in values"
                         class="select-danger"
                         :value="option.Id"
                         :label="option.Name"
                         :key="option.Id">
              </el-option>
            </el-select>
          </div>
        </crud-form>
      </div>
    </div>
    <template v-if="access">
      <h3>Accesos del Rol: <small>{{username}}</small>
      <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="EndAccess">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Finalizar
          </span>
      </button>
      </h3>
      <div class="col-md-8 card">
      <data-tables v-bind="{url: url1, propsToSearch: propsToSearch1,tableColumns: tableColumns1}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="removeAccess(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
      </div>
      <div class="col-md-4">
        <crud-form v-bind="{url: url1,formData: formData1}">
          <div class="form-group">
            <label>Nombre</label>
            <model-select :options="options"
                          v-model="AccessId"
                          placeholder="Selecciona un Acceso">
            </model-select>
          </div>
        </crud-form>
      </div>

    </template>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import axios from 'axios'
  import { ModelSelect } from 'vue-search-select'
  import swal from 'sweetalert2'

  Vue.use(Tooltip)
  export default {
    components: {ModelSelect},
    computed: {
      Name: {
        get () {
          return this.$store.state.crud.formData.Name
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Name', val: value})
        }
      },
      Level: {
        get () {
          return this.$store.state.crud.formData.Level
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Level', val: value})
        }
      },
      ADGroupName: {
        get () {
          return this.$store.state.crud.formData.ADGroupName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ADGroupName', val: value})
        }
      },
      ResourceId: {
        get () {
          return this.$store.state.crud.formData.ResourceId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ResourceId', val: value})
        }
      },
      // access form
      AccessId: {
        get () {
          return this.$store.state.crud.formData.AccessId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'AccessId', val: value})
        }
      }
    },
    data () {
      return {
        // form Access
        options: [],
        formData1: {
          AccessId: null
        },
        // DataTable of Access
        username: '',
        access: false,
        baseurl: 'rol/Access/',
        url1: '',
        propsToSearch1: ['Method', 'Description', 'Path'],
        tableColumns1: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 35
          },
          {
            prop: 'Method',
            label: 'Metodo',
            minWidth: 50
          },
          {
            prop: 'Description',
            label: 'Descripcion',
            minWidth: 100
          },
          {
            prop: 'Path',
            label: 'Path',
            minWidth: 110
          },
          {
            prop: 'Public',
            label: 'Public',
            minWidth: 30
          }
        ],
        // DataTable of Rols
        url: '/rol/',
        propsToSearch: ['Name', 'Level'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 35
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Level',
            label: 'Nivel',
            minWidth: 35
          },
          {
            prop: 'ADGroupName',
            label: 'AD GroupName',
            minWidth: 110
          },
          {
            prop: 'Resource',
            label: 'Default Resource',
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
          Level: null,
          ADGroupName: null
        },
        values: []
      }
    },
    methods: {
      addAccess (index) {
        this.access = true
        this.url1 = this.baseurl + index
        this.username = index
      },
      removeAccess (index) {
        var acurl = this.url1
        swal({
          title: 'Estas Seguro?',
          text: 'No será posible volver atras!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          axios.delete(acurl, {params: {
            'AccessId': index
          }},
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
            .then(response => {
              swal({
                title: 'Eliminado!',
                text: 'Se elimino de forma correcta.',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              })
              this.$store.commit('crud/loadData', this.formData1.url)
              // dispatch('loadData', formData.url)
            })
            .catch(error => console.log(error))
        }, function (dismiss) {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'Este item está a salvo :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      },
      EndAccess (index) {
        this.access = false
      },
      loadData () {
        axios.get('resource/')
          .then(response => {
            this.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadAccessData: function () {
        axios.get('access/')
          .then(response => {
            var result = []
            response.data.forEach(function (access) {
              result.push({value: access.Id, text: access.Method + ' --- ' + access.Path})
            })
            this.options = result
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadData()
      this.loadAccessData()
    }
  }
</script>
<style>
</style>
