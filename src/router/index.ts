import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: () => import('../views/Exercises/ExercisesView.vue'),
    },
    {
      path: '/exercises/:id',
      name: 'exercise-details',
      component: () => import('../views/Exercises/ExerciseDetailsView.vue'),
      props: true,
    },
    {
      path: '/training',
      name: 'training',
      component: () => import('../views/Training/TrainingView.vue'),
    },
    {
      path: '/training/start-session',
      name: 'start-session',
      component: () => import('../views/Training/StartSessionView.vue'),
    },
    {
      path: '/training/my-routines',
      name: 'my-routines',
      component: () => import('../views/Training/MyRoutinesView.vue'),
    },
    {
      path: '/training/routines/:id',
      name: 'routine-details',
      component: () => import('../views/Training/Routine/RoutineShow.vue'),
      props: true,
    },
    {
      path: '/training/history',
      name: 'history',
      component: () => import('../views/Training/HistoryView.vue'),
    },
    {
      path: '/training/progress',
      name: 'progress',
      component: () => import('../views/Training/ProgressView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/ForgotPasswordView.vue'),
      meta: { requiresGuest: true },
    },
  ],
})

export default router
