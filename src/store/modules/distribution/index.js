import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  mes: null,
  gestion: null,
  segmentoOrigen: '',
  uploadedFiles: {
    array: [],
    state: 'STARTED',
    id: ''
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
