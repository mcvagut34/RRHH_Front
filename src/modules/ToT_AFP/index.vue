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
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="Value">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      Value: {
        get () {
          return this.$store.state.crud.formData.Value
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Value', val: value})
        }
      }
    },
    data () {
      return {
        url: '/TableOfTables/AFP',
        propsToSearch: ['Value'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 75
          },
          {
            prop: 'Value',
            label: 'Nombre',
            minWidth: 290
          }
        ],
        formData: {
          Value: null
        }
      }
    },
    methods: {
    }
  }
</script>
<style>
</style>
