<template>
  <div class="center">
    <div class="form-wrapper auto-margin">
      <div class="form-img-dummy" :style="{ 'background-image': `url(${url})` }"></div>
      <div class="form-body-wrapper">
        <h1>{{title}}</h1>
        <slot/>
        <div class="center-wrapper">
          <div class="bottom">
            <slot name="margin"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "url"])
</script>

<style scoped lang="stylus">
.form-wrapper
  width: 1000px;
  max-width 60vw
  display flex
  flex-direction row
  height 600px;
  border 1px solid var(--el-border-color)
  border-radius var(--el-border-radius-base)
  gap 20px

.form-img-dummy
  flex-grow 3
  height 100%
  //background-image url("@/assets/img/admin_login.png");
  background-size cover

@media(max-width: 1200px)
  .form-img-dummy
    display none

.login-form
  height 100%

.form-body-wrapper
  padding 40px
  flex-grow 2
  position relative
  margin-left auto
  margin-right auto

.center-wrapper
  position absolute
  bottom 20px
  width calc(100% - 80px)
  display flex
  justify-content center

.center
  height 100%
  display flex
  align-items center

.auto-margin
  margin-right auto
  margin-left auto
</style>