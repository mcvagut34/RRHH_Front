<template>
  <div class="container col-md-12">
    <nav class="navbar navbar-default" style="margin-top: -30px; margin-bottom: 60px">
      <div class="container-fluid" >
        <ul class="nav navbar-nav" style="height: 50px">
          <li @click="showMenuAlta = !showMenuAlta" @mouseover="showMenuAlta=true" @mouseleave="showMenuAlta=false" class="active navbar-left">
            <a style="margin-top: 0px; margin-bottom: 0px; padding-bottom: 0px; padding-top: 0px;">
              <h4 style="margin-top: 10px;">
                Alta de <br>Personal
                <span class="btn-label">
                  <i class="fa fa-caret-down text-primary fa-2x"></i>
                </span>
              </h4>
            </a>

            <div v-if='showMenuAlta' class='menu'>
              <div class='menu-item' @click="AltaIndividual()">Alta Individual</div>
              <div class='menu-item' @click="AltaGrupal()">Alta Grupal</div>
            </div>
          </li>

          <li @click="showMenuBaja = !showMenuBaja" @mouseover="showMenuBaja=true" @mouseleave="showMenuBaja=false" class="active navbar-center">
            <a style="margin-top: 0px; margin-bottom: 0px; padding-bottom: 0px; padding-top: 0px;">
              <h4 style="margin-top: 10px;">
              Baja de <br>Personal
                <span class="btn-label">
                  <i class="fa fa-caret-down text-primary fa-2x"></i>
                </span>
              </h4>
            </a>
            <div v-if='showMenuBaja' class='menu'>
              <div class='menu-item' @click="BajaIndividual()">Baja Individual</div>
              <div class='menu-item' @click="BajaGrupal()">Bajas Pendientes</div>
            </div>
          </li>

          <li @click="showMenuMod = !showMenuMod" @mouseover="showMenuMod=true" @mouseleave="showMenuMod=false" class="active navbar-right">
            <a style="margin-top: 0px; margin-bottom: 0px; padding-bottom: 0px; padding-top: 0px;">
              <h4 style="margin-top: 10px;">
              Modificaciones <br> de Personal
                <span class="btn-label">
                  <i class="fa fa-caret-down text-primary fa-2x"></i>
                </span>
              </h4>
            </a>
            <div v-if='showMenuMod' class='menu'>
              <div class='menu-item' @click="DatosPersona()">Cambio Datos Personales</div>
              <div class='menu-item' @click="Movilidad()">Movilidad Organizacional</div>
              <div class='menu-item' @click="ModifyContract()">Gestión Puestos Actuales</div>
            </div>
          </li>

        </ul>
      </div>

    </nav>


    <template v-if="action==='SEARCH'">
      <h2 style="text-align: center;">Consultas Personal Activo</h2>
    </template>
    <template v-if="action==='ALTAINDIVIDUAL'">
      <h2 style="text-align: center;">Alta Individual</h2>
    </template>
    <template v-if="action==='ALTAGRUPAL'">
      <h2 style="text-align: center;">Alta Grupal</h2>
    </template>

    <template v-if="action==='ALTA'">
      <h2 style="text-align: center;">Movilidad Organizacional</h2>
    </template>

    <template v-if="action==='MODIFY'">
      <h2 style="text-align: center;">Gestion de Puestos Actuales</h2>
    </template>

    <template v-if="action==='DATOSPERSONA'">
      <h2 style="text-align: center;">Cambio Datos Personales</h2>
    </template>

    <template v-if="action==='BAJA'">
      <h2 style="text-align: center;">Baja Individual</h2>
    </template>

    <!-- ++++++++++++++++++++++++++++++++     BAJAGRUPAL     +++++++++++++++++++++++++++++++++++++++++-->
    <template v-if="actions==='BAJAGRUPAL'">
      <h2 style="text-align: center;">Bajas Pendientes</h2>
    </template>


    <template v-if="!insearch">
      <div class="form-group">

        <div style="text-align: center" ><h3>Buscar Persona <small> [Puede buscar por nombre, carnet, CUNI, Etc.]</small></h3></div>
        <br/>
        <br/>
        <br/>
        <div class="row">
          <div class="col-md-offset-2 col-md-7">
            <input @keyup.enter="insearch = query!==''" type="text" class="form-control"
                   style="border-right: none; border-top-left-radius: 50px; border-bottom-left-radius: 50px; border-width: 3px; border-color: #1c3b6c"
                   placeholder="Buscar..."
                   autofocus
                   ref="searchbox"
                   v-model="query"
            >
          </div>
          <div class="col-md-2">
            <button class="btn btn-success btn-fill btn-block" style="margin-left: -60px; border-width: 4px;" @click="insearch = query!=''">
              <span class="btn-label">
                <i class="fa fa-search"></i>
              </span>
            </button>
          </div>
        </div>


      </div>
    </template>
    <template v-else>
      <div class="row">
        <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Cancel()">
            <span class="btn-label ">
              <i class="fa fa-angle-double-left fa-lg" style="color: white"></i>
            </span>
          Volver
        </button>
      </div>
      <div class="row">

        <div class="card">
          <!-- ++++++++++++++++++++++++++++++++     ALTAINDIVIDUAL     +++++++++++++++++++++++++++++++++++++++++-->

          <template v-if="actions==='ALTAINDIVIDUAL'">
            <Alta></Alta>
          </template>

          <!-- ++++++++++++++++++++++++++++++++     ALTAGRUPAL     +++++++++++++++++++++++++++++++++++++++++-->

          <template v-if="actions==='ALTAGRUPAL'">
            <AltaGrupal></AltaGrupal>
          </template>

          <!-- ++++++++++++++++++++++++++++++++     BAJAGRUPAL     +++++++++++++++++++++++++++++++++++++++++-->
          <template v-if="actions==='BAJAGRUPAL'">
            <BajaGrupal></BajaGrupal>
          </template>
          <!-- ++++++++++++++++++++++++++++++++     LIST     +++++++++++++++++++++++++++++++++++++++++-->

          <template v-if="actions==='LIST'">

            <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,searchQueryProp: query}">
              <template slot="buttons" slot-scope="props">
                <el-tooltip class="item" effect="dark" :content="ButtonMessage" placement="top-start">
                  <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Detail(props.queriedData[props.index].Id)"><i class="fa fa-angle-double-right fa-2x" style=""></i></a>
                </el-tooltip>
              </template>
            </data-tables>
          </template>
          <!-- ++++++++++++++++++++++++++++++++     DETAIL     +++++++++++++++++++++++++++++++++++++++++-->

          <template v-if="actions==='DETAIL'">
          <br>
          <DetailPersonData v-if="action==='DATOSPERSONA'" :index="i" source="Contract"></DetailPersonData>
          <DetailEmpleado v-else :action="action" :index="i" source="Contract"></DetailEmpleado>
        </template>

          <!-- ++++++++++++++++++++++++++++++++     CREATE     +++++++++++++++++++++++++++++++++++++++++-->
          <template v-if="actions==='CREATE'">
            <alta  v-on:Back="Back"></alta>
          </template>
        </div>


      </div>
    </template>
  </div>
</template>

<script>
  import swal from 'sweetalert2'
  import Alta from './Alta'
  import AltaGrupal from './AltaGrupal/AltaGrupal'
  import Baja from './Baja'
  import BajaGrupal from './AltaGrupal/ConfirmacionBajaGrupal'
  import DetailEmpleado from '../Employees/DetailEmpleado'
  import Loading from 'vue-loading-overlay'
  import DetailPersonData from '../Employees/DetailPersonData'

  export default {
    data: function () {
      return {
        ButtonMessage: 'Ver detalle',
        insearch: false,
        showMenuAlta: false,
        showMenuBaja: false,
        showMenuMod: false,
        action: 'SEARCH',
        query: '',
        // data table
        i: null,
        actions: 'LIST',
        url: '/Contract/',
        propsToSearch: ['FullName', 'CUNI', 'Document', 'Dependency', 'Branches', 'Positions', 'Linkage'],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 120
          },
          {
            prop: 'Document',
            label: 'Documento',
            minWidth: 100
          },
          {
            prop: 'FullName',
            label: 'Nombre Completo',
            minWidth: 250
          },
          /* {
            prop: 'DependencyCod',
            label: 'Cod. Dependecia',
            minWidth: 100
          }, */
          {
            prop: 'Positions',
            label: 'Cargo',
            minWidth: 150
          },
          {
            prop: 'Linkage',
            label: 'Vinculacion',
            minWidth: 100
          },
          {
            prop: 'Dependency',
            label: 'Dependencia',
            minWidth: 250
          },
          {
            prop: 'Branches',
            label: 'Regional',
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
      Detail (index) {
        this.i = index
        this.actions = 'DETAIL'
      },
      Remove (index) {
        swal({
          title: '¿Estas Seguro?',
          text: 'Se dará de baja a esta persona',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, dar de baja!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        })
          .then((willDelete) => {
            if (willDelete) {
              this.i = index
              this.actions = 'REMOVE'
            } else {
              this.actions = 'LIST'
            }
          })
      },
      Create () {
        this.actions = 'CREATE'
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      },
      AltaIndividual () {
        this.fakeLoad()
        this.insearch = true
        this.action = 'ALTAINDIVIDUAL'
        this.actions = 'ALTAINDIVIDUAL'
      },
      AltaGrupal () {
        this.fakeLoad()
        this.insearch = true
        this.action = 'ALTAGRUPAL'
        this.actions = 'ALTAGRUPAL'
      },
      Movilidad () {
        this.fakeLoad()
        this.insearch = false
        // this.action = 'MODIFY'
        this.action = 'ALTA'
        this.actions = 'LIST'
        this.ButtonMessage = 'Movidilad'
      },
      ModifyContract () {
        this.fakeLoad()
        this.insearch = false
        this.action = 'MODIFY'
        this.actions = 'LIST'
        this.ButtonMessage = 'Movilidad'
      },
      BajaIndividual () {
        this.fakeLoad()
        this.insearch = false
        this.action = 'BAJA'
        this.actions = 'LIST'
        this.ButtonMessage = 'Dar de Baja'
      },
      BajaGrupal () {
        this.fakeLoad()
        this.insearch = true
        this.action = 'BAJAGRUPAL'
        this.actions = 'BAJAGRUPAL'
        console.log(this.actions)
      },
      DatosPersona () {
        this.fakeLoad()
        this.insearch = false
        this.action = 'DATOSPERSONA'
        this.actions = 'LIST'
        this.ButtonMessage = 'Ver detalle persona'
      },
      Cancel () {
        this.insearch = false
        this.action = 'SEARCH' // this.action === 'ALTAINDIVIDUAL' ? '' : this.action
        this.actions = 'LIST'
        this.ButtonMessage = 'Ver detalle'
      }
    },
    components: {
      DetailPersonData,
      DetailEmpleado,
      Baja,
      BajaGrupal,
      Alta,
      AltaGrupal,
      Loading
    },
    mounted () {
      this.$refs.searchbox.focus()
      this.$refs.searchbox.focus()
    }
  }
</script>

<style scoped>

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

</style>
