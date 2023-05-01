<template>
  <p>展示下面输入框值的后100章</p>
  <input id="index-search" v-model="inputRaw">
  <div style="display: flex; flex-wrap: wrap">
      <div v-for="(item, key) in indexItems"
         :key="`index-item-${key}`"
         class="index-item-bt"
         @click="skip(item.id)"
      >#{{item.id}} {{item.title}}</div>
  </div>
</template>

<script setup lang="ts">
import {BookIndexRef, goChapter} from "../store/chapter";
import {computed, ref} from "vue";
import {IndexItem} from "../types/book";
import {useRouter} from "vue-router";

const router = useRouter()

const history = localStorage.getItem('per') ?? '0'
const inputRaw = ref(history)
const id = computed(() => {
  if (inputRaw.value.length === 0) return 0
  const idRaw = +inputRaw.value
  if (
    !Number.isNaN(idRaw) &&
    idRaw > 0 &&
    idRaw <= BookIndexRef.value[BookIndexRef.value.length - 1].id
  ) return idRaw
  else return 0
})

const indexItems = computed(() => {
  const temp: IndexItem[] = []
  let count = 0
  for (let start = id.value; start < BookIndexRef.value.length; start++) {
    if (count < 100) {
      temp.push(BookIndexRef.value[start])
      count += 1
    } else {
      break
    }
  }
  return temp
})

const skip = (id: number) => {
  goChapter(id).then(() => {
    router.push({path: '/book'})
  })
}
</script>

<style scoped lang="less">
#index-search {
  width: 80%;
  height: 20px;
}

.index-item-bt {
  margin: 10px;
  padding: 10px;
  border: 1px black solid;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
}
</style>
