<script setup>
import { ref } from 'vue'

import Header from '../components/TheHeader.vue'
import Sidebar from '../components/TheSidebar.vue'

const drawer = ref(true)
const miniState = ref(true)
</script>

<template>
  <div class="w-full">
    <q-layout
      container
      class="shadow-2"
      view="hHh Lpr lff"
      style="height: 100vh"
    >
      <Header v-model:drawer="drawer" />

      <Sidebar v-model:drawer="drawer" v-model:miniState="miniState" />

      <q-page-container>
        <q-page padding>
          <RouterView />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
