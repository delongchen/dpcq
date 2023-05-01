import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

import BookPage from "../pages/BookPage.vue";

export const staticRoutes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: '/book'
  },
  {
    name: 'book',
    path: '/book',
    component: BookPage,
    meta: { text: '阅读' }
  },
  {
    name: 'directory',
    path: '/directory',
    component: () => import('../pages/IndexPage.vue'),
    meta: { text: '目录' }
  },
  {
    name: 'rule',
    path: '/rule',
    component: () => import('../pages/RulePage.vue'),
    meta: { text: '规则' }
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../pages/AboutPage.vue'),
    meta: { text: '关于' }
  },
  {
    name: 'wiki',
    path: '/wiki',
    redirect: '/wiki/power',
    component: () => import('../pages/WikiPage.vue'),
    children: [
      {
        name: 'wiki-power',
        path: '/wiki/power',
        component: () => import('../components/wiki/WikiPower.vue')
      },
      {
        name: 'wiki-fire',
        path: '/wiki/fires',
        component: () => import('../components/wiki/WikiFire.vue')
      },
      {
        name: 'wiki-character',
        path: '/wiki/character',
        component: () => import('../components/wiki/WikiCharacter.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
})
