<template>
  <three-line-layout>
    <template #main>
      <t-tabs :default-value="1">
        <t-tab-panel :value="1" label="规则集">
          <rule-sets/>
        </t-tab-panel>
        <t-tab-panel :value="2" label="样式">
          <rule-style/>
        </t-tab-panel>
      </t-tabs>
    </template>
  </three-line-layout>
</template>

<script setup lang="ts">
import ThreeLineLayout from "../layout/ThreeLineLayout.vue";
import RuleSets from "../components/rule/RuleSets.vue";
import RuleStyle from "../components/RuleStyle.vue";
</script>

<style scoped lang="less">
</style>
