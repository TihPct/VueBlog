import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import ErrorPage from "../views/error/ErrorPage";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:pathMatch(.*)',
        component: ErrorPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
