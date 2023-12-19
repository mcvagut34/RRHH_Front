<template>
  <div class="row">
    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <div class="col-md-12 card" v-if="actions==='LIST'">
      <div class="col-md-12 padding-0">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC II'}">
          <template slot="buttons" slot-scope="props">
            <!--Botones para modificar o hacer otras acciones-->
            <el-tooltip class="item" effect="dark" content="Historial del docente" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id, props.queriedData[props.index].Profesor)"><i class="fa fa-edit"></i></a>
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
        <TeachRecords :person-id="i" :nombre="teacher"></TeachRecords>
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
        teacher: null,
        actions: 'LIST',
        en: en,
        es: es,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/AsesoriaPostgrado?by=APROBADO',
        propsToSearch: ['Id', 'Proyecto', 'Modulo', 'Profesor', 'Tarea', 'Mes', 'Gestion', 'Origen'],
        tableColumns: [
          {
            prop: 'Id',
            field: 'Id',
            label: '#',
            minWidth: 15
          },
          {
            prop: 'Proyecto',
            field: 'Proyecto',
            label: 'Proyecto',
            minWidth: 20
          },
          {
            prop: 'Modulo',
            field: 'Modulo',
            label: 'Módulo',
            minWidth: 20
          },
          {
            prop: 'Profesor',
            field: 'Profesor',
            label: 'Profesor',
            minWidth: 60
          },
          {
            prop: 'Tarea',
            field: 'Tarea',
            label: 'Tarea',
            minWidth: 20
          },
          {
            prop: 'Mes',
            field: 'Mes',
            label: 'Mes',
            minWidth: 25
          },
          {
            prop: 'Gestion',
            field: 'Gestion',
            label: 'Gestion',
            minWidth: 25
          },
          {
            prop: 'Origen',
            field: 'Origen',
            label: 'Origen',
            minWidth: 25
          },
          {
            prop: 'Dup',
            field: 'Dup',
            label: 'Dup',
            minWidth: 10
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
      Modify (index, prof) {
        console.log(index)
        this.i = index
        this.teacher = prof
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
