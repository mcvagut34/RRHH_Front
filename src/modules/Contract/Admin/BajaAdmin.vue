<template>
    <div>
        <div class="panel panel-info">
            <div class="row">
              <div class="form-group col-md-6 el-col-md-offset-6">
              <label style="margin-top: 20px">Buscar por ID de contrato</label>
              <input type="number" style="text-transform: uppercase;" class="form-control textBox" v-model="index">
            </div>
              <div class="row">
                <div class="form-group col-md-2 el-col-md-offset-10">
                  <button class="btn btn-success" @click="buscar">Buscar</button>
                </div>
            </div>
        </div>
        </div>
        <br>
        <div class="panel panel-info">
          <add-contract-form :contract-id="ContractId"></add-contract-form>
        </div>
    </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import AddContractForm from './AddContractForm'
  export default {
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    computed: {
      CauseId: {
        get () {
          return this.$store.state.crud.formData.CauseId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CauseId', val: value})
        }
      },
      FullName: {
        get () {
          return this.$store.state.crud.formData.FullName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'FullName', val: value})
        }
      },
      Document: {
        get () {
          return this.$store.state.crud.formData.Document
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Document', val: value})
        }
      },
      Dependency: {
        get () {
          return this.$store.state.crud.formData.Dependency
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Dependency', val: value})
        }
      },
      Positions: {
        get () {
          return this.$store.state.crud.formData.Positions
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Positions', val: value})
        }
      },
      EndDate: {
        get () {
          return this.$store.state.crud.formData.EndDate
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'EndDate', val: (value.getMonth() + 1) + '-' + value.getDate() + '-' + value.getFullYear()})
        }
      }
    },
    data () {
      return {
        loaded: false,
        index: 0,
        es: es,
        format: 'dd-MMM-yyyy',
        ContractId: ''
      }
    },
    methods: {
      buscar () {
        this.loaded = true
        this.ContractId = this.index
        this.fakeLoad()
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 3000)
      }
    },
    components: {
      Datepicker,
      AddContractForm
    }
  }
</script>

<style scoped>

</style>
