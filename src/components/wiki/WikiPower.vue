<template>
  <p>tips: 点击标签左边小三角展开</p>
  <t-tree
    :data="[wikiRef.power]"
    :keys="{label: 'name', value: 'name'}"
    hover
    @click="onClick"
  >
    <template #label="{node}">
      <span>{{node.label}} {{label === node.label ? '<': ''}}</span>
    </template>
  </t-tree>
  <h1>{{label}}</h1>
  <p>{{desc}}</p>
</template>

<script setup lang="ts">
import {wikiRef} from "../../store/wiki";
import {TreeNodeModel} from "tdesign-vue-next";
import {ref} from "vue";

const desc = ref('')
const label = ref('')

const onClick = (ctx: {node: TreeNodeModel}) => {
  desc.value = ctx.node.data.desc
  label.value = ctx.node.label ?? ''
}
</script>

<style scoped>

</style>
