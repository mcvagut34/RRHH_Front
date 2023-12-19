<template>
  <div style="background-color: white" class="col-lg-12 col-md-3 col-sm-12">
   <!-- <template>
      <h3 style="text-align: center; margin: 20px;">Consultas Individuales Dependientes</h3>
    </template>-->
    <div class="row" v-if="actions!=='LIST'">
      <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" style="margin: 20px" @click="Cancel()">
            <span class="btn-label ">
              <i class="fa fa-angle-double-left fa-lg" style="color: white"></i>
            </span>
        Volver
      </button>
    </div>
    <template v-if="actions==='LIST'">
      <div align="center">
        <button type="button" class="palabra2"  @click="Activos()">
            <span class="btn-label">
              <i class="fa fa-user-tie fa-lg"  style="color: white"></i>
            </span>
        Personal Activo
       </button>
       <button type="button" class="palabra1"  @click="Historial()">
            <span class="btn-label">
              <i class="fa fa-user-tie fa-lg" style="color: white"></i>
            </span>
        Personal Historico
        </button>
        <hr style="height:2px;border-width:0;color:gray;background-color:#1c3b6c;margin: 0px;padding: 0px;">
      </div>
      <template v-if="url==='/BusquedaIndividualActivo/'">
      <template>
        <h3 style="text-align: center;">Consulta Individual - Personal Dependiente</h3>
        <h5 style="text-align: center;">Despliega personal con vinculación activa a la fecha</h5>
      </template>
      <div class="container col-md-12">
        <template>
          <div class="row">
            <div class="card">
              <template v-if="actions==='LIST'">
                <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,searchQueryProp: query, tipoExcel}">
                  <template slot="buttons" slot-scope="props">
                    <el-tooltip class="item" effect="dark" :content="ButtonMessage1" placement="top-start">
                      <a class="btn btn-simple btn-xs btn-icon btn-info" @click="DetailContract(props.queriedData[props.index].Id)"><i class="ti-bag" style=""></i></a>
                    </el-tooltip><br>
                    <el-tooltip class="item" effect="dark" :content="ButtonMessage2" placement="top-start">
                      <a class="btn btn-simple btn-xs btn-icon btn-info" @click="DetailPerson(props.queriedData[props.index].Id, 'ContractId')"><i class="fa fa-user-tie" style=""></i></a>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Descargar Ficha" placement="top-start">
                      <a class="btn btn-simple btn-xs btn-icon btn-info" @click="getPersonCard(props.queriedData[props.index].Id, 'ContractId')">
                        <i class="fa fa-id-card" style=""></i>
                      </a>
                    </el-tooltip>
                  </template>
                </data-tables>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
      <template v-if="url==='/BusquedaIndividualHistorico/'">
      <template>
        <h3 style="text-align: center;">Consulta Individual - Personal Dependiente Historico</h3>
        <h5 style="text-align: center;">Despliega personal que tiene o tuvo vinculación con la Universidad</h5>
      </template>
      <div class="row">
        <div class="col-md-12 card" v-if="actions==='LIST'">
          <data-tables :url="url" :propsToSearch="propsToSearch" :tableColumns="tableColumns" :pagination="pagination" :tipoExcel="tipoExcel">
            <template slot="buttons" slot-scope="props">
              <el-tooltip class="item" effect="dark" :content="ButtonMessage1" placement="top-start">
                <a class="btn btn-simple btn-xs btn-icon btn-info" @click="DetailContract(props.queriedData[props.index].Id)"><i class="ti-bag" style=""></i></a>
              </el-tooltip><br>
              <el-tooltip class="item" effect="dark" :content="ButtonMessage2" placement="top-start">
                <a class="btn btn-simple btn-xs btn-icon btn-info" @click="DetailPerson(props.queriedData[props.index].Id, 'ContractId')"><i class="fa fa-user-tie" style=""></i></a>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Descargar Ficha" placement="top-start">
                <a class="btn btn-simple btn-xs btn-icon btn-info" @click="getPersonCard(props.queriedData[props.index].Id, 'ContractId')">
                  <i class="fa fa-id-card" style=""></i>
                </a>
              </el-tooltip>
            </template>
          </data-tables>
        </div>
      </div>
    </template>
    </template>
    <template v-if="actions==='DETAILCONTRACT'">
      <DetailEmpleado :action="action" :index="i" source="Contract"></DetailEmpleado>
    </template>
    <template v-if="actions==='DETAILPERSON'">
      <br>
      <DetailPersonData v-if="action==='DATOSPERSONA'" :index="i" source="Contract"></DetailPersonData>
    </template>
    <template v-if="actions==='MODIFY'">
      <div class=" col-md-12 card">
               <DetailEmpleado :index="i" action="SEARCH"></DetailEmpleado>
      </div>
    </template>
    <template v-if="actions==='PERSONCARDPDF'">
      <div id="pm">
        <FichaPersona :action="action" :index="i" :source="fuente"></FichaPersona>
      </div>
    </template>
    <!--
    <div v-if="imprimo==='Si'">
      <el-tooltip class="item" effect="dark" content="Descargar Ficha" placement="top-start">
        <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Imprimir">
          <i class="fa fa-id-card" style=""></i>
        </a>
      </el-tooltip>
      <div id="printMe">
        <FichaPersona :action="action" :index="i" :source="fuente"></FichaPersona>
      </div>
    </div>-->
    <template v-if="actions==='DETAILPERSONHISTORIC'">
      <br>
      <DetailPersonData v-if="action==='DATOSPERSONA'"  :index="i"></DetailPersonData>
    </template>
  </div>
</template>
<script>

  import DetailEmpleado from '../Employees/DetailEmpleado'
  import Loading from 'vue-loading-overlay'
  import DetailPersonData from '../Employees/DetailPersonData'
  import ContractCard from '../RRHHSearch/ContractCard'
  import VueHtmlToPaper from 'vue-html-to-paper'
  import Vue from 'vue'
  import FichaPersona from './FichaPersona'
  import axios from 'axios'
  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=no']}
  Vue.use(VueHtmlToPaper, options)
  export default {
    data: function () {
      return {
        colorActive: 'color: #1c3b6c',
        colorHistoric: 'color: #ffc01f',
        ButtonMessage1: 'Ver trayectoria institucional',
        ButtonMessage2: 'Ver datos personales',
        insearch: false,
        showMenuAlta: false,
        showMenuBaja: false,
        showMenuMod: false,
        action: 'SEARCH',
        query: '',
        tab: '',
        imprimo: 'No',
        ContractIds: '',
        persons: '',
        // data table
        i: null,
        fuente: '',
        actions: 'LIST',
        url: '/BusquedaIndividualActivo/',
        tipoExcel: 'esp',
        propsToSearch: ['Nombre', 'CUNI', 'Documento', 'Dependencia', 'Regional', 'Cargo', 'Vinculacion'],
        tableColumns: [
          {
            prop: 'CUNI',
            field: 'CUNI',
            label: 'CUNI',
            minWidth: 80
          },
          {
            prop: 'Documento',
            field: 'Documento',
            label: 'Documento',
            minWidth: 80
          },
          {
            prop: 'Nombre',
            field: 'Nombre',
            label: 'Nombre Completo',
            minWidth: 150
          },
          {
            prop: 'Cargo',
            field: 'Cargo',
            label: 'Cargo',
            minWidth: 150
          },
          {
            prop: 'Vinculacion',
            field: 'Vinculacion',
            label: 'Vinculación',
            minWidth: 90
          },
          {
            prop: 'Dependencia',
            label: 'Dependencia',
            minWidth: 150
          },
          {
            prop: 'Regional',
            field: 'Regional',
            label: 'Sede',
            minWidth: 50
          },
          {
            prop: 'Status',
            field: 'Status',
            label: 'Estado',
            minWidth: 80
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    methods: {
      Modify (index) {
        console.log('Modify ' + index)
        this.i = index
        this.actions = 'MODIFY'
      },
      DetailPerson (index, sour) {
        this.fakeLoad()
        this.i = index
        this.fuente = sour
        this.actions = 'DETAILPERSON'
        this.action = 'DATOSPERSONA'
        console.log('Si funciona' + this.i + '/' + this.fuente)
      },
      DetailContract (index) {
        this.fakeLoad()
        console.log('DetailContract: ' + index)
        this.i = index
        this.actions = 'DETAILCONTRACT'
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      },
      getPersonCard (index, sour) {
        this.fakeLoad()
        this.i = index
        this.fuente = sour
        this.actions = 'PERSONCARDPDF'
        console.log('Si funciona' + this.i + '/' + this.fuente)
      },
      DatosPersona () {
        this.fakeLoad()
        this.insearch = false
        this.action = 'DATOSPERSONA'
        this.actions = 'LIST'
        this.ButtonMessage = 'Ver detalle persona'
      },
      Cancel () {
        this.insearch = true
        this.actions = 'LIST'
        this.ButtonMessage = 'Ver detalle'
      },
      Back () {
        this.actions = 'LIST'
      },
      Activos () {
        this.url = '/BusquedaIndividualActivo/'
        document.getElementsByClassName('palabra1')[0].style.backgroundColor = '#14284b'
        document.getElementsByClassName('palabra2')[0].style.backgroundColor = '#ffd224'
      },
      Historial () {
        this.url = '/BusquedaIndividualHistorico/'
        document.getElementsByClassName('palabra1')[0].style.backgroundColor = '#ffd224'
        document.getElementsByClassName('palabra2')[0].style.backgroundColor = '#14284b'
      },
      PersonData (index, source) {
        axios.get('/BusquedaGrupal/PersonData/' + index + '/' + source)
          .then(response => {
            this.persons = response.data
          })
          .catch(error => console.log(error))
      },
      imprimir (index, source) {
        axios.get('/BusquedaGrupal/PersonData/' + index + '/' + source)
          .then(response => {
            this.persons = response.data
            console.log('Person' + response)
          })
          .catch(error => console.log(error))
        axios.get('/BusquedaGrupal/ContractData/' + index + '/' + source)
          .then(response => {
            this.ContractIds = response.data
            console.log('Contrato' + response)
          })
          .catch(error => console.log(error))
      },
      sleep (milliseconds) {
        var start = new Date().getTime()
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds) {
            break
          }
        }
      },
      funct () {
        console.log('Holi')
        this.sleep(10000)
        this.$htmlToPaper('printMe')
      }
    },
    components: {
      FichaPersona,
      ContractCard,
      DetailPersonData,
      DetailEmpleado,
      Loading
    }
    /*,
    mounted () {
      this.$refs.searchbox.focus()
      this.$refs.searchbox.focus()
    }
    */
  }
</script>
<style scoped>
  .printing {
    font-family: sans-serif;
    max-width: 600px;
    border: solid 1px #ccc;
    text-align: center;
    padding: 1em;
    margin: 2em auto;
  }
  .menu {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    color: #212529;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    list-style: none;
    margin: .125rem 0 0;
    padding: .5rem 0;
    position: absolute;
    text-align: left;

  //margin-left: 14px;
    margin-top: -11px;
    margin-bottom: -120px;
    width: 100%;
    z-index: 1;

  }
  .menu-item {
    color: #212529;
    padding: .25rem 1.5rem;
    z-index: 1; position:relative;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .menu-item:hover {
    background-color: #cec2bc;
    cursor: pointer;
  }
  .navbar-nav {
    width: 100%;
    text-align: center;
  }
  .navbar-nav>li {
    float: initial;
  }
  .nav>li {
    display:inline-block;
  }
  span {
    font-weight: bold;
    color: #229954;
    font-size: 1.25rem;
  }
  .form-control:focus {
    border-color: #5d69ff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 20px rgb(77, 108, 255);
  }
  .palabra1 {
    color: #ffffff;
    background-color: #14284b;
    border-radius: 0px;
    stop-color: #1c3b6c;
    border-right-color: #1c3b6c;
    border-left-color: #1c3b6c;
    border-top-color: #1c3b6c;
    border-bottom: #FFFFFF;
    padding: 0px;
    font-family: 'Muli', "Helvetica", Arial, sans-serif;
    font-size: 20px;
    margin: 0px;
    width: 250px;
    height: 50px;
  }
  .palabra2 {
    color: #ffffff;
    background-color: #ffc01f;
    border-radius: 0px;
    stop-color: #1c3b6c;
    border-right-color: #1c3b6c;
    border-left-color: #1c3b6c;
    border-top-color: #1c3b6c;
    border-bottom: #FFFFFF;
    padding: 0px;
    font-family: 'Muli', "Helvetica", Arial, sans-serif;
    font-size: 20px;
    margin: 0px;
    width: 250px;
    height: 50px;
  }
  /*
  .button:hover{background-color: #1c3b6c;
    color: #ffd224;}
  .button:focus{background-color:#1c3b6c;
    color: #ffd224;}
  .button:active{background-color:#1c3b6c;
    color: #ffd224;}
*/
</style>

