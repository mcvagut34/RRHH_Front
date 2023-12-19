<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab" ref="wizard"
                       @on-complete="wizardComplete"
                       error-color="#D32F2F"
                       color="#FFA000"
                       title="Registro Lotes de pago"
                       subtitle="Actividades Académicas efectuadas por Independientes">
            <tab-content title="CONFIG"
                         :before-change="validateFirstStep"
                         icon="fa fa-cogs">
              <first-step ref="firstStep"></first-step>
            </tab-content>
            <tab-content title="Cargar archivo"
                         :before-change="validateSecondStep"
                         icon="fa fa-file-invoice-dollar">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :2 Cargar el Archivo Excel.</h5>
              <file-uploader v-if="firstStep" :url="uploadUrl" :fileType="tipoArchivo" @uploaded="uploadChanged"></file-uploader>
            </tab-content>

            <tab-content title="Comprobación"
                         icon="ti-check">
              <BeforeEndStep v-if="fileUploaded"></BeforeEndStep>
            </tab-content>

            <tab-content title="Confirmación"
                         icon="ti-check">
              <EndStep v-if="fileUploaded" :ToAprove="ToAprove"></EndStep>
            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Atras</button>
            <button slot="next" class="btn btn-info btn-fill btn-wd btn-next">Siguiente</button>
            <button slot="finish" class="btn btn-warning btn-fill btn-wd">Finalizar</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FirstStep from './Steps/FirstStep.vue'
  import BeforeEndStep from './Steps/BeforeEndStep'
  import EndStep from './Steps/EndStep'
  import FileUploader from './CustomFileUploader'
  import router from 'src/router/index'


  export default {
    computed: {
      tipoArchivo: {
        get () {
          return this.$store.state.civ.FileType
        }
      },
      regional: {
        get () {
          switch (this.$store.state.civ.BranchesId) {
            case 2:
              return 'TARIJA'
            case 3:
              return 'COCHABAMBA'
            case 6:
              return 'UNIDAD CENTRAL'
            case 16:
              return 'SANTA CRUZ'
            case 17:
              return 'LA PAZ'
            case 18:
              return 'EPC'
            case 22:
              return 'TEOLOGIA'
            default:
              return ''
          }
        }
      },
      tittle: {
        get () {
          return this.regional + ' - ' + this.tipoArchivo
        }
      }
    },
    methods: {
      validateFirstStep () {
        this.firstStep = this.$refs.firstStep.validate()
        return this.firstStep
      },
      validateSecondStep () {
        this.fileUploaded = this.$store.state.civ.uploadedFiles.array.includes(this.$store.state.civ.FileType)
        return this.fileUploaded
      },
      uploadChanged (value) {
        this.fileUploaded = value
        return value
      },
      wizardComplete () {
        router.go(0)
        router.push('/proceso')
      }
    },
    data () {
      return {
        ToAprove: false,
        fileUploaded: false,
        firstStep: false,
        wizardModel: {},
        uploadUrl: 'ServContract/UploadFile',
        disableButton: true
      }
    },
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      BeforeEndStep,
      EndStep,
      FileUploader
    }
  }
</script>
<style>
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    width: 100%;
    min-width: 100px;
    height: 40px;
    border: none;
    background-color: #1c3b6c;
    color: #fff;
    border-radius: 0;
  }
  .stepTitle{
    color: #1c3b6c;
  }
</style>
