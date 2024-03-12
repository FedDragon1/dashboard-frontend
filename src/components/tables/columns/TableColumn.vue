<template>
  <template v-if="editable">
    <EditableColumn v-bind="attrs" :ref="a">
      <slot/>
    </EditableColumn>
  </template>
  <template v-else-if="!hasSlot('default')">
    <el-table-column v-bind="attrs" :ref="a"/>
  </template>
  <template v-else>
    <el-table-column v-bind="attrs" :ref="a">
      <slot/>
    </el-table-column>
  </template>
</template>

<script setup>
import {ref, useAttrs, useSlots} from "vue";
import EditableColumn from "@/components/tables/columns/EditableColumn.vue";

defineProps({
  editable: Boolean
})

const slots = useSlots()
const hasSlot = (name) => {
  return !!slots[name];
}

const attrs = useAttrs();
const a = ref(null)
</script>

<style scoped>

</style>