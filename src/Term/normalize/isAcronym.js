const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/
const oneLetterAcronym = /^[A-Z]\.,?$/
const noPeriodAcronym = /[A-Z]{2}('s|,)?$/
const lowerCaseAcronym = /([a-z]\.){2,}[a-z]\.?$/
//(we intentionally do not support unicode acronyms)

/** does it appear to be an acronym, like FBI or M.L.B. */
const isAcronym = function(str) {
  //like N.D.A
  if (periodAcronym.test(str) === true) {
    return true
  }
  //like c.e.o
  if (lowerCaseAcronym.test(str) === true) {
    return true
  }
  //like 'F.'
  if (oneLetterAcronym.test(str) === true) {
    return true
  }
  //like NDA
  if (noPeriodAcronym.test(str) === true) {
    return true
  }
  return false
}
module.exports = isAcronym
