<template>
  <FetchError v-if="!data.success" :error="data.error" @click="loadData"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form" :border="border">
    <TableColumn prop="uuid" label="UUID" width="200"
                 :editable="columnPolicy.editableUuid"
                 v-if="!columnPolicy.hideUuid"/>
    <TableColumn prop="name" label="Name"
                 :editable="columnPolicy.editableName"
                 v-if="!columnPolicy.hideName"/>
    <TableColumn prop="gender" label="Gender"
                 :editable="columnPolicy.editableGender"
                 v-if="!columnPolicy.hideGender"/>
    <TableColumn prop="birthday" label="Birthday"
                 :editable="columnPolicy.editableBirthday"
                 v-if="!columnPolicy.hideBirthday"/>
    <DropdownColumn field="courses" label="Courses" :detail-link="(uuid) => `/admin/course/${uuid}`"
                 v-if="!columnPolicy.hideCourses"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs" />
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="studentHandler.tempObject.value !== null" name="Student"/>
    </template>
  </el-table>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref, useAttrs} from "vue";
import {useStudent} from "@/utils/useHandlers";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import EditableColumn from "@/components/tables/columns/EditableColumn.vue";
import DropdownColumn from "@/components/tables/columns/DropdownColumn.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import {useCourseTablePolicy, useStudentTablePolicy} from "@/utils/useTablePolicy";

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
const columnPolicy = useStudentTablePolicy(props.columnPolicy);

const studentHandler = useStudent();
const operations = studentHandler.getOperations('/student', data, router,
    (scope) => `/admin/student/${scope.row.uuid}`);
const handleNew = () => data.value.data.push(operations.handleNew());

async function loadData() {
  data.value = await useGet(props.api, studentHandler.postFetch);
}

await loadData()
</script>

<style scoped>

</style>