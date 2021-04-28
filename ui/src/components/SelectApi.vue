<script>
import QSelect from 'quasar/src/components/select/QSelect'
import Vue from 'vue'

export default {
  name: 'SelectApi',
  extends: QSelect,
  props: {
    api: {
      type: String,
      required: true
    },
    http: {
      type: Function,
      required: true
    },
    hideSelected: {
      type: Boolean,
      default: false
    },
    params: {
      type: String,
      default: ''
    },
    fetchOnParamChange: {
      type: Boolean,
      default: false
    },
    useInput: {
      type: Boolean,
      default: true
    },
    index: {
      type: String,
      default: ''
    },
    optionFormater: {
      type: Function,
      default: null
    },
    noIndexFormater: {
      type: Function,
      default: null
    }
  },
  beforeCreate () {
    //this.qListeners.filter = true

    Vue.delete(this.$options.props, 'loading');
    Vue.delete(this.$options.props, 'options');

    // this.$on('filter', (val, update, abort) => {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options = this.clearOptions.filter(v => v[this.optionLabel].toLowerCase().indexOf(needle) > -1)
    //   })
    // })
  },
  data: () => ({
    loading: false,
    model: '',
    options: [],
    clearOptions: []
  }),
  mounted () {
    this.getData()
  },
  computed: {
    url () {
      return `${this.api}?${this.params}`
    }
  },
  watch: {
    params () {
      if (this.fetchOnParamChange) {
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.http.get(this.url)
        .then(response => {
          this.$emit('fetched')

          if (this.optionFormater) {
            this.clearOptions = this.optionFormater(response.data._embedded[this.index])
            this.options = this.optionFormater(response.data._embedded[this.index])
            return
          }

          this.clearOptions = response.data
          this.options = response.data
        })
        .catch(error => {
          this.$emit('error', error)
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>
