<template>
    <t-head-menu theme="dark">
        <template #logo>
            <h1 @click="() => {router.push({ path: '/' })}" style="cursor: pointer">
                fuck sky
            </h1>
        </template>

        <template #operations>
            <t-button
              v-for="(action, key) in actions"
              :key="`header-action-${key}`"
              @click="() => {router.push({ path: `/${action.name}` })}"
              variant="base"
              theme="primary"
            >{{action.text}}</t-button>
        </template>
    </t-head-menu>
</template>

<script setup lang="ts">
import {staticRoutes} from "../router";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const top = computed(() => route.path.split('/')[1])

const actions = computed(() => {
  const result: {name: string, text: string}[] = []

  for (const r of staticRoutes) {
    if (
      r.path !== '/' &&
      typeof r.name === 'string' &&
      r.name !== top.value
    ) {
      result.push({
        name: r.name,
        text: <string>r.meta?.text ?? r.name
      })
    }
  }

  return result
})
</script>

<style lang="less">
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}

.t-demo-menu--dark {
  .t-button {
    color: #fff;

    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>
