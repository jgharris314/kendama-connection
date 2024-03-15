const moment = require("moment")

function addXWeeks(date, amountOfWeeks) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setDate(date.getDate() + 7 * amountOfWeeks)
  return moment(mutatoPotato).toDate()
}

function addXMonths(date, amountOfMonths) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setMonth(date.getMonth() + 1 * amountOfMonths)
  return moment(mutatoPotato).toDate()
}

function getDifferenceInDays(todayDate, eventStartDate) {
  return Math.round(
    (todayDate.getTime() - eventStartDate.getTime()) / (1000 * 3600 * 24)
  )
}

module.exports = { addXWeeks, addXMonths, getDifferenceInDays }
