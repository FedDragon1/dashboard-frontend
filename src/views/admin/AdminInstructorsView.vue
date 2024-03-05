<template>
  <AdminTemplate subtitle="Instructors">
    <InstructorsTable api="/instructor"></InstructorsTable>
  </AdminTemplate>
</template>

<script setup>
import AdminNavBar from "@/components/nav/AdminNavBar.vue";
import ContentFramer from "@/components/misc/ContentFramer.vue";
import AdminInfo from "@/components/misc/AdminInfo.vue";
import {defineAsyncComponent} from "vue";
import Loading from "@/components/misc/Loading.vue";
import {useUser} from "@/store";
import {useRouter} from "vue-router";
import AdminTemplate from "@/components/misc/AdminTemplate.vue";

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