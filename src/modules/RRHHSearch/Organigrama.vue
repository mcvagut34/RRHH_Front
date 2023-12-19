<template>
<div class="col-lg-12 col-md-12 col-sm-12">
  <div class="col-lg-12 col-md-12 col-sm-12" style="background-color: white">
    <template v-if="actiones ==='inicio'">
      <div class="el-col-offset-4 col-lg-8 col-md-12 col-sm-12" style="background-color: white">
        <h4>Buscar padre de dependencia</h4>
        <form>
          <div class="form-group">
            <label>Dependencia</label>
            <div align="center">
              <el-select filterable
                         class="sele"
                         style="height: 40%; width: 95%;"
                         size="large"
                         v-model="DependenciaModel"
                         placeholder="Seleccione dependencia">
                <el-option v-for="option in DependenciaResponse"
                           class="sele"
                           :value="option.value"
                           :label="option.text"
                           :key="option.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-col-pull-6 col-lg-12 col-md-12 col-sm-12" align="center">
            <button type="button" style="margin-right: 25px; margin-left: 25px" class="btn btn-lg btn-fill btn-success pull-right"
                    @click="searchParent(DependenciaModel)">
            <span class="btn-label ">
              <i class="fa el-icon-search fa-lg" style="color: white"></i>
            </span>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </template>
    <template v-if="actiones ==='organigrama'">
      <div class="col-lg-12 col-md-12 col-sm-12" align="center">
        <button type="button" style="margin-right: 25px; margin-left: 25px" class="btn btn-lg btn-fill btn-warning pull-right"
                @click="volver()">
            <span class="btn-label ">
              <i class="fa fa-angle-double-left fa-lg" style="color: white"></i>
            </span>
          Volver
        </button>
      </div>
      <vo-basic class="orgchart" :data="OrgResponse"></vo-basic>
    </template>
  </div>
</div>
</template>
<script>
  import { VoBasic } from 'vue-orgchart'
  import axios from 'axios'
  export default {
    data () {
      return {
        actiones: 'inicio',
        /* Dependencia */
        DependenciaModel: [],
        DependenciaResponse: [],
        /* JSON par armar parent */
        OrgResponse: '',
        prueba: ''
      }
    },
    methods: {
      loadDependency () {
        let aux = this.DependenciaResponse
        axios.get('BusquedaGrupal/FiltrarDep/')
          .then(response => {
            response.data.forEach(function (element) {
              aux.push({value: element.Id, text: element.Cod + '-' + element.Branch + '-' + element.Name, key: element.Cod + element.Id})
            })
            this.DependenciaResponse = aux
          })
          .catch(error => console.log(error))
      },
      searchParent (idDep) {
        this.actiones = 'organigrama'
        axios.get('Organigrama/' + idDep)
          .then(response => {
            this.OrgResponse = response.data
          })
          .catch(error => console.log(error))
      },
      volver () {
        this.actiones = 'inicio'
        this.fakeLoad()
        location.reload()
      },
      fakeLoad () {
        this.$store.commit('crud/loadSetter', true)
        setTimeout(() => {
          this.$store.commit('crud/loadSetter', false)
        }, 500)
      }
    },
    created () {
      this.fakeLoad()
      this.loadDependency()
      this.chartData = {
        name: name,
        children: [
          { name: 'Angular',
            children: [
              {name: 'Hola'}
            ]}
        ]
      }
    },
    components: {
      VoBasic
    }
  }
</script>
<style>
  #wrapper{width:100%;margin:0 auto}#wrapper li{margin-top:200px}#wrapper a,
#wrapper span{font-size:24px}#chart-container{position:relative;display:inline-block;top:10px;left:10px;
height:100%;width:calc(100% - 24px);border-radius:5px;overflow:auto;overflow-x:hidden;text-align:center;
font-family:Source Sans Pro,Helvetica Neue,Arial,sans-serif;font-size:14px}.orgchart{display:inline-block;
min-height:100%;min-width:100%;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none
;-ms-user-select:none;user-select:none;background-size:100px 100px;border:1px dashed transparent}.orgchart
.hidden,.orgchart~.hidden{display:none}.orgchart div,.orgchart div:after,.orgchart div:before{-webkit-box-sizing:border-box;
box-sizing:border-box}.orgchart.b2t{-webkit-transform:rotate(180deg);transform:rotate(180deg)}
  .orgchart.l2r{-webkit-transform:rotate(-90deg) rotateY(180deg);transform:rotate(-90deg) rotateY(180deg)}
  .orgchart .verticalNodes ul{list-style:none;margin:0;padding-left:180px;text-align:left}
  .orgchart .verticalNodes ul:first-child{margin-top:3px}.orgchart .verticalNodes>td:before{content:"";
border:1px solid rgba(217,83,79,.8)}.orgchart .verticalNodes>td>ul>li:first-child:before{top:-4px;height:300px;width:calc(50% - 2px);
border-width:2px 0 0 2px}.orgchart .verticalNodes ul>li{position:relative}.orgchart .verticalNodes ul>
li:after,.orgchart .verticalNodes ul>li:before{content:"";position:absolute;left:-6px;border-color:rgba(217,83,79,.8);
border-style:solid;border-width:0 0 2px 2px;-webkit-box-sizing:border-box;box-sizing:border-box}.orgchart .verticalNodes ul>
li:before{top:-4px;height:30px;width:11px}.orgchart .verticalNodes ul>li:after{top:1px;height:100%}.orgchart .verticalNodes ul>
li:first-child:after{top:24px;width:11px;border-width:2px 0 0 2px}.orgchart .verticalNodes ul>
li:last-child:after{border-width:2px 0 0}.orgchart.r2l{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.orgchart>
.spinner{font-size:100px;margin-top:30px;color:rgba(68,157,68,.8)}.orgchart table{border-spacing:0;border-collapse:separate}
.orgchart>table:first-child{margin:20px auto}.orgchart td{text-align:center;vertical-align:top;padding:0}.orgchart tr.lines
.topLine{border-top:2px solid #616161}.orgchart tr.lines .rightLine{border-right:1px solid #616161;float:none;border-radius:0}
.orgchart tr.lines .leftLine{border-left:1px solid #616161;float:none;border-radius:0}.orgchart tr.lines
.downLine{background-color:#616161;margin:0 auto;height:20px;width:2px;float:none}.orgchart
.node{display:inline-block;position:relative;margin:3px;padding:3px;border:2px dashed transparent;text-align:center;width:auto;}
  .orgchart.l2r .node,.orgchart.r2l .node{width:400px;height:130px}.orgchart .node>.hazy{opacity:.2}
  .orgchart .node>.spinner{position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);vertical-align:middle;font-size:30px;
    color:rgba(68,157,68,.8)}.orgchart .node:hover{-webkit-transition:.5s;transition:.5s;cursor:default;z-index:1}
  .orgchart .node.focused,.orgchart .node:hover{background-color:rgba(238,217,54,.5)}
  .orgchart .ghost-node{position:fixed;left:-10000px;top:-10000px}.orgchart .ghost-node rect{fill:#fff;stroke:#bf0000}
  .orgchart .node.allowedDrop{border-color:rgba(68,157,68,.9)}
  .orgchart .node .title{text-align:center;font-size:20px;font-weight:300;height:20px;line-height:20px;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap;background-color: #14284b;color: #ffc01f;border-radius:4px 4px 0 0;
    margin: 10px;}
  .orgchart.b2t .node .title{-webkit-transform:rotate(-180deg);transform:rotate(-180deg);-webkit-transform-origin:center bottom;
    transform-origin:center bottom}.orgchart.l2r .node .title{-webkit-transform:rotate(-90deg) translate(-40px,-40px) rotateY(180deg);
transform:rotate(-90deg) translate(-40px,-40px) rotateY(180deg);-webkit-transform-origin:bottom center;transform-origin:bottom center;
width:120px}.orgchart.r2l .node .title{-webkit-transform:rotate(-90deg) translate(-40px,-40px);transform:rotate(-90deg)
  translate(-40px,-40px);-webkit-transform-origin:bottom center;transform-origin:bottom center;width:120px}
  .orgchart .node .title .symbol{float:left;margin-top:4px;margin-left:2px}
  .orgchart .node .content{width:100%;height:200px;font-size:11px;line-height:18px;border:1px solid #14284b;border-radius:0 0 4px 4px;
    text-align:center;background-color: #ffc01f;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .orgchart.b2t .node .content{-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-transform-origin:center top;
    transform-origin:center top}.orgchart.l2r .node .content{-webkit-transform:rotate(-90deg) translate(-40px,-40px) rotateY(180deg);
transform:rotate(-90deg) translate(-40px,-40px) rotateY(180deg);-webkit-transform-origin:top center;transform-origin:top center;
width:120px}.orgchart.r2l .node .content{-webkit-transform:rotate(-90deg) translate(-40px,-40px);transform:rotate(-90deg)
  translate(-40px,-40px);-webkit-transform-origin:top center;transform-origin:top center;width:120px}
  .orgchart .node .edge{font-size:15px;position:absolute;color:rgba(68,157,68,.5);cursor:default;transition:.2s;-webkit-transition:.2s}
  .orgchart.noncollapsable .node .edge{display:none}.orgchart .edge:hover{color:#449d44;cursor:pointer}
  .orgchart .node .verticalEdge{width:calc(100% - 10px);width:-moz-calc(100% - 10px);left:5px}.orgchart .node .topEdge{top:-4px}
  .orgchart .node .bottomEdge{bottom:-4px}
  .orgchart .node .horizontalEdge{width:15px;height:calc(100% - 10px);height:-moz-calc(100% - 10px);top:5px}
  .orgchart .node .rightEdge{right:-4px}.orgchart .node .leftEdge{left:-4px}
  .orgchart .node .horizontalEdge:before{position:absolute;top:calc(50% - 7px);top:-moz-calc(50% - 7px)}
  .orgchart .node .rightEdge:before{right:3px}.orgchart .node .leftEdge:before{left:3px}
  .orgchart .node .toggleBtn{position:absolute;left:5px;bottom:-2px;color:rgba(68,157,68,.6)}
  .orgchart .node .toggleBtn:hover{color:rgba(68,157,68,.8)}.oc-export-btn{display:inline-block;position:absolute;right:5px;
bottom:5px;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;
white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;
-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#fff;background-color:#409eff;
border:1px solid transparent;border-color:#409eff;border-radius:4px}.oc-export-btn:active,.oc-export-btn:focus,
.oc-export-btn:hover{background-color:#409eff;border-color:#409eff}
  .orgchart~.mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:2;text-align:center;background-color:rgba(0,0,0,.3)}
  .orgchart~.mask .spinner{position:absolute;top:calc(50% - 54px);left:calc(50% - 54px);color:hsla(0,0%,100%,.8);font-size:108px}
  .orgchart .node{-webkit-transition:all .3s;transition:all .3s;top:0;left:0}.orgchart .slide-down{opacity:0;top:40px}
  .orgchart.l2r .node.slide-down,.orgchart.r2l .node.slide-down{top:130px}.orgchart .slide-up{opacity:0;top:-40px}
  .orgchart.l2r .node.slide-up,.orgchart.r2l .node.slide-up{top:-130px}.orgchart .slide-right{opacity:0;left:130px}
  .orgchart.l2r .node.slide-right,.orgchart.r2l .node.slide-right{left:40px}.orgchart .slide-left{opacity:0;left:-130px}
  .orgchart.l2r .node.slide-left,.orgchart.r2l .node.slide-left{left:-40px}
  #edit-panel{position:relative;left:10px;width:calc(100% - 40px);border-radius:4px;float:left;margin-top:20px;
    padding:10px 5px 10px 10px;font-size:14px;line-height:1.5;border-radius:2px;color:rgba(0,0,0,.65);background-color:#fff}
  #edit-panel .btn-inputs{font-size:24px}#edit-panel label{font-weight:700}
  #edit-panel .new-node{height:24px;-webkit-appearance:none;background-color:#fff;background-image:none;border-radius:4px;
    line-height:1;border:1px solid #d8dce5;-webkit-box-sizing:border-box;box-sizing:border-box;color:#5a5e66;
    display:inline-block;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s
  cubic-bezier(.645,.045,.355,1)}#edit-panel .new-node:focus{border-color:#409eff;outline:none}
  #edit-panel .new-node:hover{border-color:#b4bccc}#edit-panel.edit-parent-node .selected-node-group{display:none}
  #btn-remove-input,#chart-state-panel,#selected-node{margin-right:20px}#edit-panel button{display:inline-block;padding:6px 12px;
margin-bottom:0;line-height:1.42857143;text-align:center;white-space:nowrap;border-radius:4px;vertical-align:middle;
-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;
-ms-user-select:none;user-select:none;background-image:none}#edit-panel.edit-parent-node button:not(#btn-add-nodes){display:none}
  #edit-panel button:hover,.edit-panel button:active,.edit-panel button:focus{border-color:#409eff;
-webkit-box-shadow:0 0 10px #409eff;box-shadow:0 0 10px #409eff}#new-nodelist{display:inline-block;list-style:none;
margin-top:-2px;padding:0;vertical-align:text-top}
  #new-nodelist>*{padding-bottom:4px}.btn-inputs{vertical-align:sub}.btn-inputs:hover{text-shadow:0 0 4px #fff}
  .radio-panel input[type=radio]{border:1px solid #d8dce5;border-radius:100%;cursor:pointer;-webkit-box-sizing:border-box;
    box-sizing:border-box;display:inline-block;height:14px;width:14px;vertical-align:top}
  #edit-panel.view-state .radio-panel input[type=radio]+label{font-size:14px;font-weight:500;line-height:1}
  #btn-add-nodes{margin-left:20px}
 </style>

