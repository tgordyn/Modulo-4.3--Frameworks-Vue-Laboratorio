export const useStorage = (key, defaultValue = []) => {
  const get = () => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (err) {
      console.error('Error leyendo localStorage:', err)
      return defaultValue
    }
  }

  const set = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Error guardando en localStorage:', err)
    }
  }

  return { get, set }
}
