<template>
  <div>
    <h1>Hello, {{userProfile.instructor.name ?? userProfile.admin}}</h1>
    <h2>{{currentPage}}</h2>
  </div>
</template>

<script setup>

import {useUser} from "@/store";

const userProfile = useUser();

defineProps(["currentPage"])

</script>

<style scoped lang="stylus">
h1, h2
  margin-bottom 0
  display inline

div
  border-bottom 1px solid var(--el-border-color)
  margin-bottom 20px
  display flex
  flex-direction row
  justify-content space-between
  align-items flex-end
</style>