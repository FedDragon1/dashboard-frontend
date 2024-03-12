<template>
  <AdminTemplate subtitle="Instructors">
    <StudentTable api="/student" all
                      :column-policy="studentColumnPolicy"></StudentTable>
  </AdminTemplate>
</template>

<script setup>
import AdminTemplate from "@/components/misc/AdminTemplate.vue";
import {defineAsyncComponent, reactive} from "vue";
import {useRouter} from "vue-router";
import {useUser} from "@/store";

const StudentTable = defineAsyncComponent(() =>
    import('@/components/tables/StudentTable.vue')
)
const router = useRouter();
const user = useUser();

const studentColumnPolicy = reactive({
  editableName: true,
  editableGender: true,
  editableBirthday: true
})

if (user.admin === null) {
  router.push("/login/admin");
}
</script>

<style scoped>

</style>