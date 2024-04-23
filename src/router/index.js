import { createRouter, createWebHistory } from 'vue-router'

const GreetingView = () => import('../views/GreetingView.vue')
const HomepageView = () => import('../views/HomepageView.vue')
const AuthView = () => import('../views/AuthView.vue')
const LoginPage = () => import('../views/LoginView.vue')
const RegistrationPage = () => import('../views/RegistrationView.vue')

const routes = [
  { path: '/', component: GreetingView },
  { path: '/map', component: HomepageView },
  {
    path: '/auth',
    component: AuthView,
    redirect: '/auth/login',
    children: [
      { path: 'login', component: LoginPage },
      { path: 'registration', component: RegistrationPage }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
