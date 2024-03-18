<template>
  <el-checkbox v-model="exist" size="large" :checked="props.exist" @click.prevent="handleChange"/>
</template>

<script setup>
import {ref} from "vue";
import {useUser} from "@/store";
import axios from "axios";
import {ElMessage} from "element-plus";

const props = defineProps({
  exist: Boolean,
  recordId: Number,
  studentUuid: String,
  attendanceUuid: String
})

const exist = ref(props.exist);
const recordId = ref(props.recordId);
const user = useUser();
const api = user.admin
    ? `/attendance-record`
    : ``  //TODO

function handleChange() {
  if (exist.value) {
    deleteRecord();
  } else {
    createRecord();
  }
  exist.value = !exist.value;
}

function deleteRecord() {
  axios.delete(api, {params: {id: recordId.value}})
      .then(() => ElMessage.success("Deleted Record"))
      .catch(ElMessage.error)
}

function createRecord() {
  const temp = Math.floor(Math.random() * 100_000_000);
  axios.post(api, {
    id: temp,
    studentUuid: props.studentUuid,
    attendanceUuid: props.attendanceUuid
  }).then(() => {
    recordId.value = temp;
    ElMessage.success("Created Record")
  })
    .catch(ElMessage.error)
}

</script>

<style scoped>

</style>