import {db} from "./db";
import {fetchBookIndex, fetchChapter} from "../../api/book";
import {Chapter, IndexItem} from "../../types/book";

export async function getBookIndex(): Promise<IndexItem[]> {
  const result = await db.index.toArray()
  if (result.length === 0) {
    const indexRaw = await fetchBookIndex()
    if (indexRaw.length !== 0) {
      const temp: IndexItem[] = indexRaw.split('#')
        .map(itemRaw => {
          const [id, title] = itemRaw.split(',')
          return {id: +id, title}
        })
      await db.index.bulkAdd(temp, undefined, {allKeys: true})
      return temp
    } else return []
  } else return result
}

export async function getChapterByID(id: number): Promise<Chapter> {
  const result = await db.chapter.get(id)
  if (result === undefined) {
    const chapter = await fetchChapter(id)
    if (chapter.id !== 0) await db.chapter.add(chapter)
    return chapter
  } else return result
}

export async function getLocalSets() {
  return db.sets.toArray()
}
