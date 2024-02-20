<template>
  <div class="center">
  <LoginForm class="auto-margin" title="Welcome">
    <el-form :model="form" label-width="120px" class="login-form" label-position="top">
      <br>
      <el-form-item label="Username" >
        <el-input v-model="form.username" placeholder="Admin Username"/>
      </el-form-item>
      <br>
      <el-form-item label="Password">
        <el-input v-model="form.password" placeholder="Admin Password"/>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
    <template #margin>
      <router-link to="/login/instructor">Login with Instructor Account</router-link>
    </template>
  </LoginForm>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { reactive } from "vue";

const form = reactive({
  username: '',
  password: ''
});

function onSubmit() {
  console.log(JSON.stringify(form));
}
</script>

<style scoped lang="stylus">
.center
  height 100%
  display flex
  align-items center

.auto-margin
  margin-right auto
  margin-left auto
</style>