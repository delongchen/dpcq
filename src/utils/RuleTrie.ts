import {RuleMate} from "../types/rule";

export class RuleTrie {
  private readonly children: Map<string, RuleTrie>
  content: RuleMate | null = null

  constructor() {
    this.children = new Map
  }

  add(s: string, rule: RuleMate) {
    if (s.length !== 0) this.addHelper([...s], rule)
  }

  clean() {
    if (this.children.size !== 0) {
      for (const [_, node] of this.children) {
        node.clean()
      }
      this.children.clear()
    } else {
      this.content = null
    }
  }

  private addHelper(s: string[], rule: RuleMate) {
    let nowNode: RuleTrie = this

    for (const target of s) {
      const { children } = nowNode
      const exist = children.get(target)
      if (exist === undefined) {
        const newNode = new RuleTrie
        children.set(target, newNode)
        nowNode = newNode
      } else {
        nowNode = exist
      }
    }

    nowNode.content = rule
  }

  search(line: string, index: number) {
    let nowNode: RuleTrie = this

    while (index < line.length) {
      const { children } = nowNode
      const exist = children.get(line[index])
      if (exist !== undefined) {
        nowNode = exist
        index += 1
      } else {
        break
      }
    }

    return nowNode.content
  }

  remove(key: string) {
    if (key.length !== 0) {
      this.removeHelper(key, 0)
    }
  }

  private removeHelper(key: string, index: number): boolean {
    if (index < key.length) {
      const next = this.children.get(key[index])
      if (next !== undefined) {
        const result = next.removeHelper(key, index + 1)
        if (result) {
          this.children.delete(key[index])
          return this.children.size === 0
        }
      }
      return false
    } else {
      this.content = null
      return this.children.size === 0
    }
  }
}
