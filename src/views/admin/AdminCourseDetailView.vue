<template>
  <AdminTemplate :subtitle="`Course: ${$route.params.courseUuid}`">
    <CourseDetail :admin="true" :uuid="$route.params.courseUuid"/>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent} from "vue";

const CourseDetail = defineAsyncComponent(() =>
    import('@/components/details/CourseDetail.vue')
)
</script>

<style scoped>

</style>