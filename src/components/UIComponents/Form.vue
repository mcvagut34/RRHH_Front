<template>
  <div class="card">
    <form @submit.prevent="create">
      <div class="card-header">
        <template v-if="tittle===null">
          <h4 v-if="!this.$store.state.crud.edit" class="card-title">
            Crear
          </h4>
          <h4 v-else class="card-title">
            Modificar
          </h4>
        </template>
        <template v-else>
          <h4 class="card-title">
            {{tittle}}
          </h4>
        </template>
      </div>
      <div class="card-content">
        <slot></slot>
        <button type="submit" class="btn btn-fill btn-info">Enviar</button>
        <button v-if="this.$store.state.crud.edit" type="cancel" class="btn btn-fill btn-danger" @click.prevent="cancel">Cancelar</button>
      </div>
    </form>
  </div> <!-- end card -->
</template>

<script>
  import swal from 'sweetalert2'
  export default {
    props: {
      url: {
        type: String,
        required: true
      },
      formData: {
        type: Object,
        required: true
      },
      valid: {
        type: Boolean,
        default: true
      },
      refresh: {
        type: Boolean,
        default: true
      },
      alert: {
        type: Boolean,
        default: false
      },
      tittle: {
        type: String,
        default: null
      }
    },
    methods: {
      create () {
        if (!this.$store.state.crud.edit) {
          this.$emit('validate')
          if (this.alert) {
            swal({
              title: '¿Estas Seguro?',
              text: 'Se dará de baja a esta persona',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, dar de baja!',
              cancelButtonText: 'No, cancelar',
              confirmButtonClass: 'btn btn-success btn-fill',
              cancelButtonClass: 'btn btn-danger btn-fill',
              buttonsStyling: false
            })
              .then((willDelete) => {
                setTimeout(() => {
                  if (this.valid) {
                    this.$store.dispatch('crud/create', this.url, this.refresh)
                  }
                }, 10)
              })
          } else {
            setTimeout(() => {
              if (this.valid) {
                this.$store.dispatch('crud/create', this.url, this.refresh)
              }
            }, 10)
          }
        } else {
          this.$store.dispatch('crud/update', this.url)
        }
      },
      cancel () {
        this.$store.commit('crud/formDataCleaner')
        this.$store.commit('crud/editSetter', false)
      }
    },
    mounted () {
      this.$store.commit('crud/formDataSetter', this.formData)
    }
  }
</script>

<style>

</style>
