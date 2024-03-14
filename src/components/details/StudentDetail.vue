<template>
  <FetchError v-if="!studentData.success" :error="studentData.error" @click="loadData"></FetchError>
  <div class="padding" v-else>
    <h2 class="section-header">Student Info</h2>
    <el-table :data="studentData.data" border>
      <TableColumn prop="uuid" label="UUID" width="200"/>
      <TableColumn prop="name" label="Name" :editable="props.admin"/>
      <TableColumn prop="gender" label="Gender" :editable="props.admin"/>
      <TableColumn prop="birthday" label="Birthday" :editable="props.admin"/>
      <OperationColumn :callbacks="operations" edit width="200"/>
    </el-table>

    <h2 class="section-header">Courses</h2>
    <CourseMemberTable :api="`/course-member/student/${props.uuid}`" :column-policy="courseColumnPolicy"
                 hide-append border edit detail/>
  </div>
  <br>
</template>

<script setup>
import {defineAsyncComponent, reactive} from "vue";
import {useUser} from "@/store";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import {useStudent} from "@/utils/useHandlers";
import TableColumn from "@/components/tables/columns/TableColumn.vue";

const CourseMemberTable = defineAsyncComponent(() =>
    import('@/components/tables/CourseMemberTable.vue')
)

const props = defineProps({
  admin: {
    type: Boolean,
    default: false
  },
  uuid: {
    type: String
  }
});

const user = useUser();
const studentHandler = useStudent();

const loadData = props.admin
    ? async () => {
      return reactive(await useGet(`/student/${props.uuid}`, studentHandler.postFetch))
    }
    : async () => {
      return reactive(await useGet(`/student/${props.uuid}/${user.instructor.uuid}`))
    }

const api = props.admin
    ? "/instructor"
    : `/instructor/${user.instructor}`
const studentData = await loadData();

const courseColumnPolicy = reactive(props.admin
    ? {
      hideStudentUuid: true,
      editableGrade: true,
    }
    : {
      hideStudentUuid: true,
      editableGrade: true
    })

const operations = studentHandler.getOperations(api, studentData);

</script>

<style scoped lang="stylus">
.padding
  padding-left 20px;
  padding-right 20px;

.section-header
  width 100%
  border-bottom 1px solid var(--el-text-color-primary)
</style>