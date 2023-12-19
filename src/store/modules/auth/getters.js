const userIdGetter = state => state.userId
const accessTokenGetter = state => state.token
const isAuthenticated = () => {
  if (localStorage.getItem('token')) {
    return true
  }
}
export default {
  userIdGetter,
  accessTokenGetter,
  isAuthenticated
}
