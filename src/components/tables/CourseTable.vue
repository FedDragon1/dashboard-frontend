<template>
  <FetchError v-if="!data.success" :error="data.error" @click="handleNew"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form" :border="border">
    <TableColumn prop="uuid" label="UUID" width="200"
                 :editable="columnPolicy.editableUuid"
                 v-if="!columnPolicy.hideUuid"/>
    <TableColumn prop="name" label="Name"
                 :editable="columnPolicy.editableName"
                 v-if="!columnPolicy.hideName"/>
    <TableColumn prop="created" label="Date Created"
                 :editable="columnPolicy.editableDateCreated"
                 v-if="!columnPolicy.hideDateCreated"/>
    <TableColumn prop="instructorUuid" label="Instructor UUID"
                 :editable="columnPolicy.editableInstructorUuid"
                 v-if="!columnPolicy.hideInstructorUuid"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs" width="200"/>
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="courseHandler.tempObject.value !== null" name="Course"/>
    </template>
  </el-table>
</template>

<script setup>

import {useRouter} from "vue-router";
import {reactive, ref, useAttrs} from "vue";
import {useCourse, useStudent} from "@/utils/useInstructor";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";
import EditableColumn from "@/components/tables/EditableColumn.vue";
import OperationColumn from "@/components/tables/OperationColumn.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import TableColumn from "@/components/tables/TableColumn.vue";
import {useCourseTablePolicy} from "@/utils/useTablePolicy";

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
const columnPolicy = useCourseTablePolicy(props.columnPolicy);

const courseHandler = useCourse();
const operations = courseHandler.getOperations('/courses', data, router,
    (scope) => `/admin/course/${scope.row.uuid}`);
const handleNew = () => data.value.data.push(operations.handleNew());

async function loadData() {
  data.value = await useGet(props.api, courseHandler.postFetch);
}

await loadData()
</script>

<style scoped>

</style>