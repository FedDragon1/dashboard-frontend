<template>
  <NavigationBar>
    <router-link to="/login">Login</router-link>
  </NavigationBar>
  <LoginForm title="Welcome" url="/src/assets/img/admin_login.png" :error-dialogue="errorDialogue">
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
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import {reactive, ref, unref} from "vue";
import axios from "axios";
import Qs from 'qs';
import {useRouter} from "vue-router";
import {useUser} from "@/store";
import NavigationBar from "@/components/NavigationBar.vue";

const errorDialogue = reactive({
  show: false,
  message: ''
})

const form = reactive({
  username: '',
  password: ''
});

const router = useRouter();
const userProfile = useUser();

function onFulfill(e) {
  const data = e.data;
  console.log(data);
  if (data.success === false) {
    errorDialogue.show = true;
    errorDialogue.message = data.error;
    return;
  }

  //success
  userProfile.setAdmin(data.data);
  router.push("/admin")
}

function onSubmit() {
  console.log(JSON.stringify(form));
  axios.post("/login/admin", Qs.stringify(form)).then(onFulfill)
}
</script>

<style scoped lang="stylus">
</style>