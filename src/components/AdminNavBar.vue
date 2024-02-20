<template>
  <NavBlock/>
<NavigationBar>
  <router-link to="/admin/instructor">Instructors</router-link>
  <router-link to="/admin/course">Courses</router-link>
  <router-link to="/admin/student">Students</router-link>
  <router-link to="/admin/attendance">Attendance</router-link>
</NavigationBar>
</template>

<script setup>

import NavigationBar from "@/components/NavigationBar.vue";
import NavBlock from "@/components/NavBlock.vue";
</script>

<style scoped>

</style>