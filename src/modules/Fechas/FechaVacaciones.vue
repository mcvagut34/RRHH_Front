<template>
  <div class="row">
    <div class="col-md-12 card" v-if="action==='LISTADO'">
      <data-tables v-bind="{url, propsToSearch, tableColumns}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="edit(props.queriedData[props.index].CUNI)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-12 card" v-if="action==='EDITAR'">
      <div class="row">
        <div style="margin: 10px" align="right">
          <button class="btn btn-warning btn-fill" @click="volver()">Volver</button>
        </div>
        <div class="form-group el-col-offset-6 col-md-6" align="center">
          <h3>Fechas disponibles {{FullName}}</h3>
          <div>
            <model-select class="select-info"
                          :options="fechas"
                          v-model.lazy="fechaNueva"
                          placeholder="Seleccione la nueva fecha">
            </model-select>
          </div>
          <div style="margin: 10px" align="center">
            <button class="btn btn-success btn-fill" @click="put()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { ModelSelect } from 'vue-search-select'
  import swal from 'sweetalert2'
  export default {
    components: {
      ModelSelect
    },
    data () {
      return {
        FullName: '',
        CUNI: '',
        fechaNueva: '',
        fechas: [],
        action: 'LISTADO',
        url: '/FechasVacacion',
        propsToSearch: ['CUNI', 'FullName', 'StartDate'],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 75
          },
          {
            prop: 'FullName',
            label: 'Nombre',
            minWidth: 290
          },
          {
            prop: 'StartDate',
            label: 'Fecha',
            minWidth: 200
          }
        ]
      }
    },
    methods: {
      edit (i) {
        this.CUNI = i
        console.log('Que ej ejto' + i)
        this.action = 'EDITAR'
        this.GetFullNameByCUNI(i)
        this.getFechasHistoricBy(i)
      },
      getFechasHistoricBy (cuni) {
        let fecha = this.fechas
        console.log('GetFechasByCUNI/' + cuni)
        axios.get('GetFechasByCUNI/' + cuni)
          .then(response => {
            response.data.forEach(function (element) {
              fecha.push({value: element.Id, text: element.StartDate})
            })
          })
          .catch(error => console.log(error))
      },
      GetFullNameByCUNI (cuni) {
        console.log('GetFullNameByCUNI/' + cuni)
        axios.get('GetFullNameByCUNI/' + cuni)
          .then(response => {
            this.FullName = response.data
          })
          .catch(error => console.log(error))
      },
      put () {
        axios.put('UpdateFechaVacacion/' + this.CUNI + '/' + this.fechaNueva)
          .then(response => {
            this.successMessage()
            this.fechas = []
            this.onClose()
            this.action = 'LISTADO'
          })
          .catch(error => {
            this.errorMessage(error.response.data.Message)
          })
      },
      successMessage: function () {
        swal({
          title: `Buen trabajo!`,
          text: 'Se guardaron los cambios!',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          type: 'success'
        })
      },
      onClose () {
        // emit para cerrar el componente
        this.$emit('back')
      },
      volver () {
        // emit para cerrar el componente
        this.action = 'LISTADO'
      }
    }
  }
</script>
<style>
</style>
