<template>
  <div class="user">
    <div class="photo">
      <img :src="heOrShe" >
      <!--img src="static/img/faces/face-2.png"/-->
    </div>
    <div class="info" style="font-size: 14px; padding-left: 55px">
      <router-link :to="{ }" v-html="name"></router-link>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import axios from 'axios'
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true,
        name: null,
        posts: [],
        error: [],
        heOrShe: 'static/img/faces/face-M.jpg'
      }
    },
    methods: {
      loadData () {
        axios.get('user/' + localStorage.getItem('userId'))
          .then(response => {
            this.name = response.data.Name
            var nth = 0
            this.name = this.name.replace(/ /g, function (match, i, original) {
              nth++
              return (nth === 2) ? '<br>' : match
            })
            this.heOrShe = response.data.Gender === 'M' ? 'static/img/faces/face-M.jpg' : 'static/img/faces/face-F.jpg'
          })
          .catch(error => {
            console.log(error)
            this.name = 'error de conexion con el Servidor'
          })
      }
    },
    created () {
      this.loadData()
      let isMinimized = localStorage.getItem('isMinimized')
      if (isMinimized !== undefined && isMinimized === 'true') {
        this.sidebarStore.toggleMinimize()
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
