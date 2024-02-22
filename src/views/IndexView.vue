<template>
  <NavBlock/>
  <NavigationBar>
    <router-link to="/login" class="title">Login</router-link>
  </NavigationBar>
  <Hero/>
</template>

<script setup>

import Hero from "@/components/misc/Hero.vue";
import NavBlock from "@/components/nav/NavBlock.vue";
import NavigationBar from "@/components/nav/NavigationBar.vue";
</script>

<style scoped>

</style>