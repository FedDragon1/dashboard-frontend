<template>
  <FetchError v-if="!data.success" :error="data.error" @click="handleNew"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form" :border="border">
    <TableColumn prop="uuid" label="UUID" width="200"
                 :editable="columnPolicy.editableUuid"
                 v-if="!columnPolicy.hideUuid"/>
    <TableColumn prop="date" label="Date"
                 :editable="columnPolicy.editableDate"
                 v-if="!columnPolicy.hideDate"/>
    <TableColumn prop="courseUuid" label="Course UUID"
                 :editable="columnPolicy.editableCourseUuid"
                 v-if="!columnPolicy.hideCourseUuid"/>
    <RecordColumn prop="records" label="Records" v-if="!columnPolicy.hideRecords"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs" />
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="attendanceHandler.tempObject.value !== null" name="Attendance"/>
    </template>
  </el-table>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref, useAttrs} from "vue";
import {useAttendance, useCourseMember, useStudent} from "@/utils/useHandlers";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import {useAttendanceTablePolicy, useCourseMemberTablePolicy} from "@/utils/useTablePolicy";
import DropdownColumn from "@/components/tables/columns/DropdownColumn.vue";
import RecordColumn from "@/components/tables/columns/RecordColumn.vue";

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
const columnPolicy = useAttendanceTablePolicy(props.columnPolicy);

const attendanceHandler = useAttendance();
const operations = attendanceHandler.getOperations('/attendance', data, router,
    (scope) => `/admin/attendance/${scope.row.uuid}`);

const handleNew = () => data.value.data.push(operations.handleNew());

async function loadData() {
  data.value = await useGet(props.api, attendanceHandler.postFetch);
  console.log(data)
}

await loadData()
</script>

<style scoped>
</style>