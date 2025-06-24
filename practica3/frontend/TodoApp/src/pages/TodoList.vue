<script setup>
import { ref, computed, onMounted } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import TodoForm from '../components/Todoform.vue'
import { fetchTodos, createTodo, deleteTodo } from '../api.js'

const todos = ref([
])

const hideCompleted = ref(false)

const busqueda = ref('')

const filteredTodos = computed(() => {
  return todos.value.filter((t) => {
    const coincideTexto = t.name.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideCompletado = hideCompleted.value ? !t.isComplete : true
    return coincideTexto && coincideCompletado
  })
})

async function addTodo(todoData) {
  try {
    const newTodo = await createTodo(todoData)
    todos.value.push(newTodo)
  } catch (error) {
    console.error("No se pudo crear el TODO:", error)
  }
}

async function removeTodo(todo) {
  try {
    if (deleteTodo(todo.id)) {
      todos.value = todos.value.filter((t) => t.id !== todo.id)
    }
  }
  catch (err) {
    console.error("Error cargando tareas:", error)
  }
}

function editTodo(updated) {
  const index = todos.value.findIndex(t => t.id === updated.id)
  if (index !== -1) {
    todos.value[index] = updated
  }
}

onMounted(async () => {
  try {
    const data = await fetchTodos()
    todos.value = data
  } catch (error) {
    console.error("Error cargando tareas:", error)
  }
})


</script>

<template>
  <section class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-gray-700">Mis Tareas</h1>
    <TodoForm @add="addTodo" />
    <input v-model="busqueda" placeholder="Buscar tarea..." class="input input-bordered w-full mb-4" />
    <ul class="divide-y divide-gray-100 mb-4">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @remove="removeTodo" @updated="editTodo" />
    </ul>

    <button @click="hideCompleted = !hideCompleted" class="text-sm text-blue-500 hover:underline mt-2">
      {{ hideCompleted ? 'Mostrar todas' : 'Ocultar completadas' }}
    </button>
  </section>
</template>
