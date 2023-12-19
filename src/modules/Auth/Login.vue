<template>
  <div>
    <loading :active.sync="this.$store.state.crud.isLoading"
             :can-cancel="false"
             :is-full-page="true"></loading>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <div class="logo">
            <a class="simple-text logo-mini"
               href="#">
              <div class="logo-img">
                <img class="logo-ucb" :src="logo" alt="">
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <div class="header-text">
                  <div class="logo-img">
                    <img class="logo-sis" :src="logoSis" alt="">
                  </div>
                </div>
                <form @submit.prevent="onSubmit">
                  <div class="card" data-background="color" data-color="green">
                    <div class="card-header">
                      <h3 class="card-title">Bienvenido</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Usuario</label>
                        <input type="email" placeholder="Ingrese email" class="form-control input-no-border" id="email" v-model="email">
                      </div>
                      <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Contraseña" class="form-control input-no-border" id="password" v-model="password">
                      </div>
                      <template v-if="youShallNoPass">
                        <small id="error" class="form-text text-muted text-danger">*Usuario o contraseña invalidos.</small>
                      </template>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd btn-warning ">Ingresar</button>
                      <!--div class="forgot">
                        <router-link to="/register">
                          Forgot your password?
                        </router-link>
                      </div-->
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from 'vue-loading-overlay'
  export default {
    components: {
      Loading
    },
    props: {
      logo: {
        type: String,
        default: 'static/img/logoucb.png'
      },
      logoSis: {
        type: String,
        default: 'static/img/logo2.png'
      }
    },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      youShallNoPass: {
        get () {
          return localStorage.getItem('token') === '401'
        }
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          username: this.email,
          password: this.password
        }
        this.$store.dispatch('auth/login', formData)
      }
    },
    created () {
    }
  }
</script>
<style scoped>
  .logo-ucb{
    width: 200px;
  }
  .logo-sis{
    width: 300px;
    margin-bottom: 10px;
  }
  .full-page:after {
    background: #1c3b6c;
    z-index: 3;
    opacity: 1;
  }
  .header-text {
    text-align: center;
    color: #fdfdfd;
  }
</style>
