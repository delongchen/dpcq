<template>
  <p v-for="(line, key) in ChapterRef.paragraph"
     :key="`line-${key}`"
     class="chapter-line"
  >
      <span
        v-for="(chunk, key) in splitLine(line)"
        :key="`chunk-${key}`"
        :style="chunk.style"
      >{{chunk.s}}</span>
  </p>
</template>

<script setup lang="ts">
import {ChapterRef} from "../store/chapter";
import {setIdRef, setsMap} from "../store/rule";
import {RuleTrie} from "../utils/RuleTrie";
import {computed} from "vue";

interface LineChunk {
  s: string
  style: {}
}

const trie = computed(() => setsMap.value.get(setIdRef.value)?.getTrie() ?? new RuleTrie())

function splitLine(line: string) {
  const trieRoot = trie.value
  const ret: LineChunk[] = [{s: '', style: {marginLeft: '40px'}}]
  let start = 0
  let end = 0

  while (end < line.length) {
    const rule = trieRoot.search(line, end)
    if (rule !== null) {
      if (start !== end) {
        ret.push({ s: line.slice(start, end), style: {} })
        start = end
      }

      if (rule.replace.length !== 0) {
        ret.push({
          s: rule.replace,
          style: rule.style
        })
      }

      end += rule.target.length
      start = end
    } else {
      end += 1
    }
  }

  ret.push({s: line.slice(start, end), style: {}})
  return ret
}
</script>

<style scoped lang="less">
.chapter-line {
    font-size: larger;
}
</style>
