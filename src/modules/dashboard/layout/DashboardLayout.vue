<script setup>
import { ref } from 'vue'

import Header from '../components/TheHeader.vue';
import Sidebar from '../components/TheSidebar.vue';

const drawer = ref(false)
const miniState = ref(true)
</script>

<template>
  <div class="w-full">
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 ">

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