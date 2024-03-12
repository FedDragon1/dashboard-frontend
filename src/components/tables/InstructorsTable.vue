<template>
  <FetchError v-if="!data.success" :error="data.error" @click="handleNew"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form">
    <TableColumn prop="uuid" label="UUID" width="200"
                 :editable="columnPolicy.editableUuid"
                 v-if="!columnPolicy.hideUuid"/>
    <TableColumn prop="name" label="Name"
                 :editable="columnPolicy.editableName"
                 v-if="!columnPolicy.hideName"/>
    <TableColumn prop="password" label="Password"
                 :editable="columnPolicy.editablePassword"
                 v-if="!columnPolicy.hidePassword"/>
    <DropdownColumn field="courses" label="Courses"
                    :detail-link="(uuid) => `/admin/course/${uuid}`"
                    v-if="!columnPolicy.hideCourses"/>
    <OperationColumn :callbacks="operations" v-bind="extraAttrs"/>
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="instructorHandler.tempObject.value !== null" name="Instructor"/>
    </template>
  </el-table>
</template>

<script setup>
import {ref, useAttrs} from "vue";
import FetchError from "@/components/misc/FetchError.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import {useRouter} from "vue-router";
import {useGet} from '@/utils/useAxios'
import EditableColumn from "@/components/tables/columns/EditableColumn.vue";
import DropdownColumn from "@/components/tables/columns/DropdownColumn.vue";
import OperationColumn from "@/components/tables/columns/OperationColumn.vue";
import { useInstructor } from "@/utils/useHandlers";
import TableColumn from "@/components/tables/columns/TableColumn.vue";
import {useInstructorTablePolicy} from "@/utils/useTablePolicy";

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
const columnPolicy = useInstructorTablePolicy(props.columnPolicy);

const instructorHandler = useInstructor();
const operations = instructorHandler.getOperations(props.api, data, router,
    (scope) => `/admin/instructor/${scope.row.uuid}`);

const handleNew = () => data.value.data.push(operations.handleNew());

async function loadData() {
  data.value = await useGet(props.api, instructorHandler.postFetch)
}

await loadData();
</script>

<style scoped lang="stylus">

</style>