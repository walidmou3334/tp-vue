import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import JobDetail from '../views/JobDetail.vue'
import EditJob from '../views/EditJob.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/add', name: 'add-job', component: AddJob },
  { path: '/jobs/:id', name: 'job-detail', component: JobDetail },
  { path: '/jobs/:id/edit', name: 'edit-job', component: EditJob },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
