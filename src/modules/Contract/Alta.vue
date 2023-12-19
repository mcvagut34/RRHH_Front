<template>
  <div>
    <DetailEmpleado v-if="redirectToPersonDetail" action="ALTA" :index="i"></DetailEmpleado>
    <template v-else>
      <template>
        <div class="panel panel-info">
          <div class="panel-heading">
            Datos de la Persona
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 col-md-offset-2">
                <div class="form-group row">
                  <label>Documento Identidad</label>
                  <div>
                    <input type="text" placeholder="Documento Identidad" class="form-control" v-model="contract.Document" @keyup.enter="searchPerson(contract.Document)" @change="ResetPerson()">
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-md-offset-2" style="margin-left: 0">
                <button class="btn btn-fill btn-success btn-block"  id="search-person" @click="searchPerson(contract.Document)" style="margin-top: 25px;">Buscar</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2 col-md-offset-2">
                <div class="form-group row">
                  <label>CUNI</label>
                  <div>
                    <input type="text" placeholder="CUNI" class="form-control" v-model="contract.CUNI" @change="ResetPerson()" :readonly="readonly">
                  </div>
                </div>
              </div>

              <div class="col-md-5 col-md-offset-1">
                <div class="form-group row">
                  <label>Nombre Completo</label>
                  <div>
                    <input type="text" placeholder="Nombre Completo" class="form-control" v-model="FullName" @change="ResetPerson()"  :readonly="readonly">
                  </div>
                </div>
              </div>


            </div>

            <AltaEmpleado v-if="showModal" :showModal="showModal" :document="contract.Document" @close="showModal = false" @personcreated="searchPerson">
            </AltaEmpleado>
          </div>
        </div>


        <template v-if="reinOrNew">
          <div class="panel panel-info">
            <div class="panel-heading">
              Ubicación
            </div>
              <AddContractForm :people-id="PeopleId"></AddContractForm>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
    import axios from 'axios'
    import AltaExcel from './AltaExcel'
    import AltaEmpleado from './AltaEmpleado'
    import DetailEmpleado from '../Employees/DetailEmpleado'
    import swal from 'sweetalert2'
    import AddContractForm from '../Employees/Perfil/AddContractForm'


    export default {
      data () {
        return {
          PeopleId: null,
          reinOrNew: false,
          i: 0,
          redirectToPersonDetail: false,
          showModal: false,
          columns: [],
          rows: [],
          ExcelUpload: false,
          // stetic
          FullName: '',
          readonly: true,
          // end stetic
          contract: {
            Document: null,
            CUNI: null
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
            text: 'Ocurrio un error!\n' + text,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'error'
          })
        },
        isEmptyBlanckOrNull: function (val) {
          return !val || val.length === 0 || !val.toString().trim()
        },
        ResetPerson  () {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CUNI', val: null})
          this.FullName = null
          this.contract.CUNI = null
          this.reinOrNew = false
        },
        clearFormData  () {
          this.contract.Document = null
          this.contract.CUNI = null
          this.FullName = null
        },
        searchPerson (doc) {
          doc = this.cleanText(doc)
          this.contract.Document = this.cleanText(this.contract.Document)
          axios.get('people/query?by=Documento&value=' + doc)
            .then(response => {
              this.PeopleId = response.data.Id
              this.contract.CUNI = response.data.CUNI
              this.FullName = response.data.FullName
              this.i = response.data.Id
              this.redirectToPersonDetail = response.data.contract
              this.reinOrNew = !this.redirectToPersonDetail
            })
            .catch(error => {
              if (error.response.status === 404) {
                this.showModal = true
              }
            })
        },
        cleanText (text) {
          return text.split(' ').join('').toUpperCase()
        },
        showExcelUpload () {
          this.ExcelUpload = true
        }
      },
      components: {
        AddContractForm,
        AltaExcel,
        AltaEmpleado,
        DetailEmpleado
      }
    }
</script>

<style scoped>

</style>
