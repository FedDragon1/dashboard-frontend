<template>
  <AdminTemplate :subtitle="`Instructor: ${$route.params.instructorUuid}`">
    <InstructorDetail :admin="true" :uuid="$route.params.instructorUuid"/>
  </AdminTemplate>
</template>

<script setup>
import AdminNavBar from "@/components/nav/AdminNavBar.vue";
import ContentFramer from "@/components/misc/ContentFramer.vue";
import AdminInfo from "@/components/misc/AdminInfo.vue";
import InstructorsTable from "@/components/tables/InstructorsTable.vue";
import Loading from "@/components/misc/Loading.vue";
import InstructorDetail from "@/components/details/InstructorDetail.vue";
import AdminTemplate from "@/components/misc/AdminTemplate.vue";


</script>

<style scoped>

</style>