<template>
  <AdminTemplate subtitle="Courses">
    <CourseTable api="/courses" all :column-policy="courseColumnPolicy"/>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent, reactive} from "vue";
import {useRouter} from "vue-router";
import {useUser} from "@/store";

const CourseTable = defineAsyncComponent(() =>
    import('@/components/tables/CourseTable.vue')
)
const router = useRouter();
const user = useUser();
const courseColumnPolicy = reactive({
  editableName: true,
  editableDateCreated: true,
  editableInstructorUuid: true
})

if (user.admin === null) {
  router.push("/login/admin");
}
</script>

<style scoped>

</style>