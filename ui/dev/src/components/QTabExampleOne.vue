<template>
  <div>
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
      class="bg-grey-2 text-teal"
    >
      <q-tab
        class="text-purple"
        name="example"
        label="Example"
      />
      <q-tab
        class="text-orange"
        name="template"
        label="Template"
      />
      <q-tab
        class="text-teal"
        name="script"
        label="Script"
      />
    </q-tabs>

    <q-tab-panels
      keep-alive
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-tab-panel
        name="example"
        ref="panel"
      >
        <div class="row">

          <select-api
            :http="axios"
            api="users"
            v-model="selectedUser"
            clearable
            emit-value
            map-options
            autofocus-filter
            option-value="id"
            option-label="name"
            label="Select User"
          />

        </div>
      </q-tab-panel>

      <q-tab-panel name="template">
        <highlightjs
          language="htmlbars"
          :code="code"
        />
      </q-tab-panel>

      <q-tab-panel name="script">
        <highlightjs
          language="javascript"
          :code="createdString"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import SelectApi from '../../../src/components/SelectApi'
import axios from 'axios'

export default {
  components: {
    SelectApi
  },
  created () {
    this.axios = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' })
  },
  methods: {
    request (props) {
      console.log(props)
    }
  },
  data: () => ({
    createdString: ` created () {
    this.axios = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' })
 }`,
    selectedUser: null,
    tab: 'example',
    axios: null,
    code: `<select-api
  :http="axios"
  api="users"
  v-model="selectedUser"
  clearable
  emit-value
  map-options
  autofocus-filter
  option-value="id"
  option-label="name"
  label="Select User"
/>`
  }),
  computed: {

  }
}
</script >

<style lang="sass" scoped>
.q-tab-panel
  padding: 0px
</style>