export interface IndexItem {
  id: number
  title: string
}
export interface Chapter extends IndexItem {
  paragraph: string[]
}
