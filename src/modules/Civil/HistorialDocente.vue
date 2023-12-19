<template>
  <div class="row">
    <template v-if="Historial==='NOINFO'">
      <div class="col-md-12 card">
        <div class="panel-body">
          <data-tables :url="url" :propsToSearch="propsToSearch" :tableColumns="tableColumns" :pagination="pagination" :fuente-p-d-f="fuente">
            <template slot="buttons" slot-scope="props">
              <el-tooltip class="item" effect="dark" :content="ButtonMessage1" placement="top-start">
                <a class="btn btn-simple btn-xs btn-icon btn-info" @click="DetailDocente(props.queriedData[props.index].CardCode, props.queriedData[props.index].CardName)"><i class="ti-bag" style=""></i></a>
              </el-tooltip>
            </template>
          </data-tables>
        </div>
      </div>
    </template>
    <!--Crear un componente para esta parte como el TeachingList de ISAAC-->
    <template v-if="Historial==='INFO'">
      <div class="col-md-12 card">
        <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Back">
            <span class="btn-label">
              <i class="fa fa-angle-double-left"></i>
              Volver
            </span>
        </button>
        <HistoryTeacher :person-id="i" :person-name="name"></HistoryTeacher>
      </div>
    </template>
    </div>
</template>
<script>
  import HistoryTeacher from './HistoryTeacher'
  export default {
    components: {HistoryTeacher},
    computed: {
    },
    data () {
      return {
        fuente: 'SARAI',
        Historial: 'NOINFO',
        url: '/ServContract/HistoryBP',
        propsToSearch: ['CardCode', 'CardName', 'ServiceName', 'FileType', 'SAPId'],
        tableColumns: [
          {
            prop: 'CardCode',
            label: 'Código',
            minWidth: 25
          },
          {
            prop: 'CardName',
            label: 'Nombre',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 15, 20],
          total: 0
        },
        ButtonMessage1: 'Revisar Historial',
        i: '',
        name: ''
      }
    },
    methods: {
      Back () {
        this.Historial = 'NOINFO'
      },
      DetailDocente (BP, BPName) {
        this.Historial = 'INFO'
        this.i = BP
        this.name = BPName
      }
    }
  }
</script>
<style>
</style>
