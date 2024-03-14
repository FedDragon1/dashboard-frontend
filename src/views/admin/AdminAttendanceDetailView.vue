<template>
  <AdminTemplate :subtitle="`Attendance: ${$route.params.attendanceUuid}`">
    <AttendanceDetail :admin="true" :uuid="$route.params.attendanceUuid"/>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent} from "vue";

const AttendanceDetail = defineAsyncComponent(() =>
    import('@/components/details/AttendanceDetail.vue')
)
</script>

<style scoped>

</style>