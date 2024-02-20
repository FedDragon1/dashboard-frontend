<template>
<section class="wrapper">
  <h1 class="tagline">The One-Stop Attendance<br>Management System</h1>
  <p class="description">SpringBoot + Vue3 web based full-stack attendance marking solution for education organizations.</p>
  <button type="button" @click="login">Get Started
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" data-v-a5e898ee="">
      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" data-v-a5e898ee=""></path>
    </svg>
  </button>
</section>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

function login() {
  router.push("/login");
}
</script>

<style scoped lang="stylus">
.tagline
  background linear-gradient(135deg, #42d392 25%, #647eff)
  background-clip text;
  color transparent
  font-size 76px;
  text-align center

.wrapper
  margin 200px

.description
  color rgba(235, 235, 235, 0.6)
  font-size 22px
  text-align center
  margin 24px auto 55px

.icon
  fill white
  padding-left 5px

button
  font-size 20px
  padding 20px
  padding-bottom 15px
  border-radius 10px
  outline none
  background var(--el-fill-color-light)
  border 1px solid var(--el-border-color)
  transition background 0.2s ease-in-out
  margin: 0 auto;
  display: block;

button:hover
  background rgba(#409eff, 0.6)
  transition background 0.2s ease-in-out
</style>