import axios from 'axios/index'

const uploadedFiles = ({ commit, state }) => {
  const formData = {
    mes: state.mes,
    gestion: state.gestion,
    segmentoOrigen: state.segmentoOrigen
  }
  axios.post('/payroll/checkupload', formData, {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      if (response.data !== '') {
        commit('uploadedFilesSetter', response.data)
      } else {
        commit('uploadedFilesCleaner')
      }
    })
    .catch(error => console.log(error))
}
export default {
  uploadedFiles
}
