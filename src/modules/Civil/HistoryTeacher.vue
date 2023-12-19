<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h5>Docente: {{personId}} - {{personName}}</h5>
          </div>
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions: hasActions,  tituloPDF: 'Docente: ' + personName, fuentePDF: 'SARAI', sizeTitulo: 12}">
          <template slot="buttons" slot-scope="props">
            <el-tooltip v-if="action==='MODIFY'" class="item" effect="dark" content="Modificar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="$emit('Modify',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
          </template>
        </data-tables>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      personId: {
        type: String,
        required: true
      },
      personName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        url: '/ServContract/HistoryBP/' + this.personId,
        propsToSearch: ['Serv_ProcessId', 'Branch', 'FileType', 'SAPId'],
        tableColumns: [
          {
            prop: 'Serv_ProcessId',
            label: '# Proceso',
            minWidth: 35
          },
          /*
          {
            prop: 'CardCode',
            label: 'Código',
            minWidth: 40
          },
          {
            prop: 'CardName',
            label: 'Nombre',
            minWidth: 100
          }, */
          {
            prop: 'ServiceName',
            label: 'Servicio',
            minWidth: 80
          },
          {
            prop: 'ContractAmount',
            label: 'Monto Bruto',
            minWidth: 40
          },
          {
            prop: 'IUE',
            label: 'IUE',
            minWidth: 30
          },
          {
            prop: 'IT',
            label: 'IT',
            minWidth: 30
          },
          {
            prop: 'TotalAmount',
            label: 'Monto Neto',
            minWidth: 40
          },
          {
            prop: 'Branch',
            label: 'Regional',
            minWidth: 30
          },
          {
            prop: 'FileType',
            label: 'Tipo Archivo',
            minWidth: 50
          },
          {
            prop: 'SAPId',
            label: '# Comprobante',
            minWidth: 50
          },
          {
            prop: 'InSAPAt',
            label: 'Fecha Contabilización',
            minWidth: 60
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        person: null,
        loaded: false
      }
    },
    methods: {
      loadTeacher () {
        console.log('Si si es este /AsesoriaDocente/' + this.personId)
        axios.get('/AsesoriaDocente/' + this.personId, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.person = response.data
            console.log(this.person)
          })
          .catch(error => console.log(error))
      }
    },
    computed: {
      hasActions: {
        get () {
          return this.action === 'MODIFY' || this.action === 'BAJA'
        }
      }
    },
    created () {
      this.loadTeacher()
    }
  }
</script>

<style scoped>
  .teacherName {
    font-weight: bold;
    font-size: 20px;
  }
</style>
