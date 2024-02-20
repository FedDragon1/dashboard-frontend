<template>
<nav>
  <div class="left">
    <router-link to="/" class="title">Dashboard</router-link>
  </div>
  <div class="right">
    <slot/>
  </div>
</nav>
</template>

<script setup>
</script>

<style scoped lang="stylus">
nav
  display flex
  flex-direction row
  justify-content space-between
  height 40px
  background-image radial-gradient(transparent, var(--el-bg-color))
  background-size 4px 4px
  padding-top 10px
  padding-bottom  5px
  padding-left  40px
  padding-right   40px
  position fixed
  top 0
  left 0
  width calc(100% - 80px);
  border-bottom  1px solid var(--el-border-color)

div
  line-height 40px

.title
  font-size 20px
  font-weight bold

.right
  display flex
  flex-direction row
  gap 20px
  flex-wrap wrap
  align-content space-around
</style>