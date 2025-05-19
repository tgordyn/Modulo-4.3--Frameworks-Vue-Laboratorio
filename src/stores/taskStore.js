import { defineStore } from 'pinia';
import { useStorage } from '../composables/storage';


const { get, set } = useStorage('mis-tareas')

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: get(),
    filter: 'all'
  }),
  getters: {
    filteredTasks(state) {
      if (state.filter === 'done') return state.tasks.filter(t => t.done)
      if (state.filter === 'pending') return state.tasks.filter(t => !t.done)
      return state.tasks
    },
    allCompleted: (state) => state.tasks.every(t => t.done),
    hasTasks: (state) => state.tasks.length > 0
  },
  actions: {
    addTask(name) {
      if (!name.trim()) return
      this.tasks.push({ id: Date.now(), name, done: false })
      set(this.tasks)
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
      set(this.tasks)
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.done = !task.done
      set(this.tasks)
    },
    setFilter(value) {
      this.filter = value
    },
    markAll(done = true) {
      this.tasks.forEach(t => (t.done = done))
      set(this.tasks)
    }
  }
})
