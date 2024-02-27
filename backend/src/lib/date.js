const moment = require("moment")

function addXWeeks(date, x) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setDate(date.getDate() + 7 * x)
  return moment(mutatoPotato).toDate()
}

function addXMonths(date, x) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setMonth(date.getMonth() + 1 * x)
  return moment(mutatoPotato).toDate()
}

function getDifferenceInDays(todayDate, eventStartDate) {
  return Math.round(
    (todayDate.getTime() - eventStartDate.getTime()) / (1000 * 3600 * 24)
  )
}

module.exports = { addXWeeks, addXMonths, getDifferenceInDays }
