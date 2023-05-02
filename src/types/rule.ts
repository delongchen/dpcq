export interface RuleItem {
  id: number
  targets: Set<string>
  replace: string
  style?: Partial<RuleStyle>
}

export interface RuleMate {
  target: string
  replace: string
  style: Partial<RuleStyle>
}

export interface RuleItemRaw {
  targets: string[]
  replace?: string
  style?: Partial<RuleStyle>
}

export interface RuleSetRaw {
  id: number
  name: string
  desc: string
  data: RuleItemRaw[]
}

interface RuleStyle {

}
