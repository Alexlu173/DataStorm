// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../pages/TodoList.vue'
import Home from '../pages/Home.vue'
import TodoTable from '../pages/TodoTable.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/todolist',
        name: 'TodoList',
        component: TodoList
    },

    {
        path: '/todotable',
        name: 'TodoTable',
        component: TodoTable
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
