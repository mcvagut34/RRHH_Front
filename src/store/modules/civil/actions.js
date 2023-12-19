import axios from 'axios/index'

const uploadedFiles = ({ commit, state }) => {
  const formData = {
    FileType: state.FileType,
    BranchesId: state.BranchesId,
    ProcessId: state.uploadedFiles.id
  }
  axios.post('/ServContract/checkupload', formData, {
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
