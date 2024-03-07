<template>
  <NavigationBar>
    <router-link to="/login">Login</router-link>
  </NavigationBar>

  <LoginForm title="Welcome" url="/assets/img/admin_login.png">
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
import LoginForm from '@/components/forms/LoginForm.vue'
import {onMounted, reactive, ref, unref} from "vue";
import axios from "axios";
import Qs from 'qs';
import {useRouter} from "vue-router";
import {useUser} from "@/store";
import NavigationBar from "@/components/nav/NavigationBar.vue";
import {ElMessage} from "element-plus";
import {useGet, usePost} from "@/utils/useAxios";

const a = {
  key: 1,
  otherKey: 2,
}

const form = reactive({
  username: '',
  password: ''
});

const router = useRouter();
const userProfile = useUser();

function onSubmit() {
  usePost("/login/admin", form, "Login Success", (r) => {
    userProfile.setAdmin(r.data.data);
    router.push("/admin")
  });
}

</script>

<style scoped lang="stylus">
</style>