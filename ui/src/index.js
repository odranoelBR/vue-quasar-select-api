import { version } from '../package.json'

import SelectApi from './components/SelectApi.vue'


export {
  version,
  SelectApi

}

export default {
  version,
  SelectApi,

  install (Vue) {
    Vue.component(SelectApi.name, SelectApi)

  }
}
