<template>
  <el-table-column :label="label">
    <template #default="scope">
      <el-input v-model="scope.row.updating[field]" :value="scope.row.updating[field]"
                :disabled="!scope.row.editable" class="revert-disable"/>
    </template>
  </el-table-column>
</template>

<script setup>
defineProps(["field", "label"])
</script>

<style scoped>

</style>