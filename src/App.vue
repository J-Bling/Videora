<template>
  <header>
    <Header></Header>
  </header>
  <main>
    <RouterView/>
  </main>
  
</template> 

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/nav/Header.vue';
</script>