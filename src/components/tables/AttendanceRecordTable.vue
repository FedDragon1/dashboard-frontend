<template>
  <FetchError v-if="!data.success" :error="data.error" @click="loadData"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form" :border="border">
    <TableColumn prop="id" label="ID" width="200"
                 :editable="columnPolicy.editableId"
                 v-if="!columnPolicy.hideId"/>
    <TableColumn prop="studentUuid" label="Student UUID"
                 :editable="columnPolicy.editableStudentUuid"
                 v-if="!columnPolicy.hideStudentUuid"/>
    <TableColumn prop="attendanceUuid" label="Attendance UUID"
                 :editable="columnPolicy.editableAttendanceUuid"
                 v-if="!columnPolicy.hideAttendanceUuid"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs" width="200"/>
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="attendanceRecordHandler.tempObject.value !== null" name="Record"/>
    </template>
  </el-table>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref, useAttrs} from "vue";
import {useAttendanceRecord} from "@/utils/useHandlers";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import {useAttendanceTablePolicy} from "@/utils/useTablePolicy";

const props = defineProps({
  api: String,
  hideAppend: {
    type: Boolean,
    default: false
  },
  columnPolicy: Object,
  attendanceUuid: String,
  border: Boolean,
});
const form = ref(null);
const data = ref(null);
const router = useRouter();

const extraAttrs = useAttrs();
const columnPolicy = useAttendanceTablePolicy(props.columnPolicy);

const attendanceRecordHandler = useAttendanceRecord();
const operations = attendanceRecordHandler.getOperations('/attendance-record', data, router);
const handleNew = () => {
  const newRecord = operations.handleNew();
  newRecord.attendanceUuid = props.attendanceUuid;
  newRecord.updating.attendanceUuid = props.attendanceUuid;
  data.value.data.push(newRecord);
};

async function loadData() {
  data.value = await useGet(props.api, attendanceRecordHandler.postFetch);
}

await loadData()
</script>

<style scoped>

</style>