<template>
  <el-table-column :label="label">
    <template #default="scope">
      <el-select :placeholder="`${scope.row[field].length} Related`" :disabled="scope.row.editable">
        <el-option
            v-for="item in scope.row[field]"
            :key="item.uuid"
            :value="item.uuid"
        >
          <router-link :to="detailLink(item.uuid)">{{`${item.name} (${item.uuid})`}}</router-link>
        </el-option>
      </el-select>
    </template>
  </el-table-column>
</template>

<script setup>
defineProps(["label", "field", "detailLink"])
</script>

<style scoped>

</style>