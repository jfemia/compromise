import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/lexicon] '

test('adjusted lexicon:', function (t) {
  //place new words
  let lexicon = {
    geneva: 'Person',
    lkjj: 'Adjective',
    'donkey kong': 'City',
  }

  const arr = [
    ['geneva is nice', '#Person #Copula #Adjective'],
    ['he is lkjj', '#Pronoun #Copula #Adjective'],
    ['donkey kong wins the award', '#City #City #Verb #Determiner #Noun'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0], lexicon)
    t.equal(doc.has(a[1]), true, here + a[0])
  })
  //
  //set gender from lexicon
  const doc = nlp('Kelly', lexicon)
  t.equal(doc.has('#FemaleName'), true, here + 'kelly-female')
  //set as male:
  lexicon = {
    kelly: 'MaleName',
  }
  const doc2 = nlp('Kelly', lexicon)
  t.equal(doc2.has('#MaleName'), true, here + 'kelly-male')

  //gender follows lumping
  const doc3 = nlp('Kelly Gruber', lexicon)
  t.equal(doc3.has('#MaleName #LastName'), true, here + 'kelly-gruber')

  t.end()
})

test('tricky lexicon:', function (t) {
  let lexicon = {
    'bed bath and beyond': 'Organization',
  }
  let r = nlp('shopping at Bed Bath and Beyond, the store', lexicon)
  let str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'four-word')

  r = nlp('shopping at Bed Bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'partially-hyphenated-word')

  r = nlp('shopping at Bed-bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'many-hyphenated-word')
  t.end()
})
