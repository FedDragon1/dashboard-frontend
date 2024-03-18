<template>
  <FetchError v-if="!(attendances.success && students.success)"
              :error="attendances.error || students.error"
              @click="loadData"></FetchError>

  <el-table v-else stripe :data="tableData" ref="form" :border="border">
    <el-table-column prop="date" label="Date" width="100" fixed/>
    <el-table-column v-for="student in students.data" :key="student.uuid"
                     :label="`${student.name}(${student.uuid})`">
      <template #default="scope">
        <RecordCheckBox :exist="student.uuid in scope.row.completion"
                        :student-uuid="student.uuid"
                        :attendance-uuid="scope.row.uuid"
                        :record-id="scope.row.completion[student.uuid] || -1"/>
      </template>
    </el-table-column>
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="false" name="Attendance"/>
    </template>
  </el-table>

  <el-dialog v-model="showNewAttendance" title="New Attendance">
    <el-form :model="attendanceHandler.tempObject">
      <el-form-item>
        <el-calendar v-model="attendanceDate">

        </el-calendar>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button plain @click="handleCancel">Cancel</el-button>
        <el-button plain type="primary" @click="handleSubmit">Confirm</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import {computed, reactive, ref, useAttrs} from "vue";
import {useGet, usePost} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import RecordCheckBox from "@/components/misc/RecordCheckBox.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import {useAttendance} from "@/utils/useHandlers";

const props = defineProps({
  attendanceApi: String,
  studentApi: String,
  hideAppend: Boolean,
  border: Boolean,
  courseUuid: String
})
const attendances = ref(null);
const students = ref(null);
const tableData = ref(null);

const attendanceHandler = useAttendance();
const attendanceOperations = attendanceHandler.getOperations();

const showNewAttendance = ref(false);
const attendanceDate = ref(new Date());

function handleNew() {
  const obj = attendanceOperations.handleNew();
  obj.courseUuid = props.courseUuid;
  obj.updating.courseUuid = props.courseUuid;
  showNewAttendance.value = true;
}

function handleCancel() {
  showNewAttendance.value = false;
}

function handleSubmit() {
  attendanceHandler.tempObject.value.date = attendanceDate.value.toJSON().slice(0, 10);
  attendanceHandler.tempObject.value.updating.date = attendanceDate.value.toJSON().slice(0, 10);
  const entity = attendanceHandler.getEntity(attendanceHandler.tempObject.value);
  console.log(entity);
  usePost("/attendance", entity, "Created Attendance",
      () => {
        showNewAttendance.value = false;
        loadData();
      })
}

function generateTableData(attendances) {
  const model = [];

  console.log(attendances.data)

  for (const attendance of attendances.data) {
    const thisAttendance = {
      uuid: attendance.uuid,
      date: attendance.date,
    }

    const completion = {};
    for (const record of attendance.records) {
      completion[record.studentUuid] = record.id;
    }

    thisAttendance.completion = completion;
    model.push(thisAttendance);
  }

  return model
}

async function loadData() {
  attendances.value = await useGet(props.attendanceApi);
  students.value = await useGet(props.studentApi);
  tableData.value = generateTableData(attendances.value, students.value);
}

await loadData();
</script>

<style scoped lang="stylus">
:deep(.el-calendar-table .el-calendar-day) {
  height 50px !important
}
</style>