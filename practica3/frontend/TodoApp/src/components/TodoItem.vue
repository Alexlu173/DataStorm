<script setup>
import { ref } from 'vue'
import { updateTodo } from '../api.js'

const props = defineProps(['todo'])
const emit = defineEmits(['updated', 'remove'])

const editingName = ref(props.todo.name)
const isModalOpen = ref(false)
const editingCategoria = ref(props.todo.categorias?.[0] || '')
const editingTag = ref(props.todo.tags?.[0] || '')


async function saveChanges() {
  const updated = {
    ...props.todo,
    name: editingName.value,
    categorias: editingCategoria.value ? [editingCategoria.value] : [],
    tags: editingTag.value ? [editingTag.value] : []
  }

  const success = await updateTodo(updated)
  if (success) {
    emit('updated', updated)
    isModalOpen.value = false
  } else {
    alert("Error al guardar cambios")
  }
}
</script>

<template>
  <li class="flex text-center items-center justify-between p-2 border-b border-gray-200">
    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="props.todo.isComplete" @change="saveChanges" class="accent-green-500" />
      <span :class="{ 'line-through text-gray-400': props.todo.isComplete }" class="text-sm">
        {{ props.todo.name }}
      </span>
    </div>
    <div class="flex flex-wrap gap-1 mt-1">
      <span v-for="cat in props.todo.categorias" :key="cat" class="badge badge-neutral text-xs">
        {{ cat }}
      </span>
      <span v-for="tag in props.todo.tags" :key="tag" class="badge badge-error text-xs">
        {{ tag }}
      </span>
    </div>


    <div class="flex items-center gap-2">
      <button @click="isModalOpen = true" class="btn btn-sm">Editar</button>
      <button @click="$emit('remove', props.todo)" class="text-red-500 hover:text-red-700 font-bold">✕</button>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
      <div class="bg-white rounded p-6 shadow-lg w-80">
        <h3 class="text-lg font-bold mb-2">Editar tarea</h3>
        <input v-model="editingName" class="w-full border border-gray-300 rounded px-2 py-1 mb-4"
          placeholder="Nuevo nombre" />
        <div class="flex justify-end gap-2">
          <button @click="isModalOpen = false" class="px-3 py-1 text-gray-600 hover:text-black">Cancelar</button>
          <button @click="saveChanges"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar</button>
        </div>
      </div>
    </div>
  </li>
</template>
