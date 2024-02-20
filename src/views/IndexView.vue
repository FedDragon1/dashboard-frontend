<template>
  <NavBlock/>
  <NavigationBar>
    <router-link to="/login" class="title">Login</router-link>
  </NavigationBar>
  <Hero/>
</template>

<script setup>

import Hero from "@/components/Hero.vue";
import NavBlock from "@/components/NavBlock.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style scoped>

</style>