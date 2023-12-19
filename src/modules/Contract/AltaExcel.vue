<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab" ref="wizard"
                       @on-complete="wizardComplete"
                       error-color="#D32F2F"
                       color="#FFA000"
                       title="Alta masiva de personal"
                       subtitle="siga los siguientes pasos">
            <tab-content  title="CONFIG"
                          :before-change="validateFirstStep"
                          icon="fa fa-cogs">
              <first-step ref="firstStep"></first-step>
            </tab-content>
            <tab-content title="Archivo Alta"
                         :before-change="validateSecondStep"
                         icon="fa fa-file-excel">
              <h5 class="text-center">PASO :2 Cargar el Archivo de Altas.</h5>
              <file-uploader ref="fileUploader" :url="AltaExcelUrl" fileType="ALTA"></file-uploader>
            </tab-content>

            <tab-content title="Confirmación de Datos"
                         icon="fa fa-check-circle">
              <editable-table :columns="columns" :rows="rows"></editable-table>
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import EditableTable from '../../components/UIComponents/EditableTable'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FileUploader from 'src/components/UIComponents/FileUploader'
  import router from 'src/router/index'
  import FirstStep from './FirstStep'
  import axios from 'axios'

  export default {
    components: {
      FirstStep,
      EditableTable,
      FormWizard,
      TabContent,
      FileUploader
    },
    data () {
      return {
        valid: true,
        AltaExcelUrl: 'Contract/AltaExcel',
        columns: [
          {
            label: '#',
            field: 'Id',
            size: '3%',
            editable: false
          },
          {
            label: 'CUNI',
            field: 'CUNI',
            size: '8%',
            editable: false
          },
          {
            label: 'Primer Apellido',
            field: 'FirstSurName',
            size: '20%',
            editable: true
          },
          {
            label: 'Segundo Apellido',
            field: 'SecondSurName',
            size: '20%',
            editable: true
          },
          {
            label: 'Apellido Casada',
            field: 'MariedSurName',
            size: '20%',
            editable: true
          },
          {
            label: 'Nombres',
            field: 'Names',
            size: '20%',
            editable: true
          },
          {
            label: 'Documento',
            field: 'Document',
            size: '10%',
            editable: true
          },
          {
            label: 'Ext',
            field: 'Ext',
            size: '3%',
            editable: true
          },
          {
            label: 'Fecha Nacimiento',
            field: 'BirthDate',
            size: '10%',
            editable: true
          },
          {
            label: 'Genero',
            field: 'Gender',
            size: '3%',
            editable: true
          },
          {
            label: 'Dependencia',
            field: 'Dependencia',
            size: '3%',
            editable: true
          },
          {
            label: 'Fecha Inicio',
            field: 'StartDate',
            size: '10%',
            editable: true
          },
          {
            label: 'Fecha Fin',
            field: 'EndDate',
            size: '10%',
            editable: true
          }],
        rows: []
      }
    },
    methods: {
      validateFirstStep () {
        return this.$refs.firstStep.validate()
      },
      populateTable () {
        axios.get('/Contract/AltaExcel/' + this.$store.state.dist.segmentoOrigen)
          .then(response => {
            this.rows = response.data
          })
          .catch(error => console.log(error))
      },
      validateSecondStep () {
        this.populateTable()
        return true
      },
      wizardComplete () {
        // todo fix dates and send rows to end point
        router.push('/proceso')
      }
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
