<template>
  <p v-for="(line, key) in ChapterRef.paragraph"
     :key="`line-${key}`"
     class="chapter-line"
  >
      <span
        v-for="(chunk, key) in splitLine(line)"
        :key="`chunk-${key}`"
        :style="chunk.style ?? {}"
      >{{chunk.s}}</span>
  </p>
</template>

<script setup lang="ts">
import {ChapterRef} from "../store/chapter";
import {trieRoot} from "../store/rule";

interface LineChunk {
  s: string
  style?: {}
}
function splitLine(line: string) {
  let start = 0
  let end = 0
  const ret: LineChunk[] = [{s: '', style: {marginLeft: '40px'}}]

  while (end < line.length) {
    const rule = trieRoot.search(line, end)
    if (rule !== null) {
      if (start !== end) {
        ret.push({ s: line.slice(start, end) })
        start = end
      }

      ret.push({
        s: rule.replace ?? rule.target,
        style: rule.style
      })

      end += rule.target.length
      start = end
    } else {
      end += 1
    }
  }

  ret.push({s: line.slice(start, end)})
  return ret
}
</script>

<style scoped lang="less">
.chapter-line {
    font-size: larger;
}
</style>
