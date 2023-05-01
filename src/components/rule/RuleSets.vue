<template>
  <t-button
    variant="dashed"
    theme="primary"
    style="width: 100%; margin-top: 20px"
  >添加新规则集</t-button>

  <t-card
    v-for="(set, setKey) in allSets"
    :key="`sets-card-${setKey}`"
    :subtitle="set.desc"
    class="sets-card"
  >
    <template #title>
      <t-tag
        theme="success"
        style="margin-right: 10px"
        v-if="applyingRuleSet.id === set.id"
      >使用中</t-tag>
      <span>{{set.name}}</span>
    </template>
    <template #actions>
      <t-button
        v-if="applyingRuleSet.id !== set.id"
        @click="applySet(set)"
      >应用</t-button>
      <t-button
        style="margin-left: 10px"
        :disabled="set.id === 0"
        @click="() => { showSet.has(set.id) ? showSet.delete(set.id) : showSet.add(set.id) }"
      >{{showSet.has(set.id) ? '收起': '详细'}}</t-button>
    </template>

    <div v-if="showSet.has(set.id)">
      <t-button
        style="width: 100%; margin-bottom: 10px"
        variant="dashed"
      >添加</t-button>

      <t-collapse :expand-on-row-click="false">
        <t-collapse-panel
          v-for="(rule, ruleKey) in set.data"
          :key="`rule-${set.id}-${ruleKey}`"
        >
          <template #header>
            <div>{{rule.targets.join(', ')}} > <span :style="rule.style">{{rule.replace ?? '$self'}}</span></div>
          </template>

          <template #header-right-content>
            <t-space size="small">
              <t-button size="small">use</t-button>
              <t-button size="small" @click="deleteRule">delete</t-button>
            </t-space>
          </template>

          <t-tag-input
            v-model="rule.targets"
            label="查找目标: "
            @remove="ctx => { removeTarget(ctx, set, ruleKey) }"
          ></t-tag-input>
        </t-collapse-panel>
      </t-collapse>
    </div>
  </t-card>
</template>

<script lang="ts" setup>
import {allSets, applyingRuleSet, applySet, trieRemove} from "../../store/rule";
import {ref} from "vue";
import {TagInputRemoveContext} from "tdesign-vue-next";
import {RuleItemRaw, RuleSetRaw} from "../../types/rule";

const showSet = ref(new Set<number>())

const removeTarget = (ctx: TagInputRemoveContext, set: RuleSetRaw, ruleKey: number) => {
  const rule = set.data[ruleKey]
  if (rule.targets.length === 0) {
    const temp: RuleItemRaw[] = []
    for (let i = 0; i < set.data.length; i++) {
      if (i !== ruleKey) temp.push(set.data[i])
    }
    set.data = temp
  }
}

const deleteRule = () => {

}
</script>

<style scoped lang="less">
.sets-card {
  margin-top: 20px;
}
</style>
