export interface RuleItem {
  id: number
  target: string
  replace?: string
  style?: Partial<RuleStyle>
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
