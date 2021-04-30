<template>
  <q-page
    padding
    class="row justify-center"
  >
    <div class="col-10">
      <q-card class="q-mb-lg">
        <q-card-section class="bg-grey-9 text-white">
          <div class="text-h6">Don't fetch on start. </div>
          <div class="text-subtitle2">Fetch on param change!</div>
        </q-card-section>
        <q-separator
          dark
          inset
        />
        <q-card-section class="no-padding">
          <q-tab-example-two />
        </q-card-section>
      </q-card>

      <q-card class="q-mb-lg">
        <q-card-section class="bg-grey-9 text-white">
          <div class="text-h6">API response must be formated. </div>
          <div class="text-subtitle2">We can format the response!</div>
        </q-card-section>
        <q-separator
          dark
          inset
        />
        <q-card-section class="no-padding">
          <q-tab-example-three />
        </q-card-section>
      </q-card>

      <!-- <q-card class="q-mb-lg">
        <q-card-section class="bg-grey-9 text-white">
          <div class="text-h6">Rule to edit only the completed tasks. </div>
          <div class="text-subtitle2"></div>
        </q-card-section>
        <q-separator
          dark
          inset
        />
        <q-card-section class="no-padding">
          <q-tab-example-four />
        </q-card-section>
      </q-card>

      <q-card class="q-mb-lg">
        <q-card-section class="bg-grey-9 text-white">
          <div class="text-h6">Changing types of form for edit / create </div>
          <div class="text-subtitle2">Notify on update</div>
        </q-card-section>
        <q-separator
          dark
          inset
        />
        <q-card-section class="no-padding">
          <q-tab-example-five />
        </q-card-section>
      </q-card>

      <q-card class="q-mb-lg">
        <q-card-section class="bg-grey-9 text-white">
          <div class="text-h6">Custom pagination indexes </div>
          <div class="text-subtitle2">Custom columns ( from QTable)</div>
          <div class="text-subtitle2">Custom icons</div>
        </q-card-section>
        <q-separator
          dark
          inset
        />
        <q-card-section class="no-padding">
          <q-tab-example-six />
        </q-card-section>
      </q-card> -->
    </div>
  </q-page>
</template>

<script>
import QTabExampleTwo from '@components/QTabExampleTwo'
import QTabExampleThree from '@components/QTabExampleThree'
// import QTabExampleFour from '@components/QTabExampleFour'
// import QTabExampleFive from '@components/QTabExampleFive'
// import QTabExampleSix from '@components/QTabExampleSix'

export default {
  components: {
    QTabExampleTwo, QTabExampleThree
    //  QTabExampleFour, QTabExampleFive, QTabExampleSix
  }
}
</script>

<style lang="sass" scoped>
.q-tab-panel
  padding: 0px
</style>
