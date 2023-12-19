<template>
  <div>
    <h5 class="text-center">PASO:1 Identificar Periodo de Proceso.</h5>
    <div class="row">
      <div class="col-md-3 el-col-md-offset-3">
        <div class="form-group">
          <label class="control-label">
            Segmento
          </label>
          <br>
          <el-select class="select-info"
                     size="large"
                     name="segmento"
                     placeholder="Regional"
                     v-model="segmentoOrigen"
                     v-validate="modelValidations.segmento">
            <el-option v-for="option in selectBranches.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
          <small class="text-danger" v-show="segmento.invalid">
            {{ getError('segmento') }}
          </small>
        </div>
      </div>
      <div class="col-md-3">
        <label class="control-label">
          Mes
        </label>
        <br>
        <div class="form-group">
          <el-select class="select-info"
                     name="mes"
                     v-validate="modelValidations.mes"
                     size="large"
                     placeholder="Mes"
                     v-model="month">
            <el-option v-for="option in selectMes.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
          <small class="text-danger" v-show="mes.invalid">
            {{ getError('mes') }}
          </small>
        </div>
        </div>
      <div class="col-md-3">
        <div class="form-group">
          <label class="control-label">
            Gestion
          </label>
          <input class="form-control"
                 type="text"
                 name="gestion"
                 v-validate="modelValidations.gestion"
                 v-model="year"
          />
          <small class="text-danger" v-show="gestion.invalid">
            {{ getError('gestion') }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapFields} from 'vee-validate'
  import axios from 'axios'

  export default {
    computed: {
      ...mapFields(['gestion', 'segmento', 'mes']),
      segmentoOrigen: {
        get () {
          return this.$store.state.dist.segmentoOrigen
        },
        set (value) {
          this.$store.commit('dist/segmentoSetter', value)
        }
      },
      month: {
        get () {
          return this.$store.state.dist.mes
        },
        set (value) {
          this.$store.commit('dist/mesSetter', value)
        }
      },
      year: {
        get () {
          return this.$store.state.dist.gestion
        },
        set (value) {
          this.$store.commit('dist/gestionSetter', value)
        }
      }
    },
    data () {
      return {
        selectBranches: {
          select: '',
          values: []
        },
        selectMes: {
          select: '',
          values: [{Id: '01', Name: 'Enero'},
            {Id: '02', Name: 'Febrero'},
            {Id: '03', Name: 'Marzo'},
            {Id: '04', Name: 'Abril'},
            {Id: '05', Name: 'Mayo'},
            {Id: '06', Name: 'Junio'},
            {Id: '07', Name: 'Julio'},
            {Id: '08', Name: 'Agosto'},
            {Id: '09', Name: 'Septiembre'},
            {Id: '10', Name: 'Octubre'},
            {Id: '11', Name: 'Noviembre'},
            {Id: '12', Name: 'Diciembre'},
            {Id: '13', Name: 'Retroactivo Enero'},
            {Id: '14', Name: 'Retroactivo Febrero'},
            {Id: '15', Name: 'Retroactivo Marzo'},
            {Id: '16', Name: 'Retroactivo Abril'}]
        },
        modelValidations: {
          gestion: {
            required: true,
            numeric: true,
            digits: 4,
            min_value: 2018
          },
          segmento: {
            required: true
          },
          mes: {
            required: true
          }
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
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$store.dispatch('dist/uploadedFiles')
        if (this.$store.state.dist.uploadedFiles.id) {
          this.$store.dispatch('crud/loadData', '/Payroll/Geterrors/' + this.$store.state.dist.uploadedFiles.id)
        }
        return this.$validator.validateAll()
      }
    },
    created () {
      this.loadBranchData()
    }
  }
</script>
<style>
</style>
