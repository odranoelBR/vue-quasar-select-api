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
          <div class="col-4">
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
          <div class="col-8">
            <select-api
              :http="axios"
              :get-on-start="false"
              :get-on-param-change="true"
              :params="`userId=${selectedUser}`"
              api="posts"
              v-model="selectedPost"
              clearable
              emit-value
              map-options
              option-value="id"
              option-label="title"
              label="Select posts from the user"
            />
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
   selectedUser: null,
   selectedPost: null,
 })`,
    selectedUser: null,
    selectedPost: null,
    tab: 'example',
    axios: null,
    code: ` <select-api
  :http="axios"
  :get-on-start="false"
  :get-on-param-change="true"
  :params="\`userId=\${selectedUser}\`"
  api="posts"
  v-model="selectedPost"
  clearable
  emit-value
  map-options
  option-value="id"
  option-label="title"
  label="Select posts from the user"
 />`
  }),
  watch: {
    selectedUser () {
      this.selectedPost = null
    }
  }
}
</script >

<style lang="sass" scoped>
.q-tab-panel
  padding: 0px
</style>