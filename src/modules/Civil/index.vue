<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="panel panel-info">
        <div class="panel-heading">
          <h5>Datos del Socio de Negocio:</h5>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-3 col-md-offset-2">
              <div class="form-group row">
                <label>Codigo SAP / CI:</label>
                <div>
                  <input type="text" placeholder="Codigo SAP" class="form-control" style="text-transform: uppercase;" v-model="formData.SAPId" @keyup.enter="findBP()" @change="ResetForm() ">
                </div>
              </div>
            </div>

            <div class="col-md-4 col-md-offset-2" style="margin-left: 0">
              <button class="btn btn-fill btn-success btn-block"  id="search-person" @click="findBP()" style="margin-top: 25px;">Buscar</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-md-offset-2">
              <div class="form-group row">
                <label>NIT</label>
                <div>
                  <input type="text" placeholder="NIT" class="form-control" v-model="formData.NIT" @change="ResetPerson()" :readonly="readonly">
                </div>
              </div>
            </div>

            <div class="col-md-4 col-md-offset-1">
              <div class="form-group row">
                <label>Nombre Completo</label>
                <div>
                  <input type="text" placeholder="Nombre Completo" class="form-control" v-model="formData.FullName" @change="ResetPerson()"  :readonly="readonly">
                </div>
              </div>
            </div>
            <div class="col-md-7 col-md-offset-2">
              <div class="form-group row">
                <button class="btn btn-fill btn-success btn-block" @click="send()" style="margin-top: 25px;">Habilitar como persona independiente</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <data-tables :url="url2" :propsToSearch="propsToSearch" :tableColumns="tableColumns" :pagination="pagination" :actions="action" :fuente-p-d-f="fuente"></data-tables>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  export default {
    computed: {
    },
    data () {
      return {
        fuente: 'SARAI',
        readonly: true,
        url: '/civil/',
        formData: {
          FullName: null,
          SAPId: null,
          NIT: null,
          Document: null
        },
        action: false,
        url2: '/CivilbyBranch/0',
        propsToSearch: ['Id', 'FullName', 'Abr', 'Category', 'SAPId', 'NIT'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 25
          },
          {
            prop: 'Abr',
            label: 'Regional',
            minWidth: 25
          },
          {
            prop: 'SAPId',
            label: 'SAPId',
            minWidth: 50
          },
          {
            prop: 'FullName',
            label: 'FullName',
            minWidth: 100
          },
          {
            prop: 'NIT',
            label: 'NIT',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        }
      }
    },
    methods: {
      successMessage: function () {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      errorMessage: function (text) {
        swal({
          title: `Ups!`,
          text: text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      },
      findBP: function () {
        axios.post('civilfindInSAP/', {'CardCode': this.formData.SAPId})
          .then(response => {
            this.formData.FullName = response.data.FullName
            this.formData.SAPId = response.data.SAPId
            this.formData.NIT = response.data.NIT
            this.formData.Document = response.data.Document
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.errorMessage('Socio de Negocio no valido:\n\t- El Socio de Negocio no existe\n\t- El Socio de Negocio no es Provedor')
            }
            if (error.response.status === 401) {
              this.errorMessage('Socio de Negocio no valido:\n\t- El Socio de Negocio no esta habilitado para su regional')
            }
          })
      },
      ResetForm: function () {
        this.formData.FullName = null
        this.formData.NIT = null
        this.formData.Document = null
      },
      send: function () {
        console.log(this.formData.FullName)
        console.log(this.formData.SAPId)
        console.log(this.formData.NIT)
        console.log(this.formData.Document)
        axios.post('civil/', this.formData)
          .then(response => {
            this.successMessage()
            this.formData.SAPId = null
            // permite cargar la información después de haberla mandado
            this.$store.dispatch('crud/loadData', this.url2)
            this.ResetForm()
          })
          .catch(error => {
            if (error.response.status === 401) {
              this.errorMessage('Su usuario no tiene permisos para usar este socio de negocio')
            }
            if (error.response.status === 409) {
              this.errorMessage('Socio de Negocio no valido:\n\t- El Socio de Negocio ya existe')
            }
          })
      }
    }
  }
</script>
<style>
</style>
