const API_URL = 'https://localhost:7197/api/todoitems'

export async function fetchTodos() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return await data;
    }
    catch (err) {
        console.error('Error', err)
    }
}

export async function createTodo(todo) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        if (!res.ok) throw new Error("Error al crear tarea")
        return await res.json()
    } catch (err) {
        console.error("Error", err)
        throw err
    }
}

export async function updateTodo(todo) {
    const res = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
    return res.ok
}

export async function deleteTodo(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    return res.ok
}
