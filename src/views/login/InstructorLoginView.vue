<template>
  <NavigationBar>
    <router-link to="/login">Login</router-link>
  </NavigationBar>
  <LoginForm title="Welcome" url="/src/assets/img/instructor_login.png">
    <el-form :model="form" label-width="120px" class="login-form" label-position="top">
      <br>
      <el-form-item label="Id" >
        <el-input v-model="form.uuid" placeholder="Instructor UUID"/>
      </el-form-item>
      <br>
      <el-form-item label="Password">
        <el-input v-model="form.password" placeholder="Instructor Password"/>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
    <template #margin>
      <router-link to="/login/admin">Login with Admin Account</router-link>
    </template>
  </LoginForm>
</template>

<script setup>
import NavigationBar from "@/components/nav/NavigationBar.vue";
import LoginForm from '@/components/forms/LoginForm.vue'
import { reactive } from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import { useUser } from '@/store';
import Qs from 'qs';
import {ElMessage} from "element-plus";

const form = reactive({
  uuid: '',
  password: ''
});

const router = useRouter();
const userProfile = useUser();

function onFulfill(e) {
  const data = e.data;
  console.log(data);
  if (data.success === false) {
    ElMessage.error(data.error);
    return;
  }

  // success
  userProfile.setInstructor(data.data);
  router.push("/instructor")
}

function onSubmit() {
  console.log(JSON.stringify(form));
  axios.post("/login/instructor", Qs.stringify(form))
      .then(onFulfill).catch(e => ElMessage.error(e))
}
</script>

<style scoped lang="stylus">
</style>