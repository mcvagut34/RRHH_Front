<template>
  <div class="row" style="background-color: ghostwhite">
    <template v-if="show">
      <div class="row" style="padding-left: 25px; padding-right: 10px">
        <!--
        <div class="col-lg-3 col-md-3 col-sm-12">
          <PersonCard  v-if="loaded" :person="person"></PersonCard>
        </div>
        -->
        <div class="col-lg-12 col-md-12 col-sm-12">
          <b><h2 align="center">Trayectoria institucional</h2></b>
          <!--edit-person v-if="loaded" :person="person"></edit-person-->
          <ContractsTab v-if="loaded" :action="action" :person-id="person.Id" v-on:Modify="Modify" v-on:Remove="Remove"></ContractsTab>
        </div>
      </div>
      <!--
      <div class="col-lg-12 col-md-12" v-if="action !== 'SEARCH'">
        <BottomMenu v-if="loaded" :person="person" :action="action" :ContractId="contractDetail" :contract-ids="ContractIds" v-on:refresh="ref"></BottomMenu>
      </div>
      -->
    </template>
  </div>
</template>

<script>
  import PersonCard from './Perfil/PersonCard'
  import axios from 'axios'
  import EditPerson from './Perfil/EditPerson'
  import BottomMenu from './Perfil/BottomMenu'
  import ContractsTab from './Perfil/ContractsTab'

  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      source: {
        type: String,
        default: 'Id'
      }
    },
    components: {
      ContractsTab,
      BottomMenu,
      EditPerson,
      PersonCard
    },
    data () {
      return {
        show: true,
        loaded: false,
        loadBottomMenu: false,
        person: null,
        contractDetail: 0,
        ContractIds: []
      }
    },
    methods: {
      ref () {
        this.show = false
        this.$nextTick(() => {
          this.show = true
          console.log('re-render start')
          this.$nextTick(() => {
            console.log('re-render end')
          })
        })
      },
      init () {
        axios.get('/People/' + this.index + '?by=' + this.source, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.person = response.data
            this.loaded = true
          })
          .catch(error => console.log(error))
      },
      GetContracts () {
        axios.get('/people/Contracts/' + this.person.Id + '?now=YES', {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.ContractIds = response.data
            console.log(this.ContractIds)
          })
          .catch(error => console.log(error))
      },
      Modify (id) {
        this.contractDetail = id
        this.loadBottomMenu = true
      },
      Remove (id) {
        this.ContractIds = []
        console.log(id)
        if (id !== 'ALL') {
          axios.get('/Contract/' + id, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              this.ContractIds.push(response.data)
            })
            .catch(error => console.log(error))
        } else {
          this.GetContracts(this.ContractIds)
        }
        this.loadBottomMenu = true
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
