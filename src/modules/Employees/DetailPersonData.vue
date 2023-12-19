<template>
  <div class="row" style="padding-left: 25px; padding-right: 10px">
    <div class="col-lg-3 col-md-3 col-sm-12">
      <PersonCard  v-if="loaded" :person="person"></PersonCard>
    </div>

    <div class="col-lg-9 col-md-9 col-sm-12">
      <edit-person v-if="loaded" :person="person"></edit-person>
    </div>

  </div>
</template>

<script>
  import PersonCard from './Perfil/PersonCard'
  import axios from 'axios'
  import EditPerson from './Perfil/EditPerson'
  import BottomMenu from './Perfil/BottomMenu'
  import ListOfContracts from './Perfil/ListOfContracts'

  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      source: {
        type: String,
        default: 'Id'
      }
    },
    components: {
      ListOfContracts,
      BottomMenu,
      EditPerson,
      PersonCard
    },
    data () {
      return {
        loaded: false,
        person: null
      }
    },
    methods: {
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
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
