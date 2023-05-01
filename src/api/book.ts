import {Chapter} from "../types/book";
import {DpcqWiki} from "../types/wiki";

const baseURL = '/api/dpcq'
const fmt = (s: string) => `${baseURL}${s}`

export const fetchBookIndex = (): Promise<string> =>
  fetch(fmt('/index'), { method: 'GET' })
    .then(res => res.text())
    .catch(() => '')

export const EMPTY_CHAPTER: Chapter = {
  id: 0,
  title: '',
  paragraph: []
}
export const fetchChapter = (id: number): Promise<Chapter> =>
  fetch(fmt(`/chapter?id=${id}`), { method: 'GET'})
    .then(res => res.json())
    .catch(() => EMPTY_CHAPTER)

export const EMPTY_WIKI: DpcqWiki = {
  power: {name: '', desc: ''},
  character: {
    main: [],
    supportingRole: []
  },
  fires: []
}
export const fetchWiki = (): Promise<DpcqWiki> =>
  fetch(fmt('/wiki'), { method: 'GET' })
    .then(res => res.json())
    .catch((res) => {
      console.log(res)
      return EMPTY_WIKI
    })
