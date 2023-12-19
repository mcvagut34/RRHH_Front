<template>
  <div>
    <h5 class="text-center">PASO:1 Identificar Tipo de Archivo.</h5>
    <div class="row">
      <div class="col-md-3 el-col-md-offset-6">
        <div class="form-group">
          <label class="control-label">
            Segmento
          </label>
          <br>
          <el-select class="select-info"
                     size="large"
                     name="segmento"
                     placeholder="Regional"
                     v-model="segmentoOrigen"
                     v-validate="modelValidations.segmento">
            <el-option v-for="option in selectBranches.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
          <small class="text-danger" v-show="segmento.invalid">
            {{ getError('segmento') }}
          </small>
        </div>
      </div>
      <div class="col-md-3">
        <label class="control-label">
          Tipo de Servicio
        </label>
        <br>
        <div class="form-group">
          <el-select class="select-info"
                     name="tipo"
                     v-validate="modelValidations.tipo"
                     size="large"
                     placeholder="Tipo de Archivo"
                     v-model="tipoArchivo">
            <el-option v-for="option in selectMes.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
          <small class="text-danger" v-show="tipo.invalid">
            {{ getError('tipo') }}
          </small>
        </div>
        </div>
    </div>
    <div class="row">
      <div class="col-md-offset-2">
        <div class="form-group" style="width: 50%;margin: 0 auto;">
          <input type="checkbox" id="generateData" v-model="generateData"/>
          <label class="control-label">
            Quiero elegir personas para generar nuevo archivo.
          </label>
        </div>
      </div>
    </div>
    <template v-if="show">
      <br>
      <p align="center">Por favor, seleccione los registros que quiere incluir en el archivo.</p>
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination, fuentePDF: 'SARAI'}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Incluir" placement="top-start">
            <input type="checkbox" :id="props.queriedData[props.index].Id" :value="props.queriedData[props.index].Id" v-model="SelectedIds"/>
          </el-tooltip>
        </template>
      </data-tables>
      <p align="center">
        <button  type="button" class="btn btn-wd btn-fill btn-block btn-success" style="margin: 0 auto" @click="download">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Generar Archivo
          </span>
        </button>
      </p>
      <br>
      <br>
    </template>
  </div>
</template>
<script>
  import {mapFields} from 'vee-validate'
  import axios from 'axios'

  export default {
    computed: {
      ...mapFields(['segmento', 'tipo']),
      segmentoOrigen: {
        get () {
          return this.$store.state.civ.BranchesId
        },
        set (value) {
          this.$store.commit('civ/segmentoSetter', value)
        }
      },
      tipoArchivo: {
        get () {
          return this.$store.state.civ.FileType
        },
        set (value) {
          this.$store.commit('civ/tipoArchivoSetter', value)
        }
      },
      url: {
        get () {
          return '/CivilbyBranch/' + this.segmentoOrigen
        }
      }
    },
    watch: {
      url: function () {
        if (this.generateData) {
          this.generateData = false
          this.$nextTick(() => {
            this.generateData = true
            this.$nextTick(() => {
            })
          })
        }
      },
      generateData: function () {
        if (this.generateData) {
          this.$validator.validate('segmento').then(res => {
            this.generateData = res
            this.show = this.generateData
          })
        } else {
          this.show = this.generateData
        }
      }
    },
    data () {
      return {
        SelectedIds: [],
        propsToSearch: ['Id', 'FullName', 'Category', 'SAPId', 'NIT'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'SAPId',
            label: 'SAPId',
            minWidth: 100
          },
          {
            prop: 'FullName',
            label: 'FullName',
            minWidth: 100
          },
          {
            prop: 'NIT',
            label: 'NIT',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        generateData: false,
        show: false,
        selectBranches: {
          select: '',
          values: []
        },
        selectMes: {
          select: '',
          values: [{Id: 'VARIOS', Name: 'Varios'},
            {Id: 'CARRERA', Name: 'Carrera'},
            {Id: 'PARALELO', Name: 'Paralelo'},
            {Id: 'PROYECTOS', Name: 'Proyectos'}]
        },
        modelValidations: {
          segmento: {
            required: true
          },
          tipo: {
            required: true
          }
        }
      }
    },
    methods: {
      loadBranchData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
          })
          .catch(error => console.log(error))
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$store.commit('civ/uploadedFilesIdSetter', '')
        this.$store.dispatch('civ/uploadedFiles')
        return this.$validator.validateAll()
      },
      download () {
        this.$validator.validate('tipo').then(res => {
          if (res) {
            let data = {
              tipo: this.tipoArchivo,
              list: this.SelectedIds
            }
            axios.post('ServContractgenerateExcel/',
              data,
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
              .catch(error => console.log(error))
          }
        })
      }
    },
    created () {
      this.loadBranchData()
    }
  }
</script>
<style>
</style>
