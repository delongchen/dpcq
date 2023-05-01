<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue'
import DpcqHeader from "./components/DpcqHeader.vue";
</script>

<template>
    <main-layout>
        <template #header><dpcq-header/></template>
        <template #main><router-view/></template>
    </main-layout>
</template>

<style scoped lang="less">
#bottom-bt {
  display: flex;
  justify-content: center;
}

.aside-bt {
  height: 100%;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
}
</style>
