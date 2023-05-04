<template>
  <t-button
    :style="{marginTop: '20px', marginBottom: '20px', width: '100%'}"
    theme="primary"
    variant="dashed"
    @click="showForm = !showForm"
  >添加规则集{{showForm ? ' ^': ''}}</t-button>

  <t-form
    v-show="showForm"
    :data="formData"
  >
    <div style="text-align: center; margin-bottom: 10px">
      <t-tag
        theme="danger"
        v-show="formData.name.length === 0"
      >至少名字不能为空8</t-tag>
    </div>

    <t-form-item label="规则集名称" name="name">
      <t-input v-model="formData.name"></t-input>
    </t-form-item>

    <t-form-item label="描述" name="desc">
      <t-textarea placeholder="描述一下这个规则集，来点骚话" v-model="formData.desc"></t-textarea>
    </t-form-item>
  </t-form>

  <div v-show="showForm" style="text-align: center">
    <t-button
      style="margin-top: 10px"
      @click="submit"
    >添加</t-button>
    <t-button
      theme="default"
      style="margin: 10px 0 0 10px"
      @click="closeForm"
    >算了</t-button>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {addSet} from "../../store/rule";
import {newSetID} from "../../utils/RuleSet";

const showForm = ref(false)
const formData = reactive({
  name: '',
  desc: ''
})

const closeForm = () => {
  formData.name = ''
  formData.desc = ''
  showForm.value = false
}
const submit = () => {
  if (formData.name.length !== 0) {
    addSet({
      name: formData.name,
      desc: formData.desc,
      id: newSetID(),
      data: []
    })
    closeForm()
  }
}
</script>

<style scoped>

</style>
