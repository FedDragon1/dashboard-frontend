<template>
  <FetchError v-if="!data.success" :error="data.error" @click="handleNew"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form" :border="border">
    <TableColumn prop="courseUuid" label="Course UUID" width="200"
                 :editable="columnPolicy.editableCourseUuid"
                 v-if="!columnPolicy.hideCourseUuid"/>
    <TableColumn prop="courseName" label="Course Name"
                 :editable="columnPolicy.editableCourseName"
                 v-if="!columnPolicy.hideCourseName"/>
    <TableColumn prop="grade" label="Grade"
                 :editable="columnPolicy.editableGrade"
                 v-if="!columnPolicy.hideGrade"/>
    <TableColumn prop="studentUuid" label="Student UUID"
                 :editable="columnPolicy.editableStudentUuid"
                 v-if="!columnPolicy.hideStudentUuid"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs" />
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="courseMemberHandler.tempObject.value !== null" name="Student"/>
    </template>
  </el-table>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref, useAttrs} from "vue";
import {useCourseMember, useStudent} from "@/utils/useHandlers";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import {useCourseMemberTablePolicy} from "@/utils/useTablePolicy";

const props = defineProps({
  api: String,
  hideAppend: {
    type: Boolean,
    default: false
  },
  columnPolicy: Object,
  border: Boolean,
});
const form = ref(null);
const data = ref(null);
const router = useRouter();

const extraAttrs = useAttrs();
const columnPolicy = useCourseMemberTablePolicy(props.columnPolicy);

const courseMemberHandler = useCourseMember();
const operations = courseMemberHandler.getOperations('/course-member', data, router,
    (scope) => `/admin/course/${scope.row.courseUuid}`);
const handleNew = () => data.value.data.push(operations.handleNew());

async function loadData() {
  data.value = await useGet(props.api, courseMemberHandler.postFetch);
  console.log(data)
}

await loadData()
</script>

<style scoped>

</style>