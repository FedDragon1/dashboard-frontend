<template>
  <AdminNavBar/>
  <ContentFramer :border="false" :top-margin="true" :style="{height: '70vh'}">
    <AdminInfo current-page="Instructors"/>
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
import {defineAsyncComponent} from "vue";
import Loading from "@/components/misc/Loading.vue";
import {useUser} from "@/store";
import {useRouter} from "vue-router";

const InstructorsTable = defineAsyncComponent(() =>
  import('@/components/tables/InstructorsTable.vue')
)
const router = useRouter();
const user = useUser();

if (user.admin === null) {
  router.push("/login/admin");
}

</script>

<style scoped lang="stylus">
.container
  height calc(100% - 10vh)
</style>