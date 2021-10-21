import nounVerb from './noun-verb.js'
import adjGerund from './adj-gerund.js'
import adjPast from './adj-past.js'
import personNoun from './person-noun.js'
import personDate from './person-date.js'
import personVerb from './person-verb.js'

const merge = (a, b) => {
  a = a || {}
  b = b || {}
  return Object.assign({}, a, b)
}

const switches = {
  nounVerb,
  adjGerund,
  adjPast,
  personNoun,
  personDate,
  personVerb,
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  let [a, b] = switches[k].clues
  switches[k] = {
    before: merge(a.before, b.before),
    after: merge(a.after, b.after),
    ownTags: merge(a.ownTags, b.ownTags),
    beforeWords: merge(a.beforeWords, b.beforeWords),
    afterWords: merge(a.afterWords, b.afterWords),
    words: switches[k].words,
    fallback: switches[k].fallback,
  }
})
export default switches