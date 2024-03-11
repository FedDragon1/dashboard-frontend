<template>
  <el-table-column :label="label">
    <template #default="scope">
      <el-input v-model="scope.row.updating[prop]" :value="scope.row.updating[prop]"
                :disabled="!scope.row.editable" class="revert-disable"/>
    </template>
  </el-table-column>
</template>

<script setup>
defineProps(["prop", "label"])
</script>

<style scoped lang="stylus">

</style>