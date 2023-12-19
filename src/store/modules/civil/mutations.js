const segmentoSetter = (state, data) => {
  state.BranchesId = data
}

const tipoArchivoSetter = (state, data) => {
  state.FileType = data
}

const uploadedFilesSetter = (state, data) => {
  state.uploadedFiles = data
}

const uploadedFilesIdSetter = (state, data) => {
  state.uploadedFiles.id = data
}

const uploadedFilesCleaner = (state) => {
  state.uploadedFiles.array = []
  state.uploadedFiles.state = 'STARTED'
  state.uploadedFiles.id = ''
}
export default {
  segmentoSetter,
  tipoArchivoSetter,
  uploadedFilesSetter,
  uploadedFilesCleaner,
  uploadedFilesIdSetter
}
