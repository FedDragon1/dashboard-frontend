<template>
<nav>
  <router-link to="/">Index</router-link>
  <router-link to="/instructor">Instructor</router-link>
  <router-link to="/admin">Admin</router-link>
  <router-link to="/login">Login</router-link>
  <router-link to="/login/admin">Login Admin</router-link>
</nav>
</template>

<script>
export default {
  name: "DebugNavBar"
}
</script>

<style scoped lang="stylus">
nav
  position fixed
  height 100px
  width 100%
  display flex
  flex-direction row
  justify-content space-around
  align-content center
  flex-wrap wrap
  bottom 0
  left 0
</style>