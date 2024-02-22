<template>
<AdminNavBar/>
<ContentFramer :border="false" :top-margin="true" :style="{height: '70vh'}">
  <AdminInfo current-page="Courses"/>
  <ContentFramer :style="{height: 'calc(100% - 10vh)', overflowY: 'scroll'}">
    <Suspense>
      <InstructorsTable api="/instructor"></InstructorsTable>
      <template #fallback>
        <Loading></Loading>
      </template>
    </Suspense>
  </ContentFramer>
</ContentFramer>
</template>

<script setup>

import AdminNavBar from "@/components/nav/AdminNavBar.vue";
import ContentFramer from "@/components/misc/ContentFramer.vue";
import AdminInfo from "@/components/misc/AdminInfo.vue";
import InstructorsTable from "@/components/tables/InstructorsTable.vue";
import Loading from "@/components/misc/Loading.vue";
</script>

<style scoped>

</style>