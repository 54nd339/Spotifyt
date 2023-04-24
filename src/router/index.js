import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/db/config'
import HomeView from '../views/HomeView.vue'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({name: 'Login/Register'})
  } else {
    next()
  }
}

auth.onAuthStateChanged(user => {
  let currentPath = router.currentRoute.value.path
  if (user) {
    if (currentPath === '/login') {
      router.push({name: 'Home'})
    }
  } else {
    if (currentPath !== '/login') {
      router.push({name: 'Login/Register'})
    }
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/login',
      name: 'Login/Register',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/library',
      name: 'Library',
      component: () => import('../views/LibraryView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: requireAuth
    },
  ]
})

export default router
