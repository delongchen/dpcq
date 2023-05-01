import {RuleSetRaw, RuleItem} from "../types/rule";

export class RuleSet {
  private raw: RuleSetRaw
  private ruleMap = new Map<number, RuleItem>()
  constructor(raw: RuleSetRaw) {
    this.raw = raw
    for (const ruleRaw of raw.data) {
      
    }
  }
}
