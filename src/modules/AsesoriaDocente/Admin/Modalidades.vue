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
          <input type="text" placeholder="Nombre" class="form-control" v-model="Modalidad">
        </div>
        <div class="form-group">
          <label>Abreviación</label>
          <input type="text" placeholder="Abr" class="form-control" v-model="Abr">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      Modalidad: {
        get () {
          return this.$store.state.crud.formData.Modalidad
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Modalidad', val: value})
        }
      },
      Abr: {
        get () {
          return this.$store.state.crud.formData.Abr
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Abr', val: value})
        }
      }
    },
    data () {
      return {
        url: '/Modalidades/',
        propsToSearch: ['Modalidad', 'Abr'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Modalidad',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Abr',
            label: 'Abr',
            minWidth: 50
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        formData: {
          Modalidad: null,
          Abr: null
        }
      }
    }
  }
</script>
<style>
</style>
