export function formatDateToInput(date) {
  if (!date) return ""

  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
  

export const capitalizeFirst = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''

export function capitalizeWords(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\b\w/g, char => char.toUpperCase())
}