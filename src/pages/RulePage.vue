<template>
    <three-line-layout>
        <template #main>
          <t-tabs :value="tabValue">
            <t-tab-panel value="sets" label="规则集">
              <rule-sets/>
            </t-tab-panel>
          </t-tabs>
        </template>
    </three-line-layout>
</template>

<script setup lang="ts">
import ThreeLineLayout from "../layout/ThreeLineLayout.vue";
import {ref} from "vue";
import RuleSets from "../components/rule/RuleSets.vue";

const tabValue = ref('sets')
</script>

<style scoped lang="less">
</style>
