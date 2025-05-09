export function formatDateToInput(date) {
  if (!date) return ""

  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
  

export const capitalizeFirst = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export function capitalizeWords(str) {
  if (!str || typeof str !== 'string') return ''
  return str.replace(/\b\w/g, char => char.toUpperCase())
}


export const updatedProjects = (projects) => {
  const dateFields = ['createdTime', 'updatedTime', 'projectStart', 'projectEnd']

  return (projects || []).map(project => {
    const updatedUser = {}
    for (let key in project) {
      if (key === 'status' || dateFields.includes(key)) {
        updatedUser[key] = project[key] // Keep status as is
      } else if (typeof project[key] === 'string' && !dateFields.includes(key)) {
        updatedUser[key] = project[key]
          .split(',')
          .map(str => str.trim())
          .map(str => str.charAt(0).toUpperCase() + str.slice(1))
          .join(', ')
      } else {
        updatedUser[key] = project[key]
      }
    }
    return updatedUser
  })
}