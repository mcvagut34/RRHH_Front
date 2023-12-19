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
          <a>
            <small>CUNI: {{person.CUNI}}</small>
          </a><br>
          <a>
            <small>CI: {{person.Document}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        {{this.cargo.PositionDescription}}
        <br/>
        {{person.Branches}}
      </p>
    </div>
    <hr>
    <div class="text-center">
      <div class="row">
        <div v-for="inf in aux" class="col-md-12">
          <h5>
            <div style="font-size: 90%;">{{inf.StartDateStr}}</div>
            <small>Fecha de Ingreso</small>
          </h5>
        </div>
      </div>
      <div class="row">
        <div v-for="inf in ant" class="col-md-12">
          <h5>
            <div style="font-size: 90%;">{{inf.Años+' años, '+ inf.Meses+' meses, '+ inf.Dias+' días.'}}</div>
            <small>Antiguedad a la fecha</small>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  export default {
    props: {
      person: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        aux: [],
        ant: [],
        cargo: ''
      }
    },
    methods: {
      getFechaIngreso () {
        axios.get('people/FechaIngreso/' + this.person.Id)
          .then(response => {
            this.aux = response.data
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      getAntiguedadAtDate () {
        axios.get('people/AntiguedadAtDate/' + this.person.Id)
          .then(response => {
            this.ant = response.data
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      },
      getCargoActual () {
        axios.get('people/Cargo/' + this.person.Id)
          .then(response => {
            this.cargo = response.data
          })
          .catch(error => console.log(error))
        this.IsFetching = false
      }
    },
    computed: {
      heOrShe: function () {
        return this.person.Gender === 'M' ? 'static/img/faces/face-M.jpg' : 'static/img/faces/face-F.jpg'
      },
      whoIs: function () {
        return this.person.Contract ? this.person.PositionDescription + ' en ' + this.person.Dependency : 'Inactivo'
      },
      details: {
        get () {
          return [
            {
              title: this.person.StartDatestr,
              subTitle: 'Desde'
            },
            {
              title: this.person.EndDatestr,
              subTitle: 'Hasta'
            }
          ]
        }
      }
    },
    created () {
      this.getCargoActual()
      this.getFechaIngreso()
      this.getAntiguedadAtDate()
    }
  }
</script>

<style scoped>

</style>
