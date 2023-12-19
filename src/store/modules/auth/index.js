import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  token: null,
  refreshToken: null,
  userId: null,
  Menu: null
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
