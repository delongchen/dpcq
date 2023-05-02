import {ref} from "vue";
import {RuleSetRaw} from "../types/rule";
import {RuleSet} from "../utils/RuleSet";
import {RuleTrie} from "../utils/RuleTrie";
import {getLocalSets} from "../utils/db";
import {createLocalStorageApi} from "../utils/ls";

const EMPTY_SET: RuleSetRaw = {
  id: 0,
  name: 'empty',
  desc: 'empty',
  data: [
    {
      targets: ['萧炎', '炎儿'],
      replace: 'k{self}k',
      style: { color: 'red' }
    },
    {
      targets: ['呵呵'],
      replace: '{empty}'
    }
  ]
}

export let trieRoot = new RuleTrie()

export const setsMap = ref(new Map<number, RuleSet>())
export const setIdRef = ref(0)

export const deleteSet = (id: number) => {
  setsMap.value.delete(id)
}

export const addSet = (v: RuleSetRaw) => {
  const set = new RuleSet(v)
  setsMap.value.set(set.getID(), set)
}

const [getRuleLSID, setRuleLSID] = createLocalStorageApi('rule') // LSID = 'localStorageID'
async function init() {
  const local = (await getLocalSets())
    .sort((a, b) => a.id - b.id)
  local.unshift(EMPTY_SET)

  for (const set of local) {
    setsMap.value.set(set.id, new RuleSet(set))
  }

  useSet(getRuleLSID() ?? 0)
}
init().catch(() => {
  console.log('rule error')
})

export function useSet(id: number) {
  if (setIdRef.value === id) { return }

  const exist = setsMap.value.get(id)
  if (exist !== undefined) {
    trieRoot = exist.getTrie()
    setRuleLSID(id)
  }
}

