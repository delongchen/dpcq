import {reactive, ref} from "vue";
import {Chapter, IndexItem} from "../types/book";
import {EMPTY_CHAPTER} from "../api/book";
import {getBookIndex, getChapterByID} from "../utils/db";
import {createLocalStorageApi} from "../utils/ls";

export const ChapterRef = reactive<Chapter>(EMPTY_CHAPTER)
export const BookIndexRef = ref<IndexItem[]>([])
const [getPer, setPer] = createLocalStorageApi('per')
const setChapter = ({id, title, paragraph}: Chapter) => {
  ChapterRef.id = id
  ChapterRef.title = title
  ChapterRef.paragraph = paragraph
  setPer(id)
}
export const goChapter = (id: number) => getChapterByID(id).then(setChapter)
export const goNextChapter = () => new Promise<void>((resolve) => {
  const bookIndex = BookIndexRef.value
  if (bookIndex.length > 0 && ChapterRef.id < bookIndex[bookIndex.length - 1].id) {
    goChapter(ChapterRef.id + 1).then(resolve)
  } else {
    resolve()
  }
})
export const goPerChapter = () => new Promise<void>((resolve) => {
  if (ChapterRef.id > 1) {
    goChapter(ChapterRef.id - 1).then(resolve)
  } else {
    resolve()
  }
})
const init = () => {
  getBookIndex().then(res => {
    BookIndexRef.value = res.sort((a, b) => a.id - b.id)
  })

  const history = getPer() ?? 1
  goChapter(history)
}

init()
