<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const selectedCategoria = ref('')
const selectedPrioridad = ref('')
const emit = defineEmits(['add'])

function handleSubmit() {
    emit('add', {
        name: newTodo.value,
        isComplete: false,
        categorias: selectedCategoria.value ? [selectedCategoria.value] : [],
        prioridad: selectedPrioridad.value ? [selectedPrioridad.value] : [] 
    })

    newTodo.value = ''
    selectedCategoria.value = ''
    selectedTag.value = ''
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-3 mb-4">
        <input v-model="newTodo" required placeholder="Nueva tarea" class="input input-bordered w-full" />

        <div class="flex gap-2">
            <select v-model="selectedCategoria" class="select select-bordered w-full">
                <option disabled value="">Categoría</option>
                <option value="personal">personal</option>
                <option value="tareas">tareas</option>
                <option value="idiomas">idiomas</option>
            </select>

            <select v-model="selectedPrioridad" class="select select-bordered w-full">
                <option disabled value="">Prioridad</option>
                <option value="importante">importante</option>
                <option value="urgente">urgente</option>
                <option value="normal">normal</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary w-full">Añadir</button>
    </form>
</template>
