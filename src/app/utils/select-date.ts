import { getDaysInMonth } from 'date-fns'

export const allMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

export const months = allMonths
  .slice(currentMonth)
  .concat(allMonths.slice(0, currentMonth))

const getAllDaysInMonth = () => {
  const allDaysInMonth: number[] = []
  const days = getDaysInMonth(new Date(currentYear, currentMonth))

  for (let i = 1; i <= days; i++) {
    allDaysInMonth.push(i)
  }

  return allDaysInMonth
}

export const daysInMonth = getAllDaysInMonth()

const getNext12Years = () => {
  const years = []

  for (let i = 0; i < 12; i++) {
    years.push(currentYear + i)
  }

  return years
}

export const next12Years = getNext12Years()
