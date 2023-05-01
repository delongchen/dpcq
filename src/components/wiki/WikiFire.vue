<template>
  <t-collapse>
    <t-collapse-panel
      v-for="(fire, key) in wikiRef.fires"
      :key="`fire-${key}`"
      :header="`#${fire.rank} ${fire.name}`"
    >
      {{fire.desc}}
    </t-collapse-panel>
  </t-collapse>
</template>

<script setup lang="ts">
import {wikiRef} from "../../store/wiki";

</script>

<style scoped>

</style>
