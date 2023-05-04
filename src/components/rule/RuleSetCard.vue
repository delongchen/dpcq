<template>
  <t-card :style="{marginTop: '10px'}">
    <template #title>
      <t-tag
        theme="success"
        :style="{marginRight: '10px'}"
        v-if="isUsing"
      >使用中</t-tag>
      <span>{{ raw.name }}</span>
    </template>

    <template #actions>
      <t-space size="small">
        <t-button theme="danger" @click="deleteRuleSet">删除</t-button>
        <t-button v-if="!isUsing" @click="useRuleSet">使用</t-button>
        <t-button @click="showMore = !showMore">{{ showMore ? '收起 <' : '详情 >' }}</t-button>
      </t-space>
    </template>

    <div>{{ raw.desc }}</div>

    <t-button
      style="width: 100%; margin-top: 10px; margin-bottom: 10px"
      theme="primary"
      variant="dashed"
      v-show="showMore"
    >添加条目</t-button>

    <t-collapse
      :expand-on-row-click="false"
      v-if="props.set.ruleMap.size !== 0"
      v-show="showMore"
    >
      <t-collapse-panel
        v-for="rule in rules"
        :key="`rule-item-${rule.id}`"
      >
        <template #header>
          <span>{{ [...rule.targets].join('/') }}</span>
          <span style="margin: 0 10px 0 10px">></span>
          <span :style="rule.style">{{ rule.replace ?? '{self}' }}</span>
        </template>

        <template #content>
          <t-tag-input
            :value="[...rule.targets]"
            label="targets: "
            @remove="ctx => { removeOneTarget(ctx, rule) }"
          />
          <t-input
            :value="rule.replace"
            @change="v => { replaceChange(v, rule) }"
            label="replace: "
            :style="{marginTop: '10px'}"
          />
          <div :style="{marginTop: '10px'}">
            <span>style: </span>
            <t-select
            ></t-select>
          </div>
        </template>
      </t-collapse-panel>
    </t-collapse>
  </t-card>
</template>

<script setup lang="ts">
import {RuleSet, compileReplace} from "../../utils/RuleSet";
import {computed, ref} from "vue";
import {setIdRef, deleteSet, useSet} from "../../store/rule";
import {TagInputRemoveContext} from "tdesign-vue-next";
import {RuleItem} from "../../types/rule";

const props = defineProps<{
  set: RuleSet
}>()

const raw = computed(() => props.set.getRaw())
const isUsing = computed(() => raw.value.id === setIdRef.value)
const rules = computed(() => [...props.set.ruleMap.values()])
const showMore = ref(false)

const deleteRuleSet = () => {
  deleteSet(props.set.getID())
}

const useRuleSet = () => {
  useSet(props.set.getID())
}

const removeOneTarget = (ctx: TagInputRemoveContext, rule: RuleItem) => {
  const item = ctx.item
  if (typeof item === 'string') {
    props.set.getTrie().remove(item)
    rule.targets.delete(item)
  }
}

const replaceChange = (s: string, rule: RuleItem) => {
  if (s.length === 0) {
    s = '{empty}'
  }
  const trie = props.set.getTrie()
  for (const target of rule.targets) {
    trie.add(target, {
      target,
      replace: compileReplace(target, s),
      style: rule.style ?? {}
    })
  }
  rule.replace = s
}
</script>

<style scoped>

</style>
