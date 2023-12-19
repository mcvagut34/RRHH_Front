<template>
  <div>
      <modal :show="showModal" @close="close">
        <template  slot="header">
          Nuevo Empleado
        </template>
        <template  slot="body">
            <div class="panel panel-info">
              <div class="panel-heading">
                Datos Personales
              </div>
              <div class="panel-body">
                <!--form @submit.prevent="create"-->
                  <div class="row">
                    <div class="form-group col-md-4">
                      <label>Tipo Documento</label>
                      <div>
                        <el-select class="select-info"
                                   size="large"
                                   placeholder="Tipo Documento"
                                   v-model="formData.TypeDocument">
                          <el-option v-for="option in selectDocumentType.values"
                                     class="select-danger"
                                     :value="option.Id"
                                     :label="option.Name"
                                     :key="option.Id">
                          </el-option>
                        </el-select>
                        <small v-if="formError.TypeDocument" class="form-text text-muted text-danger">*Selecciona un valor.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>Numero Documento</label>
                      <div>
                        <input type="text" placeholder="Documento de identidad" class="form-control" v-model="formData.Document" style="text-transform:uppercase">
                        <small v-if="formError.Document" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                      </div>
                    </div>

                    <template v-if="formData.TypeDocument==='CI'">
                    <div class="form-group col-md-4">
                      <label>Expedido en</label>
                      <div>
                        <el-select class="select-info"
                                   size="large"
                                   placeholder="Expedido en"
                                   v-model="formData.Ext">
                          <el-option v-for="option in selectIssued.values"
                                     class="select-danger"
                                     :value="option.Id"
                                     :label="option.Name"
                                     :key="option.Id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    </template>

                  </div>


                  <div class="row">
                    <div class="el-col-24"><span style="font-size: 30px;">{{fullName}}</span></div>

                    <div class="form-group col-md-4">
                      <label>Nombres</label>
                      <div>
                        <input type="text" placeholder="Nombres" class="form-control" v-model="formData.Names" style="text-transform:uppercase">
                        <small v-if="formError.Names" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>Primer Apellido</label>
                      <div>
                        <input type="text" placeholder="Primer Apellido" class="form-control" v-model="formData.FirstSurName" style="text-transform:uppercase">
                        <small v-if="formError.FirstSurName" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>Segundo Apellido</label>
                      <div>
                        <input type="text" placeholder="Segundo Apellido" class="form-control" v-model="formData.SecondSurName" style="text-transform:uppercase">
                        <small v-if="formError.SecondSurName" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label><small>¿Usa Segundo Apellido?</small></label>
                      <div>
                        <input type="checkbox" class="el-checkbox__input" style="margin-left: 30px;" v-model="formData.UseSecondSurName">
                      </div>
                    </div>

                  </div>

                  <div class="row">
                    <template v-if="formData.Gender==='F'">
                      <template v-if="formData.UseMariedSurName">
                        <div class="form-group col-md-4">
                          <label>Apellido Casada</label>
                          <div>
                            <input type="text" placeholder="Apellido de Casada" class="form-control" v-model="formData.MariedSurName" style="text-transform:uppercase">
                            <small v-if="formError.MariedSurName" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                          </div>
                        </div>
                      </template>

                      <div class="form-group col-md-4">
                        <label><small>¿Usa Apellido de Casada?</small></label>
                        <div>
                          <input type="checkbox" class="el-checkbox__input" style="margin-left: 30px;" v-model="formData.UseMariedSurName">
                        </div>
                      </div>
                    </template>


                  </div>
                  <div class="row">
                    <div class="form-group col-md-4">
                      <label>Genero</label>
                      <div>
                        <el-select class="select-info"
                                   size="large"
                                   placeholder="Genero"
                                   v-model="formData.Gender">
                          <el-option v-for="option in selectGender.values"
                                     class="select-danger"
                                     :value="option.Id"
                                     :label="option.Name"
                                     :key="option.Id">
                          </el-option>
                        </el-select>
                        <small v-if="formError.Gender" class="form-text text-muted text-danger">*Selecciona un valor.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>Fecha de Nacimiento</label>
                      <div>
                        <datepicker :typeable="false"
                                    :bootstrap-styling="true"
                                    :initialView="initialview"
                                    :format="format" :language="es"
                                    placeholder="Fecha de Nacimiento"
                                    :open-date="opendate"
                                    v-model="formData.BirthDate">
                        </datepicker>
                        <small v-if="formError.BirthDate" class="form-text text-muted text-danger">*Selecciona un valor.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>Nacionalidad</label>
                      <div>
                        <el-select class="select-info"
                                   size="large"
                                   placeholder="Nacionalidad"
                                   v-model="formData.Nationality">
                          <el-option v-for="option in selectNationality.values"
                                     class="select-danger"
                                     :value="option.Id"
                                     :label="option.Name"
                                     :key="option.Id">
                          </el-option>
                        </el-select>
                        <small v-if="formError.Nationality" class="form-text text-muted text-danger">*Selecciona un valor.</small>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-4">
                      <label>AFP</label>
                      <div>
                        <el-select class="select-info"
                                   size="large"
                                   placeholder="AFP"
                                   v-model="formData.AFP">
                          <el-option v-for="option in selectAFP.values"
                                     class="select-danger"
                                     :value="option.Id"
                                     :label="option.Name"
                                     :key="option.Id">
                          </el-option>
                        </el-select>
                        <small v-if="formError.AFP" class="form-text text-muted text-danger">*Selecciona un valor.</small>
                      </div>
                    </div>

                    <div class="form-group col-md-4">
                      <label>NUA</label>
                      <div>
                        <input type="text" placeholder="NUA" class="form-control" v-model="formData.NUA">
                        <small v-if="formError.NUA" class="form-text text-muted text-danger">*Este valor no puede ser vacio.</small>
                      </div>
                    </div>
                  </div>
                <br>
                <div class="row">
                  <div class="el-col-md-offset-7 col-md-5 form-group">
                    <label>Fotocopia Carnet Identidad</label>
                    <label class="btn  btn-file-custom">
                      <i class="fa fa-file-upload" style="font-size: 35px;"></i>
                      <input type="file" id="file" ref="file" style="display: none;" v-on:change="handleFileUpload()"/>
                      <br>
                      {{fileName}}
                    </label>
                    <button v-if="file!==null"
                            class="btn btn-simple btn-sm btn-icon btn-danger"
                            style="margin-bottom: -75px; margin-left: -30px"
                            @click="resetFile()">
                      <i class="fa fa-minus-circle" style="font-size: 30px;"></i>
                    </button>
                    <small v-if="formError.file" class="form-text text-muted text-danger">*Por favor, selecciona un archivo (jpg, png, ó pdf)</small>
                  </div>
                </div>
                <button class="btn btn-success btn-block" @click="send()">Guardar</button>
              </div>
            </div>
        </template>
      </modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'
  import modal from '../../components/UIComponents/CustomModal'
  import swal from 'sweetalert2'


  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true
      },
      document: {
        type: String,
        default: null
      }
    },
    methods: {
      successMessage: function (text) {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!' + text,
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
      close: function () {
        this.$emit('close')
      },
      submitFile: function () {
        let entorno = this
        let formData1 = new FormData()
        formData1.append('file', this.file)
        axios.post('/people/UploadCI/' + this.formData.Id,
          formData1,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function () {
          entorno.$emit('personcreated', entorno.formData.Document)
          entorno.close()
          this.$store.commit('crud/loadSetter', false)
          entorno.successMessage(this.auxTexto)
        }).catch(error => {
          // handle error
          this.$store.commit('crud/loadSetter', false)
          // entorno.errorMessage(error.response.data.Message)
          console.log(error.response.data.Message)
          entorno.close()
          entorno.successMessage(this.auxTexto)
        })
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      valid: function () {
        let x = true

        // this.formError.UseSecondSurName = this.isEmptyBlanckOrNull(this.formData.UseSecondSurName)
        // this.formError.UseMariedSurName = this.isEmptyBlanckOrNull(this.formData.UseMariedSurName)
        // this.formError.CUNI = this.isEmptyBlanckOrNull(this.formData.CUNI)
        // this.formError.file = this.isEmptyBlanckOrNull(this.file) && false
        this.formError.TypeDocument = this.isEmptyBlanckOrNull(this.formData.TypeDocument)
        this.formError.Document = this.isEmptyBlanckOrNull(this.formData.Document)
        // this.formError.Ext = this.isEmptyBlanckOrNull(this.formData.Ext) && this.formData.TypeDocument === 'CI'
        this.formError.FirstSurName = this.isEmptyBlanckOrNull(this.formData.FirstSurName)
        this.formError.SecondSurName = this.isEmptyBlanckOrNull(this.formData.SecondSurName) && this.formData.UseSecondSurName
        this.formError.Names = this.isEmptyBlanckOrNull(this.formData.Names)
        this.formError.MariedSurName = this.isEmptyBlanckOrNull(this.formData.MariedSurName) && this.formData.UseMariedSurName
        this.formError.BirthDate = this.isEmptyBlanckOrNull(this.formData.BirthDate)
        this.formError.Gender = this.isEmptyBlanckOrNull(this.formData.Gender)
        this.formError.Nationality = this.isEmptyBlanckOrNull(this.formData.Nationality)
        // this.formError.NUA = this.isEmptyBlanckOrNull(this.formData.NUA) && false
        // this.formError.AFP = this.isEmptyBlanckOrNull(this.formData.AFP)
        x = !(!x || this.formError.UseSecondSurName ||
          // this.formError.file ||
          this.formError.UseMariedSurName ||
          this.formError.CUNI ||
          this.formError.TypeDocument ||
          this.formError.Document ||
         // this.formError.Ext ||
          this.formError.FirstSurName ||
          this.formError.SecondSurName ||
          this.formError.Names ||
          this.formError.MariedSurName ||
          this.formError.BirthDate ||
          this.formError.Gender ||
          this.formError.Nationality)
         // this.formError.NUA ||
          // this.formError.AFP)
        return x
      },
      send: function () {
        this.$store.commit('crud/loadSetter', true)
        let entorno = this
        this.formData.UseMariedSurName = this.formData.UseMariedSurName ? 1 : 0
        this.formData.UseSecondSurName = this.formData.UseSecondSurName ? 1 : 0
        console.log('Este es people:' + this.formData)
        if (this.valid()) {
          axios.post('/people', this.formData, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              // handle success
              console.log(response.data)
              entorno.formData.Id = response.data.Id
              entorno.formData.CUNI = response.data.CUNI
              entorno.submitFile()
            })
            .catch(error => {
              // handle error
              entorno.errorMessage(error.response.data.Message)
              entorno.$store.commit('crud/loadSetter', false)
            })
        } else {
          entorno.$store.commit('crud/loadSetter', false)
        }
      },
      handleFileUpload () {
        let ext = this.$refs.file.files[0].name.split('.').pop()
        if (ext !== 'png' && ext !== 'jpg' && ext !== 'pdf') {
          this.formError.file = true
        } else {
          this.formError.file = false
          this.file = this.$refs.file.files[0]
        }
      },
      resetFile () {
        this.file = null
        const input = this.$refs.file
        input.type = 'text'
        input.type = 'file'
      }
    },
    computed: {
      fullName: function () {
        let fn = this.formData.Names != null ? this.formData.Names : ''
        if (this.formData.FirstSurName != null) {
          fn += ' ' + this.formData.FirstSurName
        }
        if (this.formData.UseSecondSurName && this.formData.SecondSurName != null) {
          fn += ' ' + this.formData.SecondSurName
        }
        if (this.formData.UseMariedSurName && this.formData.MariedSurName != null) {
          fn += ' ' + this.formData.MariedSurName
        }
        return fn.toUpperCase()
      },
      fileName: {
        get () {
          return this.file === null ? 'No se selecciono ningun archivo' : this.file.name
        }
      }
    },
    data () {
      return {
        auxTexto: '',
        refresh: false,
        en: en,
        es: es,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/people',
        selectLevel: {
          select: '',
          values: []
        },
        formError: {
          UseSecondSurName: false,
          UseMariedSurName: false,
          CUNI: false,
          TypeDocument: false,
          Document: false,
          Ext: false,
          FirstSurName: false,
          SecondSurName: false,
          Names: false,
          MariedSurName: false,
          BirthDate: false,
          Gender: false,
          Nationality: false,
          NUA: false,
          AFP: false,
          file: false
        },
        formData: {
          Id: 0,
          UseSecondSurName: true,
          UseMariedSurName: false,
          CUNI: null,
          TypeDocument: null,
          Document: null,
          Ext: null,
          FirstSurName: null,
          SecondSurName: null,
          Names: null,
          MariedSurName: null,
          BirthDate: null,
          Gender: null,
          Nationality: null,
          NUA: null,
          AFP: null
        },
        selectGender: {
          select: '',
          values: [{Id: 'M', Name: 'Masculino'},
            {Id: 'F', Name: 'Femenino'}]
        },
        selectDocumentType: {
          select: '',
          values: [{Id: 'CI', Name: 'Carnet de Identidad'},
            {Id: 'CE', Name: 'Carnet Extranjero'},
            {Id: 'PA', Name: 'Pasaporte'}]
        },
        selectNationality: {
          select: '',
          values: [{Id: 'NACIONAL', Name: 'Nacional'},
            {Id: 'EXTRANJERO', Name: 'Extranjero'}]
        },
        selectAFP: {
          select: '',
          values: [{Id: 'PREV', Name: 'Prevision'},
            {Id: 'FUT', Name: 'Futuro'}]
        },
        selectIssued: {
          select: '',
          values: [{Id: 'LP', Name: 'La Paz'},
            {Id: 'CB', Name: 'Cochabamba'},
            {Id: 'SC', Name: 'Santa Cruz'},
            {Id: 'CH', Name: 'Chuquisaca'},
            {Id: 'TJ', Name: 'Tarija'},
            {Id: 'OR', Name: 'Oruro'},
            {Id: 'PT', Name: 'Potosi'},
            {Id: 'BN', Name: 'Beni'},
            {Id: 'PA', Name: 'Pando'}
          ]
        },
        file: null
      }
    },
    created () {
      console.log(this.formData.document)
      this.formData.Document = this.document
    },
    components: {
      modal,
      Datepicker,
      swal
    }
  }
</script>

<style scoped>
  .btn-file {
    position: relative;
    overflow: hidden;
  }
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
