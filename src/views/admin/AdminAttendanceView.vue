<template>
  <AdminTemplate subtitle="Attendances">
    <AttendanceTable api="/attendance" all :column-policy="courseColumnPolicy"/>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent, reactive} from "vue";
import {useRouter} from "vue-router";
import {useUser} from "@/store";

const AttendanceTable = defineAsyncComponent(() =>
    import('@/components/tables/AttendanceTable.vue')
)
const router = useRouter();
const user = useUser();
const courseColumnPolicy = reactive({
  editableDate: true,
  editableCourseUuid: true
})

if (user.admin === null) {
  router.push("/login/admin");
}
</script>

<style scoped>

</style>