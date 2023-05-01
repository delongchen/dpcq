import {Plugin} from "vue";

import {
  Card as TCard,
  HeadMenu as THeadMenu,
  MenuItem as TMenuItem,
  Button as TButton,
  Tabs as TTabs,
  TabPanel as TTabPanel,
  Tag as TTag,
  Tree as TTree,
  Collapse as TCollapse, CollapsePanel as TCollapsePanel,
  TagInput as TTagInput,
  Space as TSpace
} from 'tdesign-vue-next'

export const td: Plugin = {
  install(app) {
    for (const component of [
      TCard,
      THeadMenu, TMenuItem,
      TButton,
      TTabs, TTabPanel,
      TTag,
      TTree,
      TCollapse, TCollapsePanel,
      TTagInput,
      TSpace
    ]) {
      app.use(component)
    }
  }
}
