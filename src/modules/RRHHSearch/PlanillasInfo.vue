<template>
<div class="col-lg-12 col-md-12 col-sm-12" style="background-color: white">
  <div class="col-lg-12 col-md-12 col-sm-12">
    <h3>Información de planillas</h3>
    <div style="margin: 20px">
      <vue-tabs
        active-tab-color="#1C3B6C"
        active-text-color="#F0A810"
      >
        <v-tab title="Planilla por mes">
          <p>Planilla consolidada a nivel nacional</p>
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
                <label>Gestion</label>
                <div>
                  <input class="form-control"
                         type="text"
                         name="gestion"
                         v-model="gestion"
                  />
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
        <!--
        <v-tab title="Detalle de planilla por persona">
          <div class="col-md-8 el-col-md-offset-4">
            <div class="row">
              <div >
                <model-select class="select-info"
                              :options="teacherArray"
                              v-model.lazy="teacherIdentifier"
                              placeholder="Seleccionar persona"
                              @input="actualCat(teacherIdentifier)"
                >
                </model-select>
              </div>
            </div>
          </div>
        </v-tab>
-->
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
  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=no']}
  Vue.use(VueHtmlToPaper, options)
  export default {
    data () {
      return {
        teacherArray: [],
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
      loadPeople () {
        let persona = this.teacherArray
        axios.get('/Planilla/Personas')
          .then(response => {
            response.data.forEach(function (element) {
              persona.push({value: element.CUNI, text: element.CUNI + '-' + element.FullName})
            })
          })
          .catch(error => console.log(error))
        this.IsFetching = false
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
      check () {
        console.log('Planillas/PlanillasAlMes/' + this.mes + '/' + this.gestion)
        axios.get('Planillas/PlanillasAlMes/' + this.mes + '/' + this.gestion,
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
      checkNovedades () {
        console.log('Planillas/PlanillasAlMes/' + this.mes + '/' + this.gestion)
        axios.get('Planillas/PlanillasAlMes/' + this.mes + '/' + this.gestion,
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
      }
    },
    created () {
      this.loadBranchesData()
      this.loadPeople()
    },
    components: {
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

