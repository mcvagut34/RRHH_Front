<template>
  <div>
    <div class="row">
      <div class="card teacherName col-md-6">
        <p v-if="person!=null" class="mx-auto">Docente: {{nombre}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions: hasActions, tituloPDF: 'Docente: ' + nombre, fuentePDF: 'ISAAC II', sizeTitulo: 12}">
          <template slot="buttons" slot-scope="props">
            <el-tooltip v-if="action==='MODIFY'" class="item" effect="dark" content="Modificar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="$emit('Modify',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
          </template>
        </data-tables>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      },
      nombre: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        url: '/TeacherHistory/' + this.personId,
        propsToSearch: ['Origen', 'Proyecto', 'TipoTarea', 'Modulo', 'Horas', 'MontoHora', 'TotalNeto', 'Deduccion', 'TotalBruto', 'MesLiteral', 'Gestion'],
        tableColumns: [
          {
            prop: 'Origen',
            field: 'Origen',
            label: 'Origen',
            minWidth: 15
          },
          {
            prop: 'Proyecto',
            field: 'Proyecto',
            label: 'Proyecto',
            minWidth: 15
          },
          {
            prop: 'Modulo',
            field: 'Modulo',
            label: 'Módulo',
            minWidth: 15
          },
          {
            prop: 'TipoTarea',
            field: 'TipoTarea',
            label: 'Tipo Tarea',
            minWidth: 20
          },
          {
            prop: 'Horas',
            field: 'Horas',
            label: 'Horas',
            minWidth: 15
          },
          {
            prop: 'MontoHora',
            field: 'MontoHora',
            label: 'Por Hora',
            minWidth: 15
          },
          {
            prop: 'TotalBruto',
            field: 'TotalBruto',
            label: 'Total Bruto',
            minWidth: 20
          },
          {
            prop: 'Deduccion',
            field: 'Deduccion',
            label: 'Deduccion',
            minWidth: 20
          },
          {
            prop: 'TotalNeto',
            field: 'TotalNeto',
            label: 'Total Neto',
            minWidth: 20
          },
          {
            prop: 'Mes',
            field: 'Mes',
            label: 'Mes',
            minWidth: 10
          },
          {
            prop: 'Gestion',
            field: 'Gestion',
            label: 'Gestion',
            minWidth: 15
          }
        ],
        pagination: {
          perPage: 5,
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
        axios.get('/AsesoriaPostgrado/' + this.personId, {
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
