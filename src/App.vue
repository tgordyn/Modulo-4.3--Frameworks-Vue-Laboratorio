<script setup>
import { ref } from "vue";
import { useTaskStore } from "./stores/taskStore";
import TaskItem from "./components/TaskItem.vue";

const newTask = ref("");
const taskStore = useTaskStore();

const addNewTask = () => {
  taskStore.addTask(newTask.value);
  newTask.value = "";
};

const filterClass = (name) => {
  return taskStore.filter === name
    ? "font-bold underline text-blue-600"
    : "text-gray-600 hover:text-blue-500";
};
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Tareas</h1>

    <form @submit.prevent="addNewTask" class="flex gap-2 mb-6">
      <input
        v-model="newTask"
        type="text"
        placeholder="Agregar tarea"
        class="flex-grow border p-2 rounded"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        aria-label="Agregar tarea"
      >
        <Plus class="w-5 h-5" />
        <span class="sr-only">Agregar tarea</span>
      </button>
    </form>
    <div class="space-y-4 mb-24">
      <div class="flex gap-3 text-sm">
        <button @click="taskStore.setFilter('all')" :class="filterClass('all')">
          Todas
        </button>
        <button
          @click="taskStore.setFilter('done')"
          :class="filterClass('done')"
        >
          Completadas
        </button>
        <button
          @click="taskStore.setFilter('pending')"
          :class="filterClass('pending')"
        >
          Pendientes
        </button>
      </div>
      <div v-if="taskStore.hasTasks" class="flex gap-2 mt-4 text-sm">
        <button
          @click="taskStore.markAll(true)"
          class="text-green-600 hover:underline"
        >
          Marcar todas como completadas
        </button>
        <button
          @click="taskStore.markAll(false)"
          class="text-orange-600 hover:underline"
        >
          Marcar todas como pendientes
        </button>
      </div>
    </div>
    <div>
      <ul class="mt-10">
        <TaskItem
          v-for="task in taskStore.filteredTasks"
          :key="task.id"
          :task="task"
        />
      </ul>
    </div>
  </div>
</template>
