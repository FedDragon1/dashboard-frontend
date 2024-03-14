<template>
  <el-table-column v-bind="attrs">
    <template #default="scope">
      <el-select :placeholder="`${scope.row[prop].length} Related`" :disabled="scope.row.editable">
        <el-option
            v-for="item in scope.row[prop]"
            :key="item.id"
            :value="item.id"
        >
          <span>{{`student ${item.studentUuid}`}}</span>
        </el-option>
      </el-select>
    </template>
  </el-table-column>
</template>

<script setup>
import {useAttrs} from "vue";

defineProps(["prop"])
const attrs = useAttrs();
</script>

<style scoped>

</style>