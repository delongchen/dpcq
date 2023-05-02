import {RuleItem, RuleSetRaw} from "../types/rule";
import {RuleTrie} from "./RuleTrie";

let SetID = 0

interface ReplaceInfo {
  shouldReplace: boolean
  s: string
}
function parseReplace(s: string): ReplaceInfo[] {
  const start = '{'
  const end = '}'
  const ret: ReplaceInfo[] = []

  const temp: string[] = []
  let startGather = false
  const switchGather = () => {
    if (temp.length !== 0)
      ret.push({shouldReplace: startGather, s: temp.join('')})
    startGather = !startGather
    temp.length = 0
  }

  for (const char of s) {
    if (!startGather && char === start) {
      switchGather()
    } else if (startGather && char === end) {
      switchGather()
    } else {
      temp.push(char)
    }
  }

  switchGather()
  return ret
}

export function compileReplace(origin: string, replace: string): string {
  const ret: string[] = []
  const infos = parseReplace(replace)
  for (const chunk of infos) {
    if (chunk.shouldReplace) {
      if (chunk.s === 'self') {
        ret.push(origin)
      } else if (chunk.s === 'empty') {
        ret.push('')
      }
    } else {
      ret.push(chunk.s)
    }
  }

  return ret.join('')
}

export const newSetID = () => {
  return SetID + 1
}
export class RuleSet {
  private raw: RuleSetRaw
  private ruleID: number = 0
  ruleMap = new Map<number, RuleItem>()
  private trie = new RuleTrie
  constructor(raw: RuleSetRaw) {
    this.raw = raw
    if (raw.id > SetID) SetID = raw.id

    const {trie, ruleMap} = this
    for (const ruleRaw of raw.data) {
      const targetSet = new Set<string>()
      const rule: RuleItem = {
        id: this.ruleID++,
        targets: targetSet,
        replace: ruleRaw.replace ?? '{self}',
        style: ruleRaw.style
      }

      for (const target of ruleRaw.targets) {
        if (!targetSet.has(target)) {
          targetSet.add(target)
          trie.add(target, {
            target,
            replace: compileReplace(target, rule.replace),
            style: ruleRaw.style ?? {}
          })
        }
      }

      ruleMap.set(rule.id, rule)
    }
  }

  getTrie() {
    return this.trie
  }

  getID() {
    return this.raw.id
  }

  getRaw() {
    return this.raw
  }
}
