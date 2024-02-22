<template>
<div :class="{border, 'max-1280': max1280, center, radius, 'top-margin': topMargin}" :style="style">
  <slot/>
</div>
</template>

<script setup>
defineProps({
  border: {
    type: Boolean,
    default: true
  },
  max1280: {
    type: Boolean,
    default: true
  },
  center: {
    type: Boolean,
    default: true
  },
  radius: {
    type: Boolean,
    default: true
  },
  topMargin: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: {}
  }
})
</script>

<style scoped lang="stylus">
.border
  border 1px solid var(--el-border-color)

.max-1280
  max-width 1280px
  width 100%

.radius
  border-radius var(--el-border-radius-base)

.center
  margin-left auto
  margin-right auto

.top-margin
  margin-top 12vh
</style>