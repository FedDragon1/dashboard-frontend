<template>
  <FetchError v-if="!data.success" :error="data.error" @click="handleNew"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form">
    <el-table-column prop="uuid" label="UUID" width="200"/>
    <EditableColumn prop="name" label="Name"/>
    <EditableColumn prop="password" label="Password"/>
    <DropdownColumn field="courses" label="Courses" :detail-link="(uuid) => `/admin/course/${uuid}`"/>
    <OperationColumn :callbacks="operations" all/>
    <template #append v-if="!hideAppend">
      <AppendBox @new="handleNew" :disabled="instructorHandler.tempObject.value !== null" name="Instructor"/>
    </template>
  </el-table>
</template>

<script setup>
import {ref} from "vue";
import FetchError from "@/components/misc/FetchError.vue";
import AppendBox from "@/components/forms/AppendBox.vue";
import {useRouter} from "vue-router";
import {useGet} from '@/utils/useAxios'
import EditableColumn from "@/components/tables/EditableColumn.vue";
import DropdownColumn from "@/components/tables/DropdownColumn.vue";
import OperationColumn from "@/components/tables/OperationColumn.vue";
import { useInstructor } from "@/utils/useInstructor";

const props = defineProps({
  api: String,
  hideAppend: {
    type: Boolean,
    default: false
  }
});
const form = ref(null);
const data = ref(null);
const router = useRouter();

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