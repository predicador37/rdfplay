import Vue from 'vue'
import VueWorker from 'vue-worker'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import storeConfig from './store/store-config'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import Parser from 'rdf-parser-n3'
import Serializer from 'rdf-serializer-jsonld-ext'
import VueResource from 'vue-resource'
// https://github.com/YuzuJS/setImmediate
import 'setimmediate' // this solves an error with the latest versions of comunica
import StringStream from 'string-to-stream'
import DataFactory from 'rdf-ext'

Object.defineProperty(Vue.prototype, '$N3Parser', { value: Parser })
Object.defineProperty(Vue.prototype, '$string2stream', { value: StringStream })
Object.defineProperty(Vue.prototype, '$rdf', { value: DataFactory })
Object.defineProperty(Vue.prototype, '$JsonLdSerializer', { value: Serializer })
Vue.use(VueResource)
Vue.use(VueWorker)

Vue.use(Vuetify, {
  theme: {
    primary: '#004a8f',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

Vue.use(VeeValidate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
