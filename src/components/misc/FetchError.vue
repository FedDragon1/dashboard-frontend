<template>
  <div class="wrapper">
    <img src="/src/assets/img/error.png" alt="Error" width="100" height="100">
    <span>Error: {{error}}</span>
    <el-button type="primary" dark @click="$emit('click')">Retry</el-button>
  </div>
</template>

<script setup>
defineProps(["error"])
</script>

<style scoped lang="stylus">
.wrapper
  width 100%
  height 100%
  display flex
  align-items center
  flex-direction column
  justify-content center
  gap 20px

span
  text-align center
  font-size 1.2rem
</style>