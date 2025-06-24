<script setup>
import { ref } from 'vue'
import { updateTodo } from '../api.js'

const props = defineProps(['todo'])
const emit = defineEmits(['updated', 'remove'])

const isModalOpen = ref(false)
const isUpdating = ref(false)

const editingName = ref(props.todo.name)
const editingCategoria = ref(props.todo.categorias?.[0] || '')
const editingPrioridad = ref(props.todo.prioridad?.[0] || '')

const categoriasDisponibles = ['personal', 'tareas', 'idiomas']
const tagsDisponibles = ['importante', 'urgente', 'normal']

async function toggleCheck() {
    isUpdating.value = true
    const updated = { ...props.todo, isComplete: !props.todo.isComplete }
    const ok = await updateTodo(updated)
    if (ok) emit('updated', updated)
    isUpdating.value = false
}

async function saveChanges() {
    const updated = {
        ...props.todo,
        name: editingName.value,
        categorias: editingCategoria.value ? [editingCategoria.value] : [],
        prioridad: editingPrioridad.value ? [editingPrioridad.value] : []
    }

    const ok = await updateTodo(updated)
    if (ok) {
        emit('updated', updated)
        isModalOpen.value = false
    } else {
        alert('Error al guardar cambios')
    }
}
</script>

<template>
    <tr>
        <!-- Checkbox -->
        <td>
            <input type="checkbox" class="checkbox checkbox-sm" :checked="props.todo.isComplete" @change="toggleCheck"
                :disabled="isUpdating" />
        </td>
        <!-- Nombre -->
        <td :class="{ 'line-through text-gray-400': props.todo.isComplete }">
            {{ props.todo.name }}
        </td>
        <!-- Categorías -->
        <td>
            <div class="flex flex-wrap gap-1">
                <span v-for="cat in props.todo.categorias" :key="cat" class="badge badge-neutral text-xs">
                    {{ cat }}
                </span>
            </div>
        </td>
        <!-- Prioridades -->
        <td>
            <div class="flex flex-wrap gap-1">
                <span v-for="p in props.todo.prioridad" :key="p" class="badge badge-outline badge-error text-xs">
                    {{ p }}
                </span>
            </div>
        </td>
        <!-- Botones -->
        <td class="flex gap-2 justify-end">
            <button class="btn btn-xs btn-info" @click="isModalOpen = true">✏️</button>
            <button class="btn btn-xs btn-error" @click="$emit('remove', props.todo)">🗑️</button>
        </td>
    </tr>
    <!-- Modal -->
    <dialog v-if="isModalOpen" class="modal" open>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Editar tarea</h3>

            <input v-model="editingName" class="input input-bordered w-full my-3" placeholder="Nuevo nombre" />

            <select v-model="editingCategoria" class="select select-bordered w-full mb-2">
                <option disabled value="">Seleccionar categoría</option>
                <option v-for="cat in categoriasDisponibles" :key="cat">{{ cat }}</option>
            </select>

            <select v-model="editingPrioridad" class="select select-bordered w-full mb-4">
                <option disabled value="">Seleccionar prioridad</option>
                <option v-for="tag in tagsDisponibles" :key="tag">{{ tag }}</option>
            </select>

            <div class="modal-action">
                <button class="btn" @click="isModalOpen = false">Cancelar</button>
                <button class="btn btn-primary" @click="saveChanges">Guardar</button>
            </div>
        </div>
    </dialog>
</template>
