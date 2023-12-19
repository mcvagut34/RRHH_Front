<template>
    <div class="container col-md-12">
        <template v-if="state==='LIST'">
          <add-contract-form :people-id="personId" :contract-id="ContractId"></add-contract-form>
        </template>
        <template  v-if="state==='MOD' || action ==='ALTA'">
          <moveContract :person-id="personId" v-on:cancel="CancelMove()" v-on:refresh="$emit('refresh')"></moveContract>
        </template>
        <template  v-if="state==='BAJA'">
          <remove-contract :autofocus="'autofocus'" :person-id="personId" :contract-ids="ContractIds" v-on:cancel="CancelMove()" v-on:refresh="$emit('refresh')"></remove-contract>
        </template>

      <template v-if="state==='NOCONTRACT'">
        <br>
        <br>
        <H5 align="center">Esta Persona no se encuentra activa en este momento.</H5>
        <br>
        <br>
        <button class="btn btn-success pull-right btn-block" @click="Move()">Crear Nuevo Contrato</button>
      </template>

      <template v-if="state==='SELECTOPTION' && action !=='ALTA'">
        <br>
        <br>
        <H5 align="center">Por favor selecciona una opción.</H5>
        <br>
        <br>
      </template>
    </div>

</template>

<script>
  import axios from 'axios'
  import moveContract from './moveContract'
  import RemoveContract from './removeContract'
  import AddContractForm from './AddContractForm'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      },
      ContractId: {
        type: Number,
        required: true
      },
      ContractIds: {
        type: Array,
        required: true
      },
      action: {
        type: String,
        default: ''
      }
    },
    computed: {
      isremove: function () {
        return this.ContractIds.length > 0
      },
      reinit: function () {
        return this.ContractId
      }
    },
    watch: {
      isremove: function (newval, oldval) {
        if (newval === true) {
          this.state = 'BAJA'
        }
      },
      reinit: function () {
        this.init()
      }
    },
    data () {
      return {
        person: null,
        canEdit: false,
        hasContract: false,
        state: 'SELECTOPTION',
        update: false
      }
    },
    methods: {
      init () {
        if (this.ContractId === 0) {
          this.state = 'SELECTOPTION'
        } else {
          axios.get('contract/' + this.ContractId)
            .then(response => {
              this.person = response.data
              this.state = 'LIST'
              this.hasContract = true
            })
            .catch(this.hasContract = false)
        }
      },
      Move: function () {
        this.state = 'MOD'
      },
      CancelMove: function () {
        if (this.hasContract) this.state = 'LIST'
        else this.state = 'SELECTOPTION'
      }
    },
    created () {
      this.init()
    },
    components: {
      AddContractForm,
      RemoveContract,
      moveContract
    }
  }
</script>

<style scoped>

</style>
