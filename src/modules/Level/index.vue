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
          <label>Codigo</label>
          <input type="text" placeholder="Codigo" class="form-control" v-model="Cod">
        </div>
        <div class="form-group">
          <label>Categoria</label>
          <input type="text" placeholder="Categoria" class="form-control" v-model="Category">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      Cod: {
        get () {
          return this.$store.state.crud.formData.Cod
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Cod', val: value})
        }
      },
      Category: {
        get () {
          return this.$store.state.crud.formData.Category
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Category', val: value})
        }
      }
    },
    data () {
      return {
        url: '/level/',
        propsToSearch: ['Cod', 'Category'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Cod',
            label: 'Codigo',
            minWidth: 100
          },
          {
            prop: 'Category',
            label: 'Categoria',
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
          Cod: null,
          Category: null
        }
      }
    }
  }
</script>
<style>
</style>
