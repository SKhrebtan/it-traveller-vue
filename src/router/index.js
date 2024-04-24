import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/api/authService'

const GreetingView = () => import('../views/GreetingView.vue')
const HomepageView = () => import('../views/HomepageView.vue')
const AuthView = () => import('../views/AuthView.vue')
const LoginPage = () => import('../views/LoginView.vue')
const RegistrationPage = () => import('../views/RegistrationView.vue')

const routes = [
  { path: '/', component: GreetingView, name: 'greeting' },
  { path: '/map', component: HomepageView, name: 'home' },
  {
    path: '/auth',
    component: AuthView,
    redirect: '/auth/login',
    children: [
      { path: 'login', component: LoginPage, name: 'login' },
      {
        path: 'registration',
        component: RegistrationPage,
        name: 'registration'
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authRoutes = ['login', 'registration']
  const { name } = to

  if (authService.isLoggedIn() && authRoutes.includes(name)) {
    next({ name: 'home' })
  } else if (!authRoutes.includes(name) && !authService.isLoggedIn()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
