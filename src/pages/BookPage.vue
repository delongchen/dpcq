<template>
  <three-line-layout>
      <template #left><div class="aside-bt" @click="back"></div></template>
      <template #right><div class="aside-bt" @click="next"></div></template>
      <template #main>
          <h1 style="text-align: center">#{{ChapterRef.id}} {{ChapterRef.title}}</h1>
          <show-chapter/>
      </template>
  </three-line-layout>
</template>

<script setup lang="ts">
import {goPerChapter, goNextChapter, ChapterRef} from "../store/chapter";
import ShowChapter from "../components/ShowChapter.vue";
import ThreeLineLayout from "../layout/ThreeLineLayout.vue";

const backTop = () => {
  scrollTo({ top: 0 })
}
const back = () => { goPerChapter().then(backTop) }
const next = () => { goNextChapter().then(backTop) }
</script>

<style scoped lang="less">
.aside-bt {
  height: 100%;
  &:hover {
    background-color: #e9e9e9;
  }
}
</style>
