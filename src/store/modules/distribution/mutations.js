const segmentoSetter = (state, data) => {
  state.segmentoOrigen = data
}

const mesSetter = (state, data) => {
  state.mes = data
}

const gestionSetter = (state, data) => {
  state.gestion = data
}

const uploadedFilesSetter = (state, data) => {
  state.uploadedFiles = data
}

const uploadedFilesCleaner = (state) => {
  state.uploadedFiles.array = []
  state.uploadedFiles.state = 'STARTED'
  state.uploadedFiles.id = ''
}
export default {
  segmentoSetter,
  mesSetter,
  gestionSetter,
  uploadedFilesSetter,
  uploadedFilesCleaner
}
