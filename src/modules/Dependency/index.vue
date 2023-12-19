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
          <input type="text" placeholder="Nombre" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <label>Codigo</label>
          <input type="text" placeholder="Codigo" class="form-control" v-model="Cod">
        </div>
        <div class="form-group">
          <label>Activo</label>
          <input type="checkbox" placeholder="Activo" class="form-control" v-model="Active">
        </div>
        <div class="form-group">
          <label>Academico</label>
          <input type="checkbox" placeholder="Academico" class="form-control" v-model="Academic">
        </div>
        <div class="form-group">
          <el-select class="select-info"S
                     size="large"
                     placeholder="Padre"
                     v-model="ParentId">
            <el-option class="select-danger"
                       value=0
                       label="Sin Padre"
                       key=0>
            </el-option>
            <el-option v-for="option in selectParent.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Cod + '-' + option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Unidad Organizacional"
                     v-model="OrganizationalUnitId">
            <el-option v-for="option in selectOrg.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Cod + '-' + option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>

        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Regional"
                     v-model="BranchesId">
            <el-option v-for="option in selectBranches.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Abr + '-' + option.Name"
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
      Cod: {
        get () {
          return this.$store.state.crud.formData.Cod
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Cod', val: value})
        }
      },
      ParentId: {
        get () {
          return this.$store.state.crud.formData.ParentId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ParentId', val: value})
        }
      },
      OrganizationalUnitId: {
        get () {
          return this.$store.state.crud.formData.OrganizationalUnitId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'OrganizationalUnitId', val: value})
        }
      },
      BranchesId: {
        get () {
          return this.$store.state.crud.formData.BranchesId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'BranchesId', val: value})
        }
      },
      Active: {
        get () {
          return this.$store.state.crud.formData.Active
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Active', val: value})
        }
      },
      Academic: {
        get () {
          return this.$store.state.crud.formData.Academic
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Academic', val: value})
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
        url: '/dependency',
        propsToSearch: ['Name', 'Cod', 'Parent', 'OrganizationalUnit', 'Branch', 'OUCod', 'PerformanceArea'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 75
          },
          {
            prop: 'Cod',
            label: 'Codigo',
            minWidth: 75
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 290
          },
          {
            prop: 'ParentCod',
            label: 'Codigo Padre',
            minWidth: 75
          },
          {
            prop: 'Parent',
            label: 'Padre',
            minWidth: 300
          },
          {
            prop: 'OUCod',
            label: 'Codigo UO',
            minWidth: 75
          },
          {
            prop: 'OrganizationalUnit',
            label: 'Unidad Organizacional',
            minWidth: 300
          },
          {
            prop: 'Branch',
            label: 'Regional',
            minWidth: 75
          },
          {
            prop: 'Academic',
            label: 'Academico',
            minWidth: 60
          },
          {
            prop: 'Active',
            label: 'Activo',
            minWidth: 60
          },
          {
            prop: 'PerformanceArea',
            label: 'Area de Desempeño',
            minWidth: 100
          }
        ],
        selectParent: {
          select: '',
          values: []
        },
        selectOrg: {
          select: '',
          values: []
        },
        selectBranches: {
          select: '',
          values: []
        },
        selectPerformanceArea: {
          select: '',
          values: []
        },
        formData: {
          Name: null,
          Cod: null,
          ParentId: '',
          OrganizationalUnitId: '',
          Active: false,
          PerformanceAreaId: ''
        }
      }
    },
    methods: {
      loadParentData () {
        axios.get('dependency/')
          .then(response => {
            this.selectParent.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadOrgData () {
        axios.get('organizationalunit/')
          .then(response => {
            this.selectOrg.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadBrData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
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
      this.loadParentData()
      this.loadOrgData()
      this.loadBrData()
      this.loadPerformanceAreaData()
    }
  }
</script>
<style>
</style>
