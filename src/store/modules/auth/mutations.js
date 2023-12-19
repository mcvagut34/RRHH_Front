const authUser = (state, authData) => {
  state.token = authData.token
  state.refreshToken = authData.refreshToken
  state.userId = authData.userId
  state.Menu = authData.Menu
}

const refreshUser = (state, authData) => {
  state.token = authData.token
}

export default {
  authUser,
  refreshUser
}
