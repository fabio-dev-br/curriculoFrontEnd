import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import VoerroTagsInput from '@voerro/vue-tagsinput';

// Import dos ícones
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// Import para serem feitos o roteamento entre as páginas e gerenciamento de estados
import { router } from './router'
import { store } from './store';

// Declaração global dos componente
Vue.component('icon', Icon)
Vue.component('tags-input', VoerroTagsInput);
Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
