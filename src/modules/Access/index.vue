<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns}">
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
          <label>Metodo</label>
          <input type="text" placeholder="Metodo" class="form-control" v-model="Method">
        </div>
        <div class="form-group">
          <label>Path</label>
          <input type="text" placeholder="Path" class="form-control" v-model="Path">
        </div>
        <div class="form-group">
          <label>Desc</label>
          <input type="text" placeholder="Description" class="form-control" v-model="Description">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Recurso"
                     v-model="ResourceId">
            <el-option v-for="option in selectResource"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <label>¿Public?</label>
          <p-switch v-model="Public">
            <i class="fa fa-check" slot="on"></i>
            <i class="fa fa-times" slot="off"></i>
          </p-switch>
        </div>

      </crud-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  export default {
    created () {
      this.$store.commit('crud/formDataFieldSetter', {field: 'Public', val: false})
      this.loadResourceData()
    },
    components: {
      PSwitch
    },
    computed: {
      Method: {
        get () {
          return this.$store.state.crud.formData.Method
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Method', val: value})
        }
      },
      Path: {
        get () {
          return this.$store.state.crud.formData.Path
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Path', val: value})
        }
      },
      Description: {
        get () {
          return this.$store.state.crud.formData.Description
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Description', val: value})
        }
      },
      Public: {
        get () {
          return this.$store.state.crud.formData.Public
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Public', val: value})
        }
      },
      ResourceId: {
        get () {
          return this.$store.state.crud.formData.ResourceId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ResourceId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/access/',
        propsToSearch: ['Method', 'Path', 'Description', 'Resource'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Method',
            label: 'Metodo',
            minWidth: 50
          },
          {
            prop: 'Path',
            label: 'Path',
            minWidth: 100
          },
          {
            prop: 'Description',
            label: 'Description',
            minWidth: 150
          },
          {
            prop: 'Resource',
            label: 'Recurso',
            minWidth: 70
          },
          {
            prop: 'Public',
            label: 'Public',
            minWidth: 70
          }
        ],
        formData: {
          Method: null,
          Path: null,
          Module: null,
          Description: null,
          Public: false,
          ResourceId: null
        },
        selectResource: null
      }
    },
    methods: {
      loadResourceData () {
        axios.get('Resource/')
          .then(response => {
            this.selectResource = response.data
          })
          .catch(error => console.log(error))
      }
    }
  }
</script>
<style>
</style>
