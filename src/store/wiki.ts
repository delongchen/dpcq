import {reactive} from "vue";
import {DpcqWiki} from "../types/wiki";
import {EMPTY_WIKI, fetchWiki} from "../api/book";

export const wikiRef = reactive<DpcqWiki>(EMPTY_WIKI)

function init() {
  fetchWiki().then(({power, character, fires}) => {
    wikiRef.power = power
    wikiRef.character = character
    wikiRef.fires = fires
  })
}

init()
