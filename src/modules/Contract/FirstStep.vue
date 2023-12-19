<template>
  <div>
    <h5 class="text-center">PASO:1 Segmento de Alta.</h5>
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
    </div>
  </div>
</template>
<script>
  import {mapFields} from 'vee-validate'
  import axios from 'axios'

  export default {
    computed: {
      ...mapFields(['segmento']),
      segmentoOrigen: {
        get () {
          return this.$store.state.dist.segmentoOrigen
        },
        set (value) {
          this.$store.commit('dist/segmentoSetter', value)
        }
      }
    },
    data () {
      return {
        selectBranches: {
          select: '',
          values: []
        },
        modelValidations: {
          segmento: {
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
        this.$store.dispatch('dist/uploadedFiles', 'ALTA')
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
