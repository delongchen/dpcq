export interface DpcqWiki {
  power: DpcqPowerNode
  character: {
    main: DpcqRole[]
    supportingRole: DpcqRole[]
  }
  fires: DpcqFire[]
}

export interface DpcqPowerNode {
  name: string
  desc: string
  children?: DpcqPowerNode[]
}

export interface DpcqRole {
  name: string
  nick?: string[]
  desc: string
}

export interface DpcqFire {
  name: string
  desc: string
  rank: number
}
