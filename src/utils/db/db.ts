import Dexie, { Table } from "dexie";
import {Chapter, IndexItem} from "../../types/book";
import {RuleSetRaw} from "../../types/rule";

class BookStore extends Dexie {
  index!: Table<IndexItem>
  chapter!: Table<Chapter>
  sets!: Table<RuleSetRaw>

  constructor() {
    super('dpcq')
    this.version(1)
      .stores({
        index: 'id',
        chapter: 'id',
        sets: 'id'
      })
  }
}

export const db = new BookStore
