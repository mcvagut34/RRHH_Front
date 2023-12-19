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
          <label>Abbr</label>
          <input type="text" placeholder="Abbr" class="form-control" v-model="Abr">
        </div>
        <div class="form-group">
          <label>AD GroupName</label>
          <input type="text" placeholder="ADGroupName" class="form-control" v-model="ADGroupName">
        </div>
        <div class="form-group">
          <label>AD OU Name</label>
          <input type="text" placeholder="ADOUName" class="form-control" v-model="ADOUName">
        </div>

        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Unidad Generica"
                     v-model="DependencyId">
            <el-option v-for="option in values"
                       class="select-danger"
                       :value="option.Id"
                       :label= "option.Cod + '-' + option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>

        <div class="form-group">
          <label>Iniciales Interregional</label>
          <input type="text" placeholder="InitialsInterRegional" class="form-control" v-model="InitialsInterRegional">
        </div>
        <div class="form-group">
          <label>Serie Comprobante SAP</label>
          <input type="text" placeholder="SerieComprobanteContalbeSAP" class="form-control" v-model="SerieComprobanteContalbeSAP">
        </div>
        <div class="form-group">
          <label>Socio Generico Derechos Lab.</label>
          <input type="text" placeholder="SocioGenericDerechosLaborales" class="form-control" v-model="SocioGenericDerechosLaborales">
        </div>
        <div class="form-group">
          <label>Codigo en SAP</label>
          <input type="text" placeholder="CodigoSAP" class="form-control" v-model="CodigoSAP">
        </div>
        <div class="form-group">
          <label>Inicial SN</label>
          <input type="text" placeholder="Inicial SN" class="form-control" v-model="InicialSN">
        </div>
        <div class="form-group">
          <label>Cuenta RCUNI</label>
          <input type="text" placeholder="Cuenta RCUNI" class="form-control" v-model="CuentaSociosRCUNI">
        </div>
        <div class="form-group">
          <label>Cuenta HCUNI</label>
          <input type="text" placeholder="Cuenta HCUNI" class="form-control" v-model="CuentaSociosHCUNI">
        </div>
        <div class="form-group">
          <label>Indicador Impuestos</label>
          <input type="text" placeholder="Indicador Impuestos" class="form-control" v-model="VatGroup">
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
      Abr: {
        get () {
          return this.$store.state.crud.formData.Abr
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Abr', val: value})
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
      ADOUName: {
        get () {
          return this.$store.state.crud.formData.ADOUName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ADOUName', val: value})
        }
      },
      DependencyId: {
        get () {
          return this.$store.state.crud.formData.DependencyId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'DependencyId', val: value})
        }
      },
      InitialsInterRegional: {
        get () {
          return this.$store.state.crud.formData.InitialsInterRegional
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'InitialsInterRegional', val: value})
        }
      },
      SerieComprobanteContalbeSAP: {
        get () {
          return this.$store.state.crud.formData.SerieComprobanteContalbeSAP
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'SerieComprobanteContalbeSAP', val: value})
        }
      },
      SocioGenericDerechosLaborales: {
        get () {
          return this.$store.state.crud.formData.SocioGenericDerechosLaborales
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'SocioGenericDerechosLaborales', val: value})
        }
      },
      CodigoSAP: {
        get () {
          return this.$store.state.crud.formData.CodigoSAP
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CodigoSAP', val: value})
        }
      },
      InicialSN: {
        get () {
          return this.$store.state.crud.formData.InicialSN
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'InicialSN', val: value})
        }
      },
      CuentaSociosRCUNI: {
        get () {
          return this.$store.state.crud.formData.CuentaSociosRCUNI
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CuentaSociosRCUNI', val: value})
        }
      },
      CuentaSociosHCUNI: {
        get () {
          return this.$store.state.crud.formData.CuentaSociosHCUNI
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CuentaSociosHCUNI', val: value})
        }
      },
      VatGroup: {
        get () {
          return this.$store.state.crud.formData.VatGroup
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'VatGroup', val: value})
        }
      }
    },
    data () {
      return {
        url: '/branches/',
        propsToSearch: ['Name', 'Abr'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 120
          },
          {
            prop: 'Abr',
            label: 'Abr.',
            minWidth: 50
          },
          {
            prop: 'ADGroupName',
            label: 'AD GroupName',
            minWidth: 250
          },
          {
            prop: 'ADOUName',
            label: 'AD OU Name',
            minWidth: 110
          },
          {
            prop: 'Dependency',
            label: 'Unidad Generica',
            minWidth: 120
          },
          {
            prop: 'InitialsInterRegional',
            label: 'Iniciales Interregional',
            minWidth: 100
          },
          {
            prop: 'SerieComprobanteContalbeSAP',
            label: 'Serie Comprobante SAP',
            minWidth: 120
          },
          {
            prop: 'SocioGenericDerechosLaborales',
            label: 'Socio Generico Derechos Lab.',
            minWidth: 120
          },
          {
            prop: 'CodigoSAP',
            label: 'Codigo en SAP',
            minWidth: 60
          },
          {
            prop: 'CuentaSociosHCUNI',
            label: 'Cuenta HCUNI',
            minWidth: 120
          },
          {
            prop: 'CuentaSociosRCUNI',
            label: 'Cuenta RCUNI',
            minWidth: 120
          },
          {
            prop: 'VatGroup',
            label: 'Ind. Impuesto',
            minWidth: 120
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
          Abr: null,
          ADGroupName: null,
          ADOUName: null,
          DependencyId: null,
          SerieComprobanteContalbeSAP: null,
          InitialsInterRegional: null,
          SocioGenericDerechosLaborales: null,
          CodigoSAP: null,
          InicialSN: null,
          CuentaSociosHCUNI: null,
          CuentaSociosRCUNI: null,
          VatGroup: null
        },
        values: []
      }
    },
    methods: {
      loadData () {
        axios.get('dependency/')
          .then(response => {
            this.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
<style>
</style>
