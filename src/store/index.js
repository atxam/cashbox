import Vue from 'vue'
import Vuex from 'vuex'
import Shared from './shared'
import Users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Shared,
    Users
  }
})