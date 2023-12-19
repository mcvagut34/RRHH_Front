import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import crudModule from './modules/crud'
import distModule from './modules/distribution'
import civModule from './modules/civil'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    crud: crudModule,
    dist: distModule,
    civ: civModule
  }
})
