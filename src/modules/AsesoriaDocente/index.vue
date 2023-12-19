<template>
  <div class="row">
    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <div class="col-md-12 card" v-if="actions==='LIST'">
      <div class="col-md-12 padding-0">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC'}">
          <template slot="buttons" slot-scope="props">
            <!--Botones para modificar o hacer otras acciones-->
            <el-tooltip class="item" effect="dark" content="Historial del docente" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
          </template>
        </data-tables>
      </div>
    </div>

    <!--Se carga el componente de tutorias del docente-->
    <template v-if="actions==='MODIFY'">
      <div class=" col-md-12 card">
        <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Back">
            <span class="btn-label">
              <i class="fa fa-angle-double-left"></i>
              Volver
            </span>
        </button>
        <TeachRecords :person-id="i"></TeachRecords>
      </div>
    </template>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'
  import TeachRecords from './TeachingList'
  import { mapState } from 'vuex'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'

  export default {
    components: {
      TeachRecords,
      Datepicker
    },
    computed: {
      ...mapState({
        tableData: state => state.crud.data
      })
    },
    data () {
      return {
        i: null,
        actions: 'LIST',
        en: en,
        es: es,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/AsesoriaDocente?by=APROBADO',
        propsToSearch: ['Acta', 'Carrera', 'Profesor', 'Estudiante', 'Tarea', 'Mes', 'Origen', 'Gestion'],
        tableColumns: [
          {
            prop: 'Origen',
            field: 'Origen',
            label: 'Origen',
            minWidth: 20
          },
          {
            prop: 'Acta',
            field: 'Acta',
            label: 'Acta',
            minWidth: 25
          },
          {
            prop: 'Carrera',
            field: 'Carrera',
            label: 'Carrera',
            minWidth: 25
          },
          {
            prop: 'Profesor',
            field: 'Profesor',
            label: 'Profesor',
            minWidth: 90
          },
          {
            prop: 'Estudiante',
            field: 'Estudiante',
            label: 'Estudiante',
            minWidth: 90
          },
          {
            prop: 'Tarea',
            field: 'Tarea',
            label: 'Tarea',
            minWidth: 15
          },
          {
            prop: 'Gestion',
            field: 'Gestion',
            label: 'Gestion',
            minWidth: 20
          },
          {
            prop: 'Mes',
            field: 'Mes',
            label: 'Mes',
            minWidth: 15
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 20, 50],
          total: 0
        },
        create: false
      }
    },
    methods: {
      GetPdfBody () {
        var pdf = []
        var data = this.tableData
        for (let i = 0; i < data.length; i++) {
          pdf.push(Object.values(data[i]))
        }
        console.log(pdf)
        return pdf
      },
      Modify (index) {
        console.log(index)
        this.i = index
        this.actions = 'MODIFY'
      },
      Back () {
        this.actions = 'LIST'
      },
      getPDF () {
        const doc = new jsPDF('landscape')
        // Or use javascript directly:
        doc.autoTable({
          head: [this.propsToSearch],
          body: this.GetPdfBody()
            // ...
        })

        doc.save('table.pdf')
      }
    },
    created () {
    }
  }
</script>
<style>
  .padding-0{
    padding-right:0;
    padding-left:0;
  }
</style>
