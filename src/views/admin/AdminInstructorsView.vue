<template>
  <AdminTemplate subtitle="Instructors">
    <InstructorsTable api="/instructor" all
                      :column-policy="instructorColumnPolicy"></InstructorsTable>
  </AdminTemplate>
</template>

<script setup>
import {defineAsyncComponent, reactive} from "vue";
import {useUser} from "@/store";
import {useRouter} from "vue-router";
import AdminTemplate from "@/components/misc/AdminTemplate.vue";

const InstructorsTable = defineAsyncComponent(() =>
  import('@/components/tables/InstructorsTable.vue')
)
const router = useRouter();
const user = useUser();

const instructorColumnPolicy = reactive({
  editableName: true,
  editablePassword: true
})

if (user.admin === null) {
  router.push("/login/admin");
}

</script>

<style scoped lang="stylus">
.container
  height calc(100% - 10vh)
</style>