<template>
  <div>
    <div v-if="acc==='NORMAL'">
      <br>
      <button v-if="action==='BAJA'" class="btn btn-danger pull-right" @click="$emit('Remove','ALL')">Baja</button>
      <br>
      <el-tooltip class="item" effect="dark" content="Esta persona tiene registros sólo para listado o sólo para Salomon" placement="top-start">
        <button v-if="special==='SI'" class="btn btn-danger pull-left" @click="change">Caso Especial</button></el-tooltip>
      <br>
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions: hasActions}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip v-if="action==='MODIFY'" class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="$emit('Modify',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip v-if="action==='BAJA'" class="item" effect="dark" content="Baja" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-danger" @click="$emit('Remove',props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div v-show="acc==='ESPECIAL'">
        <button v-if="special==='SI'" class="btn btn-success pull-left" @click="volver">Volver</button>
      <vue-tabs
        active-tab-color="#1C3B6C"
        active-text-color="#F0A810"
      >
        <v-tab title="Registros para Listado">
          <el-table class="table-striped"
                    :data="listado"
                    border
                    style="width: 100%">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :formatter="cellValueRenderer"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
          </el-table>
        </v-tab>
        <v-tab title="Registros para Salomón">
          <el-table class="table-striped"
                    :data="salomon"
                    border
                    style="width: 100%">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :formatter="cellValueRenderer"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
          </el-table>
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import 'vue-nav-tabs/themes/vue-tabs.css'
  export default {
    props: {
      personId: {
        type: Number,
        required: true
      },
      action: {
        type: String,
        required: true
      }
    },
    computed: {
      hasActions: {
        get () {
          return this.action === 'MODIFY' || this.action === 'BAJA'
        }
      }
    },
    methods: {
      getSpecial () {
        axios.get('/getSpecialCases/' + this.personId)
          .then(response => {
            this.special = response.data
            if (this.special === 'SI') {
              this.getListado()
              this.getSalomon()
            }
          })
          .catch(error => console.log(error))
      },
      getListado () {
        axios.get(this.url1)
          .then(response => {
            this.listado = response.data
          })
          .catch(error => console.log(error))
      },
      getSalomon () {
        axios.get(this.url2)
          .then(response => {
            this.salomon = response.data
          })
          .catch(error => console.log(error))
      },
      change () {
        this.acc = 'ESPECIAL'
        this.url = '/people/GetContractsListado/' + this.personId
      },
      volver () {
        this.acc = 'NORMAL'
        this.url = '/people/Contracts/' + this.personId
      }
    },
    data () {
      return {
        acc: 'NORMAL',
        listado: [],
        salomon: [],
        url: '/people/Contracts/' + this.personId,
        url1: '/people/GetContractsListado/' + this.personId,
        url2: '/people/GetContractsSalomon/' + this.personId,
        propsToSearch: ['Cod', 'Dependency', 'Branches', 'Positions', 'PositionDescription', 'Link', 'Dedication', 'StartDatestr', 'EndDatestr'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 80
          },
          {
            prop: 'Cod',
            label: 'Dep',
            minWidth: 50
          },
          {
            prop: 'Dependency',
            label: 'Dependencia',
            minWidth: 200
          },
          {
            prop: 'OU',
            label: 'Unid. Org.',
            minWidth: 200
          },
          {
            prop: 'Branches',
            label: 'Sede',
            minWidth: 80
          },
          {
            prop: 'Positions',
            label: 'Nivel',
            minWidth: 150
          },
          {
            prop: 'PositionDescription',
            label: 'Cargo',
            minWidth: 150
          },
          {
            prop: 'Link',
            label: 'Vinculación',
            minWidth: 120
          },
          {
            prop: 'Dedication',
            label: 'Ded.',
            minWidth: 50
          },
          {
            prop: 'StartDatestr',
            label: 'Desde',
            minWidth: 110
          },
          {
            prop: 'EndDatestr',
            label: 'Hasta',
            minWidth: 110
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        }
      }
    },
    created () {
      this.getSpecial()
    },
    components: {
      VueTabs,
      VTab
    }
  }
</script>

<style scoped>

</style>
