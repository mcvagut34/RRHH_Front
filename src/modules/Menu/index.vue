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
          <label>Icono</label>
          <input type="text" placeholder="Codigo" class="form-control" v-model="Icon">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
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
      Icon: {
        get () {
          return this.$store.state.crud.formData.Icon
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Icon', val: value})
        }
      }
    },
    data () {
      return {
        url: '/module/',
        propsToSearch: ['Name'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 30
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Icon',
            label: 'Icono',
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
          Icon: null
        }
      }
    }
  }
</script>
<style>
</style>
