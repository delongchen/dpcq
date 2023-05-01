import {ref} from "vue";
import {RuleItemRaw, RuleItem, RuleSetRaw} from "../types/rule";
import {RuleSet} from "../utils/RuleSet";
import {RuleTrie} from "../utils/RuleTrie";
import {getLocalSets} from "../utils/db";
import {createLocalStorageApi} from "../utils/ls";

const EMPTY_SET: RuleSetRaw = {
  id: 0,
  name: 'empty',
  desc: 'empty',
  data: []
}

export const trieRoot = new RuleTrie()

const setsMap = ref(new Map<number, RuleSet>())
const setIdRef = ref(0)
const [getRuleLSID, setRuleLSID] = createLocalStorageApi('rule') // LSID = 'localStorageID'
let setUid = 0
async function init() {
  const local = (await getLocalSets())
    .sort((a, b) => a.id - b.id)
  local.unshift(EMPTY_SET)

  setUid = local[local.length - 1].id

  for (const set of local) {
    setsMap.value.set(set.id, new RuleSet(set))
  }

  useSet(getRuleLSID() ?? 0)
}

function useSet(id: number) {
  const exist = setsMap.value.get(id)
  if (exist !== undefined) {
  }
}

export const applyingRuleSet = ref<RuleSetRaw>(EMPTY_SET)

export const allSets = ref<RuleSetRaw[]>([EMPTY_SET])


export const trieRemove = (key: string) => {
  trieRoot.remove(key)
}

export const applySet = (set: RuleSetRaw) => {
  trieRoot.clean()
  for (const {targets, replace, style} of set.data) {
    for (const target of targets) {
      trieRoot.add(target, {target, replace, style})
    }
  }
  applyingRuleSet.value = set
}

applySet(EMPTY_SET)
