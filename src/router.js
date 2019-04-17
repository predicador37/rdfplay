import Vue from 'vue'
import Router from 'vue-router'
import EditorHome from '@/components/EditorHome'
import ModelContainer from '@/components/ModelContainer'
import ImportExport from '@/components/ImportExport'
import Activity from '@/components/Activity'
import Vocabulary from '@/components/Vocabulary'
import Population from '@/components/Population'
import Sparql from '@/components/Sparql'
import About from '@/components/About'
import UserGuide from '@/components/UserGuide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditorHome',
      component: EditorHome
    },
    {
      path: '/model',
      name: 'ModelContainer',
      component: ModelContainer
    },
    {
      path: '/import-export',
      name: 'ImportExport',
      component: ImportExport
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/vocabulary',
      name: 'Vocabulary',
      component: Vocabulary
    },
    {
      path: '/sparql',
      name: 'Sparql',
      component: Sparql
    },
    {
      path: '/population',
      name: 'Population',
      component: Population
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/user-guide',
      name: 'UserGuide',
      component: UserGuide
    }
  ]
})
