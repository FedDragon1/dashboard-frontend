<template>
  <FetchError v-if="!instructorData.success" :error="instructorData.error" @click="loadData"></FetchError>
  <div class="padding" v-else>
    <h2 class="section-header">Course Info</h2>
    <el-table :data="instructorData.data" border>
      <TableColumn prop="uuid" label="UUID" width="200"/>
      <TableColumn prop="name" label="Name"
                   :editable="props.admin"/>
      <TableColumn prop="created" label="Date Created"
                   :editable="props.admin"/>
      <TableColumn prop="instructorUuid" label="Instructor UUID"
                   :editable="props.admin"/>
      <OperationColumn :callbacks="operations" edit width="200"/>
    </el-table>

    <h2 class="section-header">Students</h2>
    <StudentTable :api="`/student/course/${props.uuid}`" :column-policy="studentColumnPolicy"
                  hide-append border edit detail width="200"/>

    <h2 class="section-header">Attendance Record</h2>
    <CourseAttendanceTable :attendance-api="`/attendance/course/${props.uuid}`"
                           :student-api="`/student/course/${props.uuid}`"
                           :course-uuid="uuid"
                           border/>
  </div>
  <br>
</template>

<script setup>
import {defineAsyncComponent, reactive} from "vue";
import {useUser} from "@/store";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import {useCourse, useInstructor} from "@/utils/useHandlers";
import TableColumn from "@/components/tables/columns/TableColumn.vue";

const StudentTable = defineAsyncComponent(() =>
    import('@/components/tables/StudentTable.vue')
)

const CourseAttendanceTable = defineAsyncComponent(() =>
    import('@/components/tables/CourseAttendanceTable.vue')
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
const courseHandler = useCourse();

const loadData = props.admin
    ? async () => {
      return reactive(await useGet(`/courses/${props.uuid}`, courseHandler.postFetch))
    }
    : async () => {
      return reactive(await useGet(`/courses/${props.uuid}/${user.instructor.uuid}`))
    }

const api = props.admin
    ? "/instructor"
    : `/instructor/${user.instructor}`
const instructorData = await loadData();

const attendanceColumnPolicy = reactive(props.admin
    ? {
      hideInstructorUuid: true,
      editableName: true,
      editableDateCreated: true
    }
    : {
      hideInstructorUuid: true,
      editableName: true
    })
const studentColumnPolicy = reactive(props.admin
    ? {
      editableName: true,
      editableGender: true,
      editableBirthday: true,
      hideCourses: true
    }
    : {
      hideCourses: true
    })

const operations = courseHandler.getOperations(api, instructorData);

</script>

<style scoped lang="stylus">
.padding
  padding-left 20px;
  padding-right 20px;

.section-header
  width 100%
  border-bottom 1px solid var(--el-text-color-primary)
</style>