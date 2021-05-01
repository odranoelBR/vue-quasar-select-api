<script>
import QSelect from 'quasar/src/components/select/QSelect'
import Vue from 'vue'

export default {
  name: 'SelectApi',
  extends: QSelect,
  props: {
    /** The rest API endpoint */
    api: { type: String, required: true },
    /** The Axios instance
    *  @example axios.create({ baseURL: 'https://reqres.in/' })
    */
    http: { type: Function, required: true },
    /** Query params of the url
   * @link https://en.wikipedia.org/wiki/Query_string
   */
    params: { type: String, default: '' },
    /** The component will fetch remote data on mounted hook */
    getOnStart: { type: Boolean, default: true },
    /** The component will fetch remote data on params props change */
    getOnParamChange: { type: Boolean, default: false },
    /** The function to format the API response
     * @example formter (data) { return data.map(row => row.nestedObject) }
    */
    optionFormater: { type: Function, default: null },
    /** Set filter using input (you must set useInput props to true, like QSelect docs) */
    inputFilter: { type: Boolean, default: false },
  },
  beforeCreate () {
    Vue.delete(this.$options.props, 'loading');
    Vue.delete(this.$options.props, 'options');
  },
  data: () => ({
    loading: false,
    model: '',
    options: [],
    clearOptions: []
  }),
  mounted () {
    if (this.getOnStart) {
      this.get()
    }

    this.addFilter()
  },
  computed: {
    url () {
      return `${this.api}?${this.params}`
    }
  },
  watch: {
    params () {
      if (this.getOnParamChange) {
        this.get()
      }
    }
  },
  methods: {
    get () {
      this.loading = true
      this.http.get(this.url)
        .then(response => {
          /**
          *  $emit('successOnGet', response) on sucefull get request.
          */
          this.$emit('successOnGet', response)

          if (this.optionFormater) {
            this.clearOptions = this.optionFormater(response.data)
            this.options = this.optionFormater(response.data)
            return
          }

          this.clearOptions = response.data
          this.options = response.data
        })
        .catch(error => {
          /**
           *  Emit the ERROR Object of axios catch.
           */
          this.$emit('errorOnGet', error)
        })
        .finally(() => this.loading = false)
    },
    addFilter () {
      if (this.filter) {
        this.qListeners.filter = true
        this.$on('filter', (val, update, abort) => {
          update(() => {
            const needle = val.toLowerCase()
            this.options = this.clearOptions.filter(v => v[this.optionLabel].toLowerCase().indexOf(needle) > -1)
          })
        })
      }
    }
  }
}
</script>
