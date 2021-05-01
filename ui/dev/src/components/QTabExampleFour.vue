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
        <div class="row q-pa-md q-col-gutter-sm">
          <div class="col-10">
            <select-api
              :http="axios"
              :optionFormater="optionFormater"
              api="users"
              v-model="selectedAdress"
              clearable
              emit-value
              map-options
              input-filter
              use-input
              option-value="id"
              option-label="street"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </select-api>
          </div>

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

  data: () => ({
    createdString: ` created () {
    this.axios = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' })
 },
 data: () => ({
   selectedAdress: null
 }),
 methods: {
   optionFormater (responseData) {
     return responseData.map(response => response.address)
   }
 }`,
    selectedAdress: null,
    tab: 'example',
    axios: null,
    code: ` <select-api
  :http="axios"
  :optionFormater="optionFormater"
  api="users"
  v-model="selectedAdress"
  clearable
  emit-value
  map-options
  input-filter
  use-input
  option-value="id"
  option-label="street"
  >
   <template v-slot:no-option>
    <q-item>
      <q-item-section class="text-grey">
        No results
      </q-item-section>
    </q-item>
   </template>
 </select-api>`
  }),
  methods: {
    optionFormater (responseData) {
      return responseData.map(response => response.address)
    }
  }
}
</script >

<style lang="sass" scoped>
.q-tab-panel
  padding: 0px
</style>