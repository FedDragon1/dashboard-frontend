<template>
  <el-table-column label="Operations" :width="width">
    <template #default="scope">
      <el-button link type="primary" v-if="!scope.row.editable && (all || detail)"
                 @click="callbacks.handleDetail(scope)">Detail
      </el-button>

      <el-button link type="primary" v-if="!scope.row.editable && (all || edit)"
                 @click="scope.row.editable = true">Edit
      </el-button>
      <el-button link type="success" v-if="scope.row.editable && scope.row.temp === undefined && (all || edit)"
                 @click="callbacks.handleSave(scope)">Save
      </el-button>
      <el-button link type="danger" v-if="scope.row.editable && scope.row.temp === undefined && (all || edit)"
                 @click="callbacks.handleCancel(scope)">Cancel
      </el-button>

      <el-button link type="success" v-if="scope.row.temp === true && (all || create)"
                 @click="callbacks.handleCreate(scope)">Create
      </el-button>
      <el-button link type="danger" v-if="scope.row.temp === true && (all || create)"
                 @click="callbacks.handleCancelCreate(scope)">Cancel
      </el-button>

      <el-button link type="danger" v-if="!scope.row.editable && (all || del)"
                 @click="callbacks.handleDelete(scope)">Delete
      </el-button>
    </template>
  </el-table-column>
</template>

<script setup>
defineProps({
  "callbacks": undefined,
  all: Boolean,
  "detail": Boolean,
  "edit": Boolean,
  "create": Boolean,
  "del": Boolean,
  "width": String
})
</script>

<style scoped>

</style>