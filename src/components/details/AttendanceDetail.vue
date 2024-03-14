<template>
  <FetchError v-if="!attendanceData.success" :error="attendanceData.error" @click="loadData"></FetchError>
  <div class="padding" v-else>
    <h2 class="section-header">Attendance Info</h2>
    <el-table :data="attendanceData.data" border>
      <TableColumn prop="uuid" label="UUID" width="200"/>
      <TableColumn prop="date" label="Date" :editable="props.admin"/>
      <TableColumn prop="courseUuid" label="Course UUID" :editable="props.admin"/>
      <RecordColumn prop="records" label="Records"/>
      <OperationColumn :callbacks="operations" edit width="200"/>
    </el-table>

    <h2 class="section-header">Records</h2>
    <AttendanceRecordTable :api="`/attendance-record/${props.uuid}`"
                           :column-policy="courseColumnPolicy"
                           :attendanceUuid="props.uuid"
                           border edit create del/>
  </div>
  <br>
</template>

<script setup>
import {defineAsyncComponent, reactive} from "vue";
import {useUser} from "@/store";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import {useAttendance} from "@/utils/useHandlers";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import RecordColumn from "@/components/tables/columns/RecordColumn.vue";

const AttendanceRecordTable = defineAsyncComponent(() =>
    import('@/components/tables/AttendanceRecordTable.vue')
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
const attendanceHandler = useAttendance();

const loadData = props.admin
    ? async () => {
      return reactive(await useGet(`/attendance/${props.uuid}`, attendanceHandler.postFetch))
    }
    : async () => {
      return reactive(await useGet(`/attendance/${props.uuid}/${user.instructor.uuid}`))
    }

const api = props.admin
    ? "/attendance"
    : `/attendance/${user.instructor}`
const attendanceData = await loadData();

const courseColumnPolicy = reactive(props.admin
    ? {
      hideAttendanceUuid: true,
      editableStudentUuid: true,
    }
    : {
      hideAttendanceUuid: true,
      editableStudentUuid: true
    })

const operations = attendanceHandler.getOperations(api, attendanceData);
</script>

<style scoped lang="stylus">
.padding
  padding-left 20px;
  padding-right 20px;

.section-header
  width 100%
  border-bottom 1px solid var(--el-text-color-primary)
</style>