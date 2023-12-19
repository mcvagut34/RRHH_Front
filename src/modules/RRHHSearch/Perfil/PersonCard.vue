<template>
  <div class="card card-user">
    <div class="image" style="background-color: #1c3b6c">
      <img src="static/img/background.jpg" alt="..." style="
    overflow: hidden;
    max-width: 180px;
    max-height: 150px;
    margin: auto;
    display: block;
    margin:auto;">
    </div>
    <div class="card-content">
      <div class="author">
        <img class="avatar border-white" :src="heOrShe" alt="...">
        <h4 class="title"> {{person.FullName}}
          <br>
          <a href="#">
            <small>CUNI: {{person.CUNI}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        {{whoIs}}
        <br/>
        {{person.Branches}}
      </p>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div v-for="(info) in details" class="col-md-6">
          <h5>
            <div style="font-size: 90%;">{{info.title}}</div>
            <small>{{info.subTitle}}</small>
          </h5>
        </div>
      </div>
      <font size="1">*Correspondiente a última asignación</font>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      person: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      heOrShe: function () {
        return this.person.Gender === 'M' ? 'static/img/faces/face-M.jpg' : 'static/img/faces/face-F.jpg'
      },
      whoIs: function () {
        return this.person.Contract ? this.person.Positions + ' en ' + this.person.Dependency : 'Inactivo'
      },
      details: {
        get () {
          return [
            {
              title: this.person.StartDatestr,
              subTitle: 'Desde*'
            },
            {
              title: this.person.EndDatestr,
              subTitle: 'Hasta*'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
