function addXWeeks(date, x) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setDate(date.getDate() + 7 * x)
  return new Date(mutatoPotato).toString()
}

function addXMonths(date, x) {
  const mutatoPotato = new Date(date)
  mutatoPotato.setMonth(date.getMonth() + 1 * x)
  return new Date(mutatoPotato).toString()
}

module.exports = { addXWeeks, addXMonths }
