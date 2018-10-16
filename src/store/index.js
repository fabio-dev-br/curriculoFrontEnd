import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    //layout: "SimpleLayout",
    //define a variavel
    authToken: null,
    userType: null
  },
  mutations: {
    // setLayout(state, payload) {
    //   state.layout = payload;
    // },
    //define como estado é modificado
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setuserType(state, userType) {
      state.userType = userType;
    }
  },
  getters: {
    // layout(state) {
    //   return state.layout;
    // },
    //retorna o estado
    authToken(state) {
      return state.authToken;
    },
    loggedIn(state) {
      return state.authToken !== null
    },
    userType(state) {
      return state.userType;
    }
  }
});
