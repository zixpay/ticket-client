const currentDate = new Date()

function pad(hours: number) {
  return hours < 10 ? '0' + hours : hours
}

const seconds = currentDate.getSeconds()
const minutes = currentDate.getMinutes()
const hours = currentDate.getHours()
const day = currentDate.getDate()
const month = currentDate.getMonth() + 1
const year = currentDate.getFullYear()

export const formatedDate = pad(day) + '/' + pad(month) + '/' + year
export const formatedHours =
  pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
