<template>
  <FetchError v-if="!instructorData.success" :error="instructorData.error" @click="loadData"></FetchError>
<div>
  {{ instructorData }}<br>
  {{ instructorStudents }}<br>
  {{ instructorCourses }}
</div>
</template>

<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {useUser} from "@/store";
import {ElMessage} from "element-plus";
import {useGet} from "@/utils/useAxios";
import FetchError from "@/components/misc/FetchError.vue";

const props = defineProps({
  admin: {
    type: Boolean,
    default: false
  },
  uuid: {
    type: String
  }
})


const user = useUser();

const loadData = props.admin
    ? async () => {
      return [
          reactive(await useGet(`/instructor/${props.uuid}`)),
          reactive(await useGet(`/courses/instructor/${props.uuid}`)),
          reactive(await useGet(`/instructor/student/${props.uuid}`))
      ];
    }
    : async () => {
      return [
          reactive(await useGet(`instructor/${props.uuid}/${user.instructor.uuid}`)),
          reactive(await useGet(`/courses/instructor/${props.uuid}/${user.instructor.uuid}`)),
          reactive(await useGet(`/instructor/student/${props.uuid}/${user.instructor.uuid}`))
      ];
    }

const [instructorData, instructorCourses, instructorStudents] = await loadData();

</script>

<style scoped>

</style>