import axios from 'axios/index'
import swal from 'sweetalert2'

const loadData = ({ commit }, url) => {
  axios.get(url, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      commit('dataSetter', response.data)
    })
    .catch(error => console.log(error))
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
        title: `Good job!`,
        text: 'You clicked the button!',
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
        title: `Good job!`,
        text: 'You clicked the button!',
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
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
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
          title: 'Deleted!',
          text: 'Your imaginary file has been deleted.',
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
        title: 'Cancelled',
        text: 'Your imaginary file is safe :)',
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
