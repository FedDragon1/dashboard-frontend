<template>
  <FetchError v-if="!data.success" :error="data.error" @click="loadData"></FetchError>
  <el-table v-else stripe :data="data.data" ref="form">
    <el-table-column prop="uuid" label="UUID" width="200"/>
    <el-table-column label="Name">
      <template #default="scope">
        <el-input v-model="scope.row.updating.name" :value="scope.row.updating.name"
                  :disabled="!scope.row.editable" class="revert-disable"/>
      </template>
    </el-table-column>
    <el-table-column label="Password">
      <template #default="scope">
        <el-input v-model="scope.row.updating.password" :value="scope.row.updating.password"
                  :disabled="!scope.row.editable" class="revert-disable"/>
      </template>
    </el-table-column>
    <el-table-column label="Courses">
      <template #default="scope">
        <el-select :placeholder="`${scope.row.courses.length} Related`" :disabled="scope.row.editable">
          <el-option
            v-for="item in scope.row.courses"
            :key="item.uuid"
            :value="item.uuid"
          >
            <router-link :to="`/admin/course/${item.uuid}`">{{`${item.name} (${item.uuid})`}}</router-link>
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button link type="success" v-if="scope.row.editable && scope.row.temp === undefined"
                   @click="handleEdit(scope)">Save</el-button>
        <el-button link type="danger" v-if="scope.row.editable && scope.row.temp === undefined"
                   @click="revertEdit(scope)">Cancel</el-button>
        <el-button link type="primary" v-if="!scope.row.editable"
                   @click="handleDetail(scope)">Detail</el-button>
        <el-button link type="primary" v-if="!scope.row.editable"
                   @click="scope.row.editable = true">Edit</el-button>
        <el-button link type="danger" v-if="!scope.row.editable"
                   @click="handleDelete(scope)">Delete</el-button>
<!--temp specific-->
        <el-button link type="success" v-if="scope.row.temp === true"
                   @click="handleCreate(scope)">Create</el-button>
        <el-button link type="danger" v-if="scope.row.temp === true"
                   @click="revertNew(scope)">Cancel</el-button>
      </template>
    </el-table-column>
    <template #append>
      <AppendBox @new="handleNew" :disabled="!(newInstructor === null)" />
    </template>
  </el-table>
  {{data.data}}
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
import FetchError from "@/components/misc/FetchError.vue";
import Qs from "qs";
import { ElMessage } from 'element-plus'
import AppendBox from "@/components/forms/AppendBox.vue";
import useUuid from "@/utils/useUuid";

const props = defineProps(["api"]);
const form = ref(null);
const data = ref(null);
const newInstructor = ref(null);

function handleDetail(scope) {

}

function handleNew() {
  newInstructor.value = {
    uuid: useUuid(),
    name: '',
    password: '',
    courses: [],
    editable: true,
    temp: true,
    updating: {
      name: '',
      password: ''
    }
  };
  data.value.data.push(newInstructor.value)
}

function handleCreate(scope) {
  if (!diffAndAssign(scope)) {
    ElMessage({
      message: "Fields are Empty",
      type: "error"
    })
    return;
  }

  const entity = getInstructorEntity(scope.row);
  axios.post(props.api, Qs.stringify(entity))
      .then((r) => {
        if (r.data.success === false) {
          ElMessage.error(r.data.error)
        }
        ElMessage.success(`Created ${entity.uuid}`)
        delete newInstructor.value.temp;
        scope.row.editable = false;
        newInstructor.value = null;
      })
      .catch(ElMessage.error)
}

function revertNew() {
  if (newInstructor.value === null) {
    ElMessage.error("Nothing to Delete")
  }
  data.value.data.pop();
  newInstructor.value = null;
}

function handleEdit(scope) {
  if (!diffAndAssign(scope)) {
    ElMessage({
      message: "No Change Made",
      type: "warning"
    })
    scope.row.editable = false;
    return;
  }

  const updated = getInstructorEntity(scope.row);
  axios.put(props.api, Qs.stringify(updated))
      .then((r) => {
        if (r.data.success === true) {
          ElMessage({
            message: "Update Success!",
            type: 'success'
          })
        }
      }).catch((e) => {
        ElMessage.error(e)
      }).finally(() => {
        scope.row.editable = false;
      })
}

function handleDelete(scope) {
  const entity = getInstructorEntity(scope.row);
  console.log(entity)
  axios.delete(props.api, {params: entity})
      .then((r) => {
        if (r.data.success === true) {
          ElMessage.success(`Deleted ${entity.uuid}`);
          deleteLocalByUuid(entity.uuid);
          return;
        }
        ElMessage.error(r.data.error);
      })
}

function diffAndAssign(scope) {
  if (scope.row.password === scope.row.updating.password && scope.row.name === scope.row.updating.name) {
    // no diff, no put
    return false;
  }
  scope.row.password = scope.row.updating.password;
  scope.row.name = scope.row.updating.name;
  return true;
}

function revertEdit(scope) {
  scope.row.updating.password = scope.row.password;
  scope.row.updating.name = scope.row.name;
  scope.row.editable = false;
}

function getInstructorEntity(obj) {
  return {
    uuid: obj.uuid,
    name: obj.name,
    password: obj.password
  }
}

function deleteLocalByUuid(uuid) {
  for (var i = 0; i < data.value.data.length; i++) {
    if (data.value.data[i].uuid === uuid) {
      break;
    }
  }

  console.log(i);

  data.value.data.splice(i, 1);
}

async function loadData() {
  const resp = await axios.get(props.api);
  console.log(resp);
  for (const obj of resp.data.data) {
    obj.updating = {
      name: obj.name,
      password: obj.password
    }
    obj.editable = false;
  }
  data.value = resp.data;
}

await loadData();

</script>

<style scoped lang="stylus">
::v-deep(.revert-disable.el-input.is-disabled .el-input__wrapper)
  box-shadow none !important
  background transparent !important

::v-deep(.revert-disable.el-input.is-disabled .el-input__wrapper .el-input__inner)
  color var(--el-table-text-color) !important
  -webkit-text-fill-color  var(--el-table-text-color) !important
</style>