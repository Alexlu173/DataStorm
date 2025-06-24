<script setup>
import { ref, onMounted } from 'vue'
import { fetchTodos } from '../api.js'

const todos = ref([])
const completadas = ref(0)
const activas = ref(0)

onMounted(async () => {
  const data = await fetchTodos()
  todos.value = data || []

  completadas.value = todos.value.filter(t => t.isComplete).length
  activas.value = todos.value.filter(t => !t.isComplete).length
})
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br">
    <div class="card w-96 bg-white shadow-xl p-6 text-center space-y-4">
      <h1 class="text-2xl font-bold">Hola, Alejandro Luna 👋</h1>
      <p class="text-gray-600">Bienvenido a tu gestor de tareas</p>
      
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Tareas activas</div>
          <div class="stat-value text-primary">{{ activas }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Completadas</div>
          <div class="stat-value text-success">{{ completadas }}</div>
        </div>
      </div>

      <p class="italic text-sm text-blue-600">"¡Hoy es un gran día para tachar tareas!"</p>

      <router-link to="/todolist">
        <button class="btn btn-primary w-full">Ir a mi lista</button>
      </router-link>
    </div>
  </div>
</template>


<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #36966f;
}
</style>
