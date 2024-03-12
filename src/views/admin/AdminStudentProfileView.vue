<template>
  <AdminTemplate :subtitle="`Student: ${$route.params.studentUuid}`">
    <StudentDetail :admin="true" :uuid="$route.params.studentUuid"/>
  </AdminTemplate>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
import AdminTemplate from "@/components/misc/AdminTemplate.vue";

const StudentDetail = defineAsyncComponent(() =>
    import('@/components/details/StudentDetail.vue')
)
</script>

<style scoped>

</style>