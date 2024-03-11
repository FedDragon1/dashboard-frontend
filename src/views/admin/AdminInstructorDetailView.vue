<template>
  <AdminTemplate :subtitle="`Instructor: ${$route.params.instructorUuid}`">
    <InstructorDetail :admin="true" :uuid="$route.params.instructorUuid"/>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent} from "vue";

const InstructorDetail = defineAsyncComponent(() =>
    import('@/components/details/InstructorDetail.vue')
)
</script>

<style scoped>

</style>