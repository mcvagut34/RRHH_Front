<template>
  <div style="background-color: white">
  <div align="center" class="col-md-8 el-col-sm-offset-4 card" >
    <button type="button" class="btn btn-lg btn-fill" style="background-color: deepskyblue" @click="Imprimir">
            <span class="btn-label ">
              <i class="fa fa-print fa-lg" style="color: white"></i>
            </span>
      Imprimir
    </button>
  </div>
    <div id="printMe" align="center" class="col-md-8 el-col-sm-offset-4 card" >
      <div align="right"><p><font size="1px">Fecha: {{formattedDate}}</font></p></div>
      <div align="right"><p><font size="1px">Fuente: BASE DE DATOS NACIONAL PERSONAS</font></p></div>
    <div class="row">
    <h2>Tarjeta de Funcionario U.C.B.</h2>
    <h3>Datos Personales</h3>
    <div align="center"  v-for="peopleData in persons" :key="'item' + peopleData.id">
      <table style="border: 1px solid black;">
        <tr style="border: 1px solid black;" >
          <td width="33%" colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Tipo Documento:</label>
            {{peopleData.TipoDocumento}}</td>
          <td width="33%" colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"> <label>Numero Documento:</label>
            {{peopleData.Documento}}</td>
          <td width="33%" colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><template v-if="peopleData.TipoDocumento==='CARNET DE IDENTIDAD'">
            <label>Expedido en:</label>
            {{peopleData.Ext}}
          </template></td>
        </tr>
        <tr style="border: 1px solid black;">
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Nombres:</label>
            {{peopleData.Nombres}}</td>
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Primer Apellido:</label>
            {{peopleData.PrimerApellido}}</td>
        </tr>
        <tr style="border: 1px solid black;">
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px">
            <label>Segundo Apellido:</label>
            {{peopleData.SegundoApellido}}
          </td>
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><template v-if="peopleData.Genero==='FEMENINO'">
              <label>Apellido Casada:</label>
              {{peopleData.ApellidoCasada}}
          </template>
          </td>
        </tr>
        <tr style="border: 1px solid black;">
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"> <label>Genero:</label>
            {{peopleData.Genero}}</td>
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Fecha de Nacimiento:</label>
            {{peopleData.FechaNacimiento}}</td>
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Nacionalidad:</label>
            {{peopleData.Nacionalidad}}</td>
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Edad:</label>
            {{peopleData.Edad}}</td>
        </tr>
        <tr style="border: 1px solid black;">
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>AFP:</label>
            {{peopleData.AFP}}</td>
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><label>NUA:</label>
            {{peopleData.NUA}}</td>
          <td colspan="1" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Seguro:</label>
            {{peopleData.Insurance}}</td>
        </tr>
        <tr style="border: 1px solid black;">
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Email institucional:</label>
            {{peopleData.EmailUCB}}</td>
          <td colspan="2" style="border: 1px solid black; padding: 10px; margin: 10px"><label>Email Personal:</label>
            {{peopleData.EmailPersonal}}</td>
        </tr>
      </table>
    </div>
  </div>
    <h3>Trayectoria institucional</h3>
    <div>
      <table style="border: 1px solid black;">
        <tr style="padding: 10px; margin: 10px;">
          <th style="padding: 10px; margin: 10px;">Regional</th>
          <th style="padding: 10px; margin: 10px;">Dependencia</th>
          <th style="padding: 10px; margin: 10px;">Posición</th>
          <th style="padding: 10px; margin: 10px;">Vinculación</th>
          <th style="padding: 10px; margin: 10px;">Dedicación</th>
          <th style="padding: 10px; margin: 10px;">Fecha inicio</th>
          <th style="padding: 10px; margin: 10px;">Fecha fin</th>
        </tr>
        <tr v-for="data in ContractIds" :key="ContractIds.Id" style="border: 1px solid black; padding: 10px; margin: 10px">
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.Regional}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.Dependencia}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.Posicion}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.Vinculacion}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.Dedicacion}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.FechaInicio}}</td>
          <td style="border: 1px solid black; padding: 10px; margin: 10px">{{data.FechaFin}}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import DetailPersonData from '../Employees/DetailPersonData'
  import ContractCard from './ContractCard'
  import VueHtmlToPaper from 'vue-html-to-paper'
  import Vue from 'vue'
  const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=no']}
  Vue.use(VueHtmlToPaper, options)
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      source: {
        type: String,
        default: 'ContractId'
      }
    },
    components: {
      ContractCard,
      DetailPersonData
    },
    data () {
      return {
        show: true,
        loaded: false,
        loadBottomMenu: false,
        persons: [],
        contractDetail: 0,
        ContractIds: [],
        formattedDate: '',
        CurrentDate: ''
      }
    },
    methods: {
      GetContracts () {
        axios.get('/BusquedaGrupal/ContractData/' + this.index + '/' + this.source)
          .then(response => {
            this.ContractIds = response.data
            console.log(response.data)
          })
          .catch(error => console.log(error))
      },
      Imprimir () {
        this.$htmlToPaper('printMe')
      },
      PersonData () {
        axios.get('/BusquedaGrupal/PersonData/' + this.index + '/' + this.source)
          .then(response => {
            this.persons = response.data
          })
          .catch(error => console.log(error))
      },
      date_function () {
        this.formattedDate = this.convert()
      },
      convert () {
        let date = new Date()
        let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        return [day, mnth, date.getFullYear()].join('-')
      }
    },
    mounted () {
      this.date_function()
    },
    created () {
      this.PersonData()
      this.GetContracts()
      this.convert()
    }
  }
</script>

<style scoped>

</style>
