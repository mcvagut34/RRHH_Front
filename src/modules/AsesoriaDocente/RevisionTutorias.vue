<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard
            shape="tab"
            title="Revisión registros Pregrado"
            error-color="#D32F2F"
            color="#FFA000"
            subtitle="Seleccionar el tipo de vinculación"
            @on-change="handleValidation"
          >
            <tab-content title="Verificación Dependientes"
                         icon="fa fa-user-check">
              <!--<FirstStep v-if="actualTab == 0" v-bind:estado="'REGISTRADO'" v-bind:origen="'OR'" v-bind:tipo="'otras regionales'"></FirstStep>-->
              <FirstStep v-if="actualTab == 0" v-bind:estado="'REGISTRADO'" v-bind:origen="'DEP'" v-bind:tipo="'dependientes'"></FirstStep>
            </tab-content>
            <tab-content title="Verificación Independientes"
                         icon="fa fa-user-check">
              <FirstStep v-if="actualTab == 1" v-bind:estado="'REGISTRADO'" v-bind:origen="'INDEP'" v-bind:tipo="'independientes'"></FirstStep>
            </tab-content>
            <tab-content title="Verificación Otras Regionales"
                         icon="fa fa-user-check">
              <FirstStep v-if="actualTab == 2" v-bind:estado="'REGISTRADO'" v-bind:origen="'OR'" v-bind:tipo="'otras regionales'"></FirstStep>
              <!--<FirstStep v-if="actualTab == 2" v-bind:estado="'REGISTRADO'" v-bind:origen="'DEP'" v-bind:tipo="'dependientes'"></FirstStep>-->
            </tab-content>
            <tab-content title="Verificación Servicios con Factura"
                         icon="fa fa-user-check">
              <FirstStep v-if="actualTab == 3" v-bind:estado="'REGISTRADO'" v-bind:origen="'FAC'" v-bind:tipo="'factura'"></FirstStep>
              <!--<FirstStep v-if="actualTab == 2" v-bind:estado="'REGISTRADO'" v-bind:origen="'DEP'" v-bind:tipo="'dependientes'"></FirstStep>-->
            </tab-content>
            <!--
            <tab-content title="Aprobación"
                         icon="fa fa-university">
              <SecondStepAll v-if="actualTab == 3"></SecondStepAll>
            </tab-content>-->

            <button slot="prev" class="btn btn-info btn-fill btn-wd btn-back">Atras</button>
            <button slot="next" style="background-color: rgb(255,160,0); border-color: rgb(255,160,0)" class="btn btn-fill btn-wd btn-next">Siguiente</button>
            <button slot="finish" class="btn btn-warning btn-fill btn-wd" @click="volverAHistorial">Finalizar</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FirstStep from './Steps/AprobacionFirstStepGeneral'
  import SecondStepAll from './Steps/AprobacionSecondStep'
  import router from '../../router'
  export default {
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      SecondStepAll
    },
    data () {
      return {
        // Saber donde nos encontramos es util para renderizar
        // 0->Otras Regionales
        // 1->Independientes
        // 2->Dependientes
        // 3->Pre-Pre-Aprobados
        actualTab: 0
      }
    },
    methods: {
      // actualiza al tab actual
      handleValidation: function (oldTab, nextTab) {
        this.actualTab = nextTab
      },
      volverAHistorial: function () {
        router.push('../' +
          'AsesoriaDocente')
      }
    }
  }
</script>

<style>
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    width: 100%;
    min-width: 100px;
    height: 40px;
    border: none;
    background-color: #1c3b6c;
    color: #fff;
    border-radius: 0;
  }
</style>
