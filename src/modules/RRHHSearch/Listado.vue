<template>
<div class="col-lg-12 col-md-12 col-sm-12" style="background-color: white">
  <div class="col-lg-12 col-md-12 col-sm-12">
    <h3>Listados de personal</h3>
    <div style="margin: 20px">
      <vue-tabs
        active-tab-color="#1C3B6C"
        active-text-color="#F0A810"
      >
        <v-tab title="Listado Personal Activo al Mes">
          <p>El mismo se descargará en un archivo Excel</p>
          <div class="col-md-6 el-col-md-offset-6">
            <div class="form-group">
              <label>Seleccionar Sede</label><font color="red">*</font>
              <div align="center">
                <el-select multiple
                           name="regional1"
                           filterable
                           size="large"
                           class="sele"
                           style="height: 40%; width: 95%;"
                           v-model="RegionalModel"
                           placeholder="Seleccione sede">
                  <el-option v-for="option in RegionalResponse"
                             class="sele"
                             :value="option.value"
                             :label="option.text"
                             :key="option.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 el-col-md-offset-1">
                <label>Mes</label><font color="red">*</font>
                <div>
                  <el-select class="select-info"
                             name="mes"
                             size="large"
                             style="height: 40%; width: 95%;"
                             placeholder="Mes"
                             v-model="mes">
                    <el-option v-for="option in selectMes.values"
                               :value="option.value"
                               :label="option.text"
                               :key="option.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="col-md-6">
                <label>Gestion</label><font color="red">*</font>
                <div>
                  <input class="form-control"
                         type="text"
                         name="gestion"
                         v-model="gestion"
                  />
                </div>
              </div>
            </div>
            <div class="row" style="margin: 20px;">
            <div>
              <div class="col-md-6">
                <h5>Columnas disponibles</h5>
                <draggable class="list-group" :list="list1" group="people" @change="log">
                  <div
                    class="list-group-item"
                    v-for="(element, index) in list1"
                    :key="element.name"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
              </div>
            </div>
            <div>
              <div class="col-md-6">
                <h5>Columnas en el reporte</h5>
                <draggable class="list-group" :list="list2" group="people" @change="log">
                  <div
                    class="list-group-item"
                    v-for="(element, index) in list2"
                    :key="element.name"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
              </div>
            </div>
            </div>

            <div class="row" align="center" style="margin: 15px">
              <button type="button" class="btn btn-lg btn-fill btn-warning"
                      @click="check">
              <span class="btn-label ">
              <i class="fa el-icon-search fa-lg" style="color: white"></i>
            </span>
                Buscar
              </button>
            </div>
          </div>
        </v-tab>

        <v-tab title="Comparativo ABM mes anterior">
          <p>El mismo se descargará en un archivo Excel</p>
          <div class="col-md-6 el-col-md-offset-6">
            <div class="row">
              <div class="col-md-5 el-col-md-offset-1">
                <label>Mes</label>
                <div>
                  <el-select class="select-info"
                             name="mes"
                             size="large"
                             style="height: 40%; width: 95%;"
                             placeholder="Mes"
                             v-model="mes1">
                    <el-option v-for="option in selectMes.values"
                               :value="option.value"
                               :label="option.text"
                               :key="option.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="col-md-6">
                <label>Gestion</label>
                <div>
                  <input class="form-control"
                         type="text"
                         name="gestion"
                         v-model="gestion1"
                  />
                </div>
              </div>
            </div>
            <div class="row" align="center" style="margin: 15px">
              <button type="button" class="btn btn-lg btn-fill btn-warning"
                      @click="checkNovedades">
              <span class="btn-label ">
              <i class="fa el-icon-search fa-lg" style="color: white"></i>
            </span>
                Buscar
              </button>
            </div>
          </div>
        </v-tab>

        <v-tab title="Cantidad de personal por mes">
          <p>El resultado se mostrará en la tabla</p>
          <div class="col-md-6 el-col-md-offset-6">
            <div class="row">
              <div class="col-md-5 el-col-md-offset-1">
                <label>Mes</label>
                <div>
                  <el-select class="select-info"
                             name="mes"
                             size="large"
                             style="height: 40%; width: 95%;"
                             placeholder="Mes"
                             v-model="mes2">
                    <el-option v-for="option in selectMes.values"
                               :value="option.value"
                               :label="option.text"
                               :key="option.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="col-md-6">
                <label>Gestion</label>
                <div>
                  <input class="form-control"
                         type="text"
                         name="gestion"
                         v-model="gestion2"
                  />
                </div>
              </div>
            </div>
            <div class="row" align="center" style="margin: 15px">
              <button type="button" class="btn btn-lg btn-fill btn-warning"
                      @click="checkCantidad">
              <span class="btn-label ">
              <i class="fa el-icon-search fa-lg" style="color: white"></i>
            </span>
                Buscar
              </button>
            </div>
          </div>

          <div class="card-content table-responsive table-full-width col-md-6 el-col-md-offset-6">
            <el-table class="table-striped" :data="responseCant">
              <el-table-column label="Sede" property="SEDE"></el-table-column>
              <el-table-column label="Cantidad Total" property="TOTAL"></el-table-column>
            </el-table>
          </div>
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</div>
</template>
<script>
  import axios from 'axios'
  import { ModelSelect } from 'vue-search-select'
  import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
  import Datepicker from 'vuejs-datepicker'
  import Loading from 'vue-loading-overlay'
  import VueHtmlToPaper from 'vue-html-to-paper'
  import Vue from 'vue'
  import swal from 'sweetalert2'
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import 'vue-nav-tabs/themes/vue-tabs.css'
  import draggable from 'vuedraggable'
  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=no']}
  Vue.use(VueHtmlToPaper, options)
  export default {
    data () {
      return {
        list1: [
          { name: 'PRIMER_APELLIDO' },
          { name: 'SEGUNDO_APELLIDO' },
          { name: 'NOMBRES' },
          { name: 'APELLIDO_CASADA' },
          { name: 'COD_UO' },
          { name: 'UNIDAD_ORGANIZACIONAL' },
          { name: 'TIPO_DOCUMENTO' },
          { name: 'EXTENSION' }
        ],
        list2: [
          { name: 'DOCUMENTO' },
          { name: 'NOMBRE_COMPLETO' },
          { name: 'CUNI' },
          { name: 'COD_DEPENDENCIA' },
          { name: 'DEPENDENCIA' },
          { name: 'SEDE' },
          { name: 'POSICION' },
          { name: 'DEDICACION' },
          { name: 'VINCULACION' },
          { name: 'FECHA_INICIO' },
          { name: 'FECHA_FIN' },
          { name: 'FECHA_NACIMIENTO' },
          { name: 'EDAD' },
          { name: 'GENERO' },
          { name: 'EMAIL_INSTITUCIONAL' },
          { name: 'INTERINATO' },
          { name: 'DESCRIPCION_DEL_CARGO' },
          { name: 'TELEFONO' }
        ],
        responseCant: [],
        RegionalModel: [],
        mes: null,
        segmento: null,
        gestion: null,
        mes1: null,
        gestion1: null,
        mes2: null,
        gestion2: null,
        RegionalResponse: [],
        selectMes: {
          values: [{value: '01', text: 'Enero'},
            {value: '02', text: 'Febrero'},
            {value: '03', text: 'Marzo'},
            {value: '04', text: 'Abril'},
            {value: '05', text: 'Mayo'},
            {value: '06', text: 'Junio'},
            {value: '07', text: 'Julio'},
            {value: '08', text: 'Agosto'},
            {value: '09', text: 'Septiembre'},
            {value: '10', text: 'Octubre'},
            {value: '11', text: 'Noviembre'},
            {value: '12', text: 'Diciembre'}]
        }
      }
    },
    methods: {
      add: function () {
        this.list.push({ name: 'Juan' })
      },
      replace: function () {
        this.list = [{ name: 'Edgard' }]
      },
      clone: function (el) {
        return {
          name: el.name + ' cloned'
        }
      },
      log: function (evt) {
        window.console.log(evt)
      },
      loadBranchesData () {
        let aux = this.RegionalResponse
        axios.get('branches/')
          .then(response => {
            response.data.forEach(function (element) {
              aux.push({value: element.Id, text: element.Name})
            })
            this.RegionalResponse = aux
          })
          .catch(error => console.log(error))
      },
      checkCantidad () {
        this.fakeLoad()
        axios.get('/Listados/CantPersonal/' + this.mes2 + '/' + this.gestion2)
          .then(response => {
            this.responseCant = response.data
          })
          .catch(error => console.log(error))
      },
      convertJSON (json) {
        var result = []

        for (var i in json) { result.push([json[i].name]) }

        return result
      },
      check () {
        if (!this.validCheck()) {
          console.log('Listados/PersonalAtDate/' + this.RegionalModel + '/' + this.gestion + '-' + this.mes + '-' + '28/' + this.convertJSON(this.list2))
          axios.get('Listados/PersonalAtDate/' + this.RegionalModel + '/' + this.gestion + '-' + this.mes + '-' + '28/' + this.convertJSON(this.list2),
            {
              responseType: 'arraybuffer',
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          )
            .then(response => {
              const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              })
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              var filename = response.request.getResponseHeader('Content-Disposition')
              link.setAttribute('download', filename.split('filename=')[1])
              document.body.appendChild(link)
              link.click()
              // location.reload()
            })
            .catch(error => {
              const blob = new Blob([error.response.data], {type: 'text/plain'})
              const reader = new FileReader()
              let text
              reader.addEventListener('loadend', (e) => {
                text = e.srcElement.result
                console.log(text)
                swal({
                  title: `Ups!`,
                  text: text,
                  buttonsStyling: false,
                  confirmButtonClass: 'btn btn-success btn-fill',
                  type: 'warning'
                })
              })
              reader.readAsText(blob)
            })
        } else {
          this.errorMessage('Por favor, ingrese los datos requeridos.')
        }
      },
      checkNovedades () {
        console.log('Listados/Novedades/' + this.mes1 + '/' + this.gestion1)
        axios.get('Listados/Novedades/' + this.mes1 + '/' + this.gestion1,
          {
            responseType: 'arraybuffer',
            headers: {
              'token': localStorage.getItem('token')
            }
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
          })
          .catch(error => {
            const blob = new Blob([error.response.data], {type: 'text/plain'})
            const reader = new FileReader()
            let text
            reader.addEventListener('loadend', (e) => {
              text = e.srcElement.result
              console.log(text)
              swal({
                title: `Ups!`,
                text: text,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill',
                type: 'warning'
              })
            })
            reader.readAsText(blob)
          })
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      },
      validCheck () {
        console.log('datos' + this.isEmptyBlanckOrNull(this.convertJSON(this.list2)) + ',' + this.isEmptyBlanckOrNull(this.RegionalModel) + ',' + this.isEmptyBlanckOrNull(this.mes) + ',' + this.isEmptyBlanckOrNull(this.gestion))
        console.log((this.isEmptyBlanckOrNull(this.convertJSON(this.list2)) || this.isEmptyBlanckOrNull(this.RegionalModel) || this.isEmptyBlanckOrNull(this.mes) || this.isEmptyBlanckOrNull(this.gestion)))
        if ((this.isEmptyBlanckOrNull(this.convertJSON(this.list2)) || this.isEmptyBlanckOrNull(this.RegionalModel) || this.isEmptyBlanckOrNull(this.mes) || this.isEmptyBlanckOrNull(this.gestion)) === false) {
          return false
        } else {
          return true
        }
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      errorMessage: function (text) {
        swal({
          title: `Ups!`,
          text: text,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'error'
        })
      }
    },
    created () {
      this.loadBranchesData()
    },
    components: {
      draggable,
      VueTabs,
      VTab,
      ModelSelect,
      Datepicker,
      [DatePicker.name]: DatePicker,
      [TimeSelect.name]: TimeSelect,
      [Slider.name]: Slider,
      [Tag.name]: Tag,
      [Input.name]: Input,
      [Button.name]: Button,
      [Option.name]: Option,
      [Select.name]: Select,
      Loading
    }
  }
</script>
<style>
  .sele.el-select .el-input .el-input__suffix{
    display:flex;
    align-items:center
  }
  .sele.el-select .el-input:hover .el-input__icon,
  .sele.el-select .el-input:hover
  input{color:#fff}
  .sele.el-select .el-input:hover .el-input__icon::placeholder,
  .sele.el-select .el-input:hover input::placeholder{color:#fff}
  .sele.el-select .el-input:hover
  .el-input__icon,.sele.el-select .el-input:hover input{background-color: #ffffff
  }
  .sele.el-select .el-input .el-input__icon{border-radius:20px;height:40px}
  .sele.el-select .el-input input{
    background-color:#fff;
    border-color: #1c3b6c
    !important;border-width:2px;border-radius:10px;
    color: #1c3b6c
  }
  .sele.el-select .el-input .el-input__icon
  {color: #1c3b6c
  }
  .sele .el-tag,
  .sele .el-tag.el-tag--info
  {line-height:24px;background-color: #1c3b6c !important;border:none!important}
  .sele .el-tag.el-tag--info .el-tag__close,
  .sele .el-tag .el-tag__close
  {width:20px;height:20px;top:1px;color:#fff;background-color:transparent}
  .sele .el-tag.el-tag--info .el-tag__close:hover,
  .sele
  .el-tag .el-tag__close:hover{background-color:#fff}
</style>

