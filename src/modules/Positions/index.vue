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
                     placeholder="Nivel"
                     v-model="LevelId">
            <el-option v-for="option in selectLevel.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Cod"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>

        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Area de Desempeño"
                     v-model="PerformanceAreaId">
            <el-option v-for="option in selectPerformanceArea.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>

        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Vinculacion por defecto"
                     v-model="DefaultLinkage">
            <el-option v-for="option in selectLinkage.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>

        <div class="form-group">
          <label>Es cargo de designacion?</label>
          <input type="checkbox" placeholder="Designado" class="form-control" v-model="IsDesignated">
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
      LevelId: {
        get () {
          return this.$store.state.crud.formData.LevelId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'LevelId', val: value})
        }
      },
      DefaultLinkage: {
        get () {
          return this.$store.state.crud.formData.DefaultLinkage
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'DefaultLinkage', val: value})
        }
      },
      IsDesignated: {
        get () {
          return this.$store.state.crud.formData.IsDesignated
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'IsDesignated', val: value})
        }
      },
      PerformanceAreaId: {
        get () {
          return this.$store.state.crud.formData.PerformanceAreaId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'PerformanceAreaId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/positions',
        propsToSearch: ['Name', 'Cod', 'IsDesignated'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Cod',
            label: 'Nivel',
            minWidth: 50
          },
          {
            prop: 'PerformanceArea',
            label: 'Area de Desempeño',
            minWidth: 100
          },
          {
            prop: 'IsDesignated',
            label: 'Designado',
            minWidth: 50
          },
          {
            prop: 'DefaultLinkage',
            label: 'Vinculacion',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        selectBranches: {
          select: '',
          values: []
        },
        selectLevel: {
          select: '',
          values: []
        },
        selectLinkage: {
          select: '',
          values: []
        },
        selectPerformanceArea: {
          select: '',
          values: []
        },
        formData: {
          Name: null,
          BranchesId: '',
          LevelId: '',
          PerformanceAreaId: ''
        }
      }
    },
    methods: {
      loadBranchData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadLinkageData () {
        axios.get('TableOfTables/Linkage/')
          .then(response => {
            console.log(response)
            this.selectLinkage.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadLevelData () {
        axios.get('level/')
          .then(response => {
            this.selectLevel.values = response.data
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
      this.loadBranchData()
      this.loadLevelData()
      this.loadPerformanceAreaData()
      this.loadLinkageData()
    }
  }
</script>
<style>
</style>
