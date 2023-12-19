import axios from 'axios/index'
import swal from 'sweetalert2'

const loadData = ({ commit }, url) => {
  commit('loadSetter', true)
  axios.get(url, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      commit('loadSetter', false)
      if (response.data === '') { response.data = [] }
      commit('dataSetter', response.data)
    })
    .catch(error => {
      console.log(error)
      commit('loadSetter', false)
    })
}

const find = ({ commit }, formData) => {
  axios.get(formData.url + '/' + formData.id, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      commit('formDataSetter', response.data)
    })
    .catch(error => console.log(error))
}

const create = ({ dispatch, commit, state }, url) => {
  commit('loadSetter', true)
  axios.post(url, state.formData, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      commit('loadSetter', false)
      swal({
        title: `Buen trabajo!`,
        text: 'se creo el elemento con exito!',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-fill',
        type: 'success'
      })
      dispatch('loadData', url)
      commit('formDataCleaner')
    })
    .catch(error => {
      commit('loadSetter', false)
      console.log(error)
    })
}

const update = ({ dispatch, commit, state }, url) => {
  axios.put(url + '/' + state.formData.Id, state.formData, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      swal({
        title: `Buen trabajo!`,
        text: 'Se modifico el elemento con exito!',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-fill',
        type: 'success'
      })
      dispatch('loadData', url)
      commit('formDataCleaner')
      commit('editSetter', false)
    })
    .catch(error => console.log(error))
}

const remove = ({ dispatch }, formData) => {
  swal({
    title: 'Estas Seguro?',
    text: 'No será posible volver atras!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: 'No, cancelar',
    confirmButtonClass: 'btn btn-success btn-fill',
    cancelButtonClass: 'btn btn-danger btn-fill',
    buttonsStyling: false
  }).then(function () {
    axios.delete(formData.url + '/' + formData.id, {
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(response => {
        swal({
          title: 'Eliminado!',
          text: 'Se elimino de forma correcta.',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
        dispatch('loadData', formData.url)
      })
      .catch(error => console.log(error))
  }, function (dismiss) {
    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
    if (dismiss === 'cancel') {
      swal({
        title: 'Cancelado',
        text: 'Este item está a salvo :)',
        type: 'error',
        confirmButtonClass: 'btn btn-info btn-fill',
        buttonsStyling: false
      })
    }
  })
}

export default {
  loadData,
  create,
  remove,
  find,
  update
}
