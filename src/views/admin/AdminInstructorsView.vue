<template>
  <AdminTemplate subtitle="Instructors">
    <InstructorsTable api="/instructor" ></InstructorsTable>
  </AdminTemplate>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
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