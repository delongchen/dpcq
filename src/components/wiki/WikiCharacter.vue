<template>
  <div>
    <h1>主要角色</h1>
    <t-card
      v-for="(role, key) in wikiRef.character.main"
      :key="`main-role-${key}`"
      :title="role.name"
      style="margin-top: 20px"
    >
      {{role.desc}}
    </t-card>
  </div>
  <div style="margin-bottom: 20px">
    <h1>配角</h1>
    <t-collapse>
      <t-collapse-panel
        v-for="(role, key) in wikiRef.character.supportingRole"
        :key="`not-main-role-${key}`"
        :header="role.name"
      >
        {{role.desc}}
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script setup lang="ts">
import {wikiRef} from "../../store/wiki";
</script>

<style scoped>

</style>
