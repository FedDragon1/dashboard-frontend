<template>
  <AdminNavBar/>
  <ContentFramer :border="false" :top-margin="true" :style="{height: '70vh'}">
    <AdminInfo :current-page="subtitle"/>
    <ContentFramer :style="{height: 'calc(100% - 10vh)', overflowY: 'scroll'}">
      <Suspense>
        <slot/>
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
import Loading from "@/components/misc/Loading.vue";

defineProps(["subtitle", ])
</script>

<style scoped>

</style>