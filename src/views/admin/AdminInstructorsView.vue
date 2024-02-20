<template>
  <AdminNavBar/>

admin dashboard
  <br>
  Hello, {{adminUsername}}
</template>

<script setup>
import NavBlock from "@/components/NavBlock.vue";
import {useUser} from "@/store";
import AdminNavBar from "@/components/AdminNavBar.vue";

const adminUsername = useUser().admin;
</script>

<style scoped>

</style>