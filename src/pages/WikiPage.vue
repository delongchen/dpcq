<template>
  <three-line-layout>
    <template #main>
      <t-button
        v-for="(item, key) in wikiButton"
        :key="`wiki-item-${key}`"
        class="wiki-bt"
        :disabled="item.show"
        :loading="item.loading"
        @click="goWiki(item)"
      >{{item.text}}</t-button>
      <router-view/>
    </template>
  </three-line-layout>
</template>

<script setup lang="ts">
import ThreeLineLayout from "../layout/ThreeLineLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {watchEffect, ref} from "vue";

const route = useRoute()
const router = useRouter()

const wikiButton = ref([
  {show: true, loading: false, text: '势力', path: 'power'},
  {show: true, loading: false, text: '角色', path: 'character'},
  {show: true, loading: false, text: '异火', path: 'fires'}
])

const goWiki = (info: {show: boolean, loading: boolean, text: string, path: string}) => {
  info.loading = true
  router.push({path: '/wiki/' + info.path})
    .finally(() => {
      info.loading = false
    })
}

watchEffect(() => {
  for (const item of wikiButton.value) {
    item.show = route.path.includes(item.path)
  }
})
</script>

<style scoped lang="less">
.wiki-bt {
  margin: 20px;
}
</style>
