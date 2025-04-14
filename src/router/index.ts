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
      component: () => import('../views/ExercisesView.vue'),
    },
    {
      path: '/exercises/:id',
      name: 'exercise-details',
      component: () => import('../views/ExerciseDetailsView.vue'),
      props: true,
    },
    {
      path: '/my-routine',
      name: 'my-routine',
      component: () => import('../views/MyRoutineView.vue'),
    },
  ],
})

export default router
