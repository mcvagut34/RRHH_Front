<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab" ref="wizard"
                       @on-complete="wizardComplete"
                       error-color="#D32F2F"
                       color="#FFA000"
                       title="Distribucion por Centros de Responsabilidad"
                       subtitle="siga los siguientes pasos">
            <tab-content title="CONFIG"
                         :before-change="validateFirstStep"
                         icon="fa fa-cogs">
              <first-step ref="firstStep"></first-step>
            </tab-content>
            <tab-content title="Planilla"
                         icon="fa fa-file-invoice-dollar">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :2 Cargar el Archivo Planilla.</h5>
              <file-uploader :url="payrollUrl" fileType="PLANILLA"></file-uploader>
            </tab-content>
            <tab-content title="Paralelos"
                         :before-change="validateFirstStep"
                         icon="fa fa-chalkboard-teacher">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :3 Cargar el Archivo Paralelo.</h5>
              <file-uploader :url="acadUrl" fileType="PARALELO"></file-uploader>
            </tab-content>
            <tab-content title="Pregrado"
                         :before-change="validateFirstStep"
                         icon="ico-acad">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :4 Cargar el Archivo Pregrado.</h5>
              <file-uploader :url="PreUrl" fileType="PREGRADO"></file-uploader>
            </tab-content>
            <tab-content title="Posgrado"
                         :before-change="validateFirstStep"
                         icon="ico-diploma">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :5 Cargar el Archivo Posgrado.</h5>
              <file-uploader :url="PosUrl" fileType="POSGRADO"></file-uploader>
            </tab-content>
            <tab-content title="Otras Regionales"
                         :before-change="validateFirstStep"
                         icon="fa fa-university">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :6 Cargar el Archivo Otras Regionales.</h5>
              <file-uploader :url="ORUrl" fileType="OTRAS REGIONALES"></file-uploader>
            </tab-content>
            <tab-content title="Descuentos"
                         :before-change="validateFirstStep"
                         icon="ico-tax">
              <h5 class="text-center">{{tittle}}</h5>

              <h5 class="text-center">PASO :7 Cargar el Archivo Descuentos.</h5>
              <file-uploader :url="desUrl" fileType="DESCUENTO"></file-uploader>
            </tab-content>
            <tab-content title="Distribución"
                         icon="ti-check">
              <end-step></end-step>
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
  import EndStep from './Steps/EndStep'
  // import swal from 'sweetalert2'
  import router from 'src/router/index'
  import FileUploader from 'src/components/UIComponents/FileUploader'

  export default {
    computed: {
      mes: {
        get () {
          return this.$store.state.dist.mes
        }
      },
      gestion: {
        get () {
          return this.$store.state.dist.gestion
        }
      },
      regional: {
        get () {
          switch (this.$store.state.dist.segmentoOrigen) {
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
          return this.regional + ' ' + this.mes + '-' + this.gestion
        }
      }
    },
    data () {
      return {
        wizardModel: {},
        payrollUrl: 'Payroll/PayrollExcel',
        acadUrl: 'Payroll/AcademicExcel',
        PreUrl: 'Payroll/pregradoExcel',
        PosUrl: 'Payroll/PostgradoExcel',
        ORUrl: 'Payroll/OrExcel',
        desUrl: 'Payroll/discountExcel',
        disableButton: true
      }
    },
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      EndStep,
      FileUploader
    },
    methods: {
      validateFirstStep () {
        return this.$refs.firstStep.validate()
      },
      wizardComplete () {
        router.go(0)
        router.push('/proceso')
      }
    },
    mounted () {
      // this.$refs.wizard.changeTab(0, 1)
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

