import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  data: [],
  formData: {},
  edit: false,
  isLoading: false
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
