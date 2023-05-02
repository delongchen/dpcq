<template>
  <rule-add/>
  <rule-set-card
    v-for="set in sets"
    :set="set"
    :key="`rule-set-${set.getID()}`"
  />
</template>

<script lang="ts" setup>
import RuleSetCard from "./RuleSetCard.vue";
import RuleAdd from "./RuleAdd.vue";
import {setsMap, setIdRef} from "../../store/rule";
import {computed} from "vue";

const sets = computed(() => [...setsMap.value.values()])
</script>

<style scoped lang="less">
</style>
