<template>
  <div class="home">
    <h1>Bienvenido a la App de Tareas</h1>
    <p>Usa el menú de navegación para acceder a tu lista de tareas.</p>

    <router-link to="/todolist">
      <button>Ir a la Lista de Tareas</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

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
