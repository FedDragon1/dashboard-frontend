import App from './App.vue'
import '@/assets/index.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import IndexView from "@/views/IndexView.vue";
import InstructorLoginView from "@/views/InstructorLoginView.vue";
import AdminLoginView from "@/views/AdminLoginView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import InstructorDashboardView from "@/views/InstructorDashboardView.vue";

axios.defaults.baseURL = "http://localhost:8080/api"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: IndexView },
        {
            path: '/login',
            redirect: '/login/instructor',
            children: [
                { path: '/login/instructor', component: InstructorLoginView },
                { path: '/login/admin', component: AdminLoginView }
            ]
        },
        {
            path: '/admin',
            component: AdminDashboardView,
        },
        {
            path: '/instructor',
            component: InstructorDashboardView
        }
    ]
})

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
