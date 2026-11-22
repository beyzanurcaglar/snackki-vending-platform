// Display labels: database values stay unchanged (periods are used in SQL INTERVAL)
const STATUS = { pending: 'Offen', done: 'Erledigt', completed: 'Erledigt' }
const UNITS = { MONTH: ['Monat', 'Monate'], YEAR: ['Jahr', 'Jahre'] }

export const statusLabel = (s) => STATUS[s] || s

export const periodLabel = (p) => {
  const m = /^(\d+)\s+(MONTH|YEAR)$/i.exec(p || '')
  if (!m) return p
  const n = Number(m[1]); const [one, many] = UNITS[m[2].toUpperCase()]
  return `${n} ${n === 1 ? one : many}`
}
