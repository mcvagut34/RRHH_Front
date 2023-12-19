<template>
    <div class="container col-md-12">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand">{{person.FullName}}</a>
          </div>
          <ul class="nav navbar-nav">
            <!--li class="active"><a @click="Ubicacion()">Ubicación</a></li>
            <li><a @click="Academico()">Formación Académica</a></li>
            <li><a @click="Historia()">Historia en UCB</a></li-->
          </ul>
        </div>
      </nav>
      <div class="container" style="width:100%; height:500px;">
        <Ubicacion v-if="State==='UBICACION'" :action="action" :personId="person.Id" :ContractId="ContractId" :contract-ids="ContractIds"  v-on:refresh="$emit('refresh')"></Ubicacion>
      </div>
    </div>
</template>

<script>
    import Ubicacion from './Ubicacion'
    export default {
      components: {Ubicacion},
      props: {
        person: {
          type: Object,
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
      data () {
        return {
          State: 'UBICACION'
        }
      },
      methods: {
        Ubicacion () {
          this.State = 'UBICACION'
        }
       /* Academico () {
          this.State = 'ACADEMICO'
        },
        Historia () {
          this.State = 'HISTORIA'
        } */
      }
    }
</script>

<style scoped>

</style>
