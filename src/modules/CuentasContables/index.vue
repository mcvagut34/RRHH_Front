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
          <label>Cuenta</label>
          <input type="text" placeholder="Cuenta" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Concepto"
                     v-model="Concept">
            <el-option v-for="option in selectConcept.values"
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
                     placeholder="Inidicador"
                     v-model="Indicator">
            <el-option v-for="option in selectIndicator.values"
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
      BranchesId: {
        get () {
          return this.$store.state.crud.formData.BranchesId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'BranchesId', val: value})
        }
      },
      Indicator: {
        get () {
          return this.$store.state.crud.formData.Indicator
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Indicator', val: value})
        }
      },
      Concept: {
        get () {
          return this.$store.state.crud.formData.Concept
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Concept', val: value})
        }
      }
    },
    data () {
      return {
        url: '/cuentascontables',
        propsToSearch: ['Name', 'Concept', 'GrupoContable', 'Branches', 'Indicator'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Cuenta',
            minWidth: 80
          },
          {
            prop: 'Concept',
            label: 'Concepto',
            minWidth: 80
          },
          {
            prop: 'GrupoContable',
            label: 'Grupo Contable',
            minWidth: 50
          },
          {
            prop: 'Branches',
            label: 'Regional',
            minWidth: 50
          },
          {
            prop: 'Indicator',
            label: 'Indicador',
            minWidth: 50
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
        selectGroup: {
          select: '',
          values: []
        },
        formData: {
          Name: null,
          BranchesId: '',
          GrupoContableId: '',
          Indicator: '',
          Concept: ''
        },
        selectIndicator: {
          select: '',
          values: [{Id: 'H', Name: 'Haber'},
            {Id: 'D', Name: 'Debe'}]
        },
        selectConcept: {
          select: '',
          values: [{Id: 'AFPP', Name: 'AFPP'},
            {Id: 'AGUI', Name: 'AGUI'},
            {Id: 'BENEF', Name: 'BENEF'},
            {Id: 'BONO', Name: 'BONO'},
            {Id: 'PRIMA', Name: 'PRIMA'},
            {Id: 'SALUDP', Name: 'SALUDP'},
            {Id: 'SYS', Name: 'SYS'},
            {Id: 'AFP_PPAGAR', Name: 'AFP_PPAGAR'},
            {Id: 'AFPL', Name: 'AFPL'},
            {Id: 'PRE_IND', Name: 'PRE_IND'},
            {Id: 'PRO_AGUI', Name: 'PRO_AGUI'},
            {Id: 'PRO_PRIMA', Name: 'PRO_PRIMA'},
            {Id: 'RCIVA', Name: 'RCIVA'},
            {Id: 'S_PPAGAR', Name: 'S_PPAGAR'},
            {Id: 'SSU_PPAGAR', Name: 'SSU_PPAGAR'},
            {Id: 'D_ANTI', Name: 'D_ANTI'},
            {Id: 'D_OTR', Name: 'D_OTR'},
            {Id: 'D_PCOB', Name: 'D_PCOB'},
            {Id: 'REINT', Name: 'REINTEGRO'},
            {Id: 'D_RCIVA', Name: 'D_RCIVA'},
            {Id: 'D_REND', Name: 'D_REND'}]
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
      loadGroupCountData () {
        axios.get('grupocontable/')
          .then(response => {
            this.selectGroup.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadBranchData()
      this.loadGroupCountData()
    }
  }
</script>
<style>
</style>
