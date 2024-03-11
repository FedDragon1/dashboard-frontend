<template>
<ContentFramer :radius="false" :border="false">
  <div class="wrapper">
    <el-button plain @click="$emit('new')" :disabled="disabled">Add {{name}}</el-button>
  </div>
</ContentFramer>
</template>

<script setup>
import ContentFramer from "@/components/misc/ContentFramer.vue";

defineProps(["disabled", "name"])
</script>

<style scoped lang="stylus">
.wrapper
  height 50px
  background var(--el-fill-color-lighter)
  line-height: 50px;
  text-align center
</style>