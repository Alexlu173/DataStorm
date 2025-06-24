<script setup>
import TodoItemTable from '../components/TodoItemTable.vue'
import { ref, onMounted } from 'vue'
import { fetchTodos, createTodo, deleteTodo } from '../api.js'
import TodoForm from '../components/Todoform.vue'

const todos = ref([])

onMounted(async () => {
  todos.value = await fetchTodos()
})

async function addTodo(todo) {
  const newTodo = await createTodo(todo)
  todos.value.push(newTodo)
}

async function removeTodo(todo) {
  const ok = await deleteTodo(todo.id)
  if (ok) {
    todos.value = todos.value.filter(t => t.id !== todo.id)
  }
}

function handleUpdate(updated) {
  const index = todos.value.findIndex(t => t.id === updated.id)
  if (index !== -1) todos.value[index] = updated
}
</script>

<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-center">📋 Lista de tareas</h1>

    <TodoForm @add="addTodo" />

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>✔️</th>
            <th>📝 Tarea</th>
            <th>🏷️ Categorías</th>
            <th>⏰ Prioridad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TodoItemTable v-for="todo in todos" :key="todo.id" :todo="todo" @updated="handleUpdate"
            @remove="removeTodo" />
        </tbody>
      </table>
    </div>
  </div>
</template>
