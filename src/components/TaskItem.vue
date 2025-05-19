<script setup>
import { useTaskStore } from "../stores/taskStore.js";
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const store = useTaskStore();

const onToggle = () => {
  store.toggleTask(props.task.id);
}

const onRemove = () => {
  store.removeTask(props.task.id);
}
</script>

<template>
  <li
    class="flex items-center justify-between bg-white p-3 mb-2 rounded shadow"
  >
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        :checked="task.done"
        @change="onToggle"
        class="accent-green-500"
      />
      <span :class="{ 'line-through text-gray-400': task.done }">
        {{ task.name }}
      </span>
    </label>
    <button
      type="button"
      @click="onRemove"
      class="text-red-500 hover:text-red-700 text-sm"
      aria-label="Eliminar tarea"
    >
    <Trash2 class="w-5 h-5" />
    <span class="sr-only">Eliminar tarea</span>
    </button>
  </li>
</template>
