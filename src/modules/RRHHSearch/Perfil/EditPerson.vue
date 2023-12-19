<template>
  <div class="container col-md-12">
    <template>
      <div v-for="person in persons" :key="'item' + person.id">
      <div class="row">
        <div class="form-group col-md-4">
          <label>Tipo Documento</label>
          <div>
            <input type="text" placeholder="Tipo Documento" class="form-control" readonly v-model="person.TipoDocumento">
          </div>
        </div>

        <div class="form-group col-md-4">
          <label>Numero Documento</label>
          <div>
            <input type="text" placeholder="Documento de identidad" class="form-control" readonly v-model="person.Documento">
          </div>
        </div>

        <template v-if="person.TipoDocumento==='CARNET DE IDENTIDAD'">
          <div class="form-group col-md-4">
            <label>Expedido en </label>
            <div>
              <input type="text" placeholder="Expedido" class="form-control" readonly v-model="person.Ext">
            </div>
          </div>
        </template>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>Nombres</label>
          <div>
            <input type="text" placeholder="Nombres" class="form-control" readonly v-model="person.Nombres">
          </div>
        </div>

        <div class="form-group col-md-6">
          <label>Primer Apellido</label>
          <div>
            <input type="text" placeholder="Primer Apellido" class="form-control" readonly v-model="person.PrimerApellido">
          </div>
        </div>

      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>Segundo Apellido</label>
          <div>
            <input type="text" placeholder="Segundo Apellido" class="form-control" readonly v-model="person.SegundoApellido">
          </div>
        </div>
        <template v-if="person.Gender==='FEMENINO'">
          <template v-if="person.ApellidoCasada">
            <div class="form-group col-md-6">
              <label>Apellido Casada</label>
              <div>
                <input type="text" placeholder="Apellido Casada" class="form-control" readonly v-model="person.ApellidoCasada">
              </div>
            </div>
          </template>

        </template>


      </div>
      <div class="row">
        <div class="form-group col-md-3">
          <label>Genero</label>
          <div>
            <input type="text" placeholder="Genero" class="form-control" readonly v-model="person.Genero">
          </div>
        </div>
        <div class="form-group col-md-3">
          <label>Fecha de Nacimiento</label>
          <div>
            <input type="text" placeholder="Fecha de Nacimiento" class="form-control" readonly v-model="person.FechaNacimiento">
          </div>
        </div>
        <div class="form-group col-md-3">
          <label>Edad</label>
          <div>
            <input type="text" placeholder="Edad" class="form-control" readonly v-model="person.Edad">
          </div>
        </div>
        <div class="form-group col-md-3">
          <label>Nacionalidad</label>
          <div>
            <input type="text" placeholder="Nacionalidad" class="form-control" readonly v-model="person.Nacionalidad">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label>AFP</label>
          <div>
            <input type="text" placeholder="AFP" class="form-control" readonly v-model="person.AFP">
          </div>
        </div>
        <div class="form-group col-md-4">
          <label>NUA</label>
          <div>
            <input type="text" placeholder="NUA" class="form-control" readonly v-model="person.NUA">
          </div>
        </div>
        <div class="form-group col-md-4">
          <label>Seguro</label>
          <div>
            <input type="text" placeholder="Seguro" class="form-control" readonly v-model="person.Seguro">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>Email institucional</label>
          <div>
            <input type="text" placeholder="UCB Email" class="form-control" readonly v-model="person.EmailUCB">
          </div>
        </div>

        <div class="form-group col-md-6">
          <label>Email Personal</label>
          <div>
            <input type="text" placeholder="Email Personal" class="form-control" readonly v-model="person.EmailPersonal">
          </div>
        </div>
      </div>
      </div>
    </template>
  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import axios from 'axios'
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      source: {
        type: String,
        default: 'ContractId'
      }
    },
    data () {
      return {
        show: true,
        loaded: false,
        loadBottomMenu: false,
        persons: [],
        contractDetail: 0,
        ContractIds: []
      }
    },
    components: {
      Datepicker
    },
    methods: {
      PersonData () {
        axios.get('/BusquedaGrupal/PersonData/' + this.index + '/' + this.source)
          .then(response => {
            console.log('/BusquedaGrupal/PersonData/' + this.index + '/' + this.source)
            this.persons = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.PersonData()
    }
  }
</script>

<style scoped>
  .btn-file-custom input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;

  }
</style>
