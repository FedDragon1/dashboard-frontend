import App from './App.vue'
import '@/../public/assets/index.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import { createPinia } from 'pinia'
import axios from '@/utils/useAxios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import IndexView from "@/views/IndexView.vue";
import InstructorLoginView from "@/views/login/InstructorLoginView.vue";
import AdminLoginView from "@/views/login/AdminLoginView.vue";
import AdminInstructorsView from "@/views/admin/AdminInstructorsView.vue";
import AdminCoursesView from "@/views/admin/AdminCoursesView.vue";
import AdminAttendanceView from "@/views/admin/AdminAttendanceView.vue";
import AdminStudentsView from "@/views/admin/AdminStudentsView.vue";
import InstructorCoursesView from "@/views/instructor/InstructorCoursesView.vue";
import InstructorCourseAttendanceView from "@/views/instructor/InstructorCourseAttendanceView.vue";
import InstructorStudentProfileView from "@/views/instructor/InstructorStudentProfileView.vue";
import AdminStudentProfileView from "@/views/admin/AdminStudentProfileView.vue";
import {useUser} from "@/store";
import AdminCourseDetailView from "@/views/admin/AdminCourseDetailView.vue";
import AdminInstructorDetailView from "@/views/admin/AdminInstructorDetailView.vue";


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
            redirect: '/admin/instructor',
            children: [
                { path: '/admin/instructor', component: AdminInstructorsView },
                { path: '/admin/course', component: AdminCoursesView },
                { path: '/admin/attendance', component: AdminAttendanceView },
                { path: '/admin/student', component: AdminStudentsView },
                { path: '/admin/student/:studentUuid', component: AdminStudentProfileView },
                { path: '/admin/course/:courseUuid', component: AdminCourseDetailView },
                { path: '/admin/instructor/:instructorUuid', component: AdminInstructorDetailView }
            ]
        },
        {
            path: '/instructor',
            redirect: '/instructor/course',
            children: [
                { path: '/instructor/course', component: InstructorCoursesView },
                { path: '/instructor/attendance/:courseUuid', component: InstructorCourseAttendanceView },
                { path: '/instructor/student/:studentUuid', component: InstructorStudentProfileView }
            ]
        }
    ]
})
const pinia = createPinia();

router.isReady().then(
    createApp(App)
        .use(ElementPlus)
        .use(pinia)
        .use(router)
        .mount('#app')
)

const user = useUser();

axios.post("/login/admin").then(r => r.data.success ? user.setAdmin(r.data.data) : null);
axios.post("/login/instructor").then(r => r.data.success ? user.setInstructor(r.data.data) : null);




