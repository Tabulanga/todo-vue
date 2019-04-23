import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', name: 'home', component: 'Home' },
  { path: '*', component: 'NotFound' },
  { path: '/about', name: 'about', component: 'About' },
  { path: '/add', name: 'addTodo', component: 'AddTodo' },
  { path: '/todo/:id', name: 'todo', component: 'Todo' }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    name: route.name,
    component: () => import(`@/views/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes: [ ...routes ]
})
