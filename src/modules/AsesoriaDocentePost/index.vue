<template>
  <div class="row">
    <!--Lista de todas las tutorias, recibe todos los parámetros para el datatable-->
    <div class="col-md-12 card" v-if="actions==='LIST'">
      <div class="col-md-12 padding-0">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'ISAAC II'}">
          <template slot="buttons" slot-scope="props">
            <!--Botones para modificar o hacer otras acciones-->
            <el-tooltip class="item" effect="dark" content="Modificar Módulo" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eliminar" placement="top">
              <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="removeAccess(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
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
        <div class=" col-md-12 card">
          <EditModule :module-id="i" :action="'PUT'" v-on:back="Back"></EditModule>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'
  import EditModule from './ABM/RegistroModulos'
  import { mapState } from 'vuex'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import axios from 'axios'
  import swal from 'sweetalert2'
  export default {
    components: {
      EditModule,
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
        url: '/ProjectModules',
        propsToSearch: ['Cod_Proyecto', 'Nombre_Proyecto', 'Cod_Modulo', 'Nombre_Modulo', 'Docente'],
        tableColumns: [
          {
            prop: 'Cod_Proyecto',
            field: 'Cod_Proyecto',
            label: 'Código Proyecto',
            minWidth: 25
          },
          {
            prop: 'Nombre_Proyecto',
            field: 'Nombre_Proyecto',
            label: 'Nombre Proyecto Abr',
            minWidth: 80
          },
          {
            prop: 'Cod_Modulo',
            field: 'Cod_Modulo',
            label: 'Código Módulo',
            minWidth: 25
          },
          {
            prop: 'Nombre_Modulo',
            field: 'Nombre_Modulo',
            label: 'Nombre Módulo',
            minWidth: 90
          },
          {
            prop: 'Docente',
            field: 'Docente',
            label: 'Docente',
            minWidth: 90
          },
          {
            prop: 'Horas',
            field: 'Horas',
            label: 'Horas',
            minWidth: 20
          },
          {
            prop: 'MontoHora',
            field: 'MontoHora',
            label: 'Monto Hora',
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
      removeAccess (index) {
        swal({
          title: 'Estas Seguro?',
          text: 'No será posible volver atras!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          axios.delete('DeleteModule/' + index)
            .then(response => {
              swal({
                title: 'Eliminado!',
                text: 'Se elimino de forma correcta',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              }).then(function () {
                // la página se recarga con frescura :v
                location.reload()
              })
            })
            .catch(error => swal({
              title: 'No se pudo eliminar el registro',
              text: error.response.data.Message,
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            }))
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'Este item está a salvo :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      },
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
