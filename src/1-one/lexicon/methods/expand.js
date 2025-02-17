// derive clever things from our lexicon key-value pairs
const expand = function (words) {
  // const { methods, model } = world
  let lex = {}
  // console.log('start:', Object.keys(lex).length)
  let _multi = {}

  // go through each word in this key-value obj:
  Object.keys(words).forEach(word => {
    let tag = words[word]
    // normalize lexicon a little bit
    word = word.toLowerCase().trim()
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi[split[0]] = true
    }
    lex[word] = lex[word] || tag
  })
  // cleanup
  delete lex['']
  delete lex[null]
  delete lex[' ']
  return { lex, _multi }
}
export default expand
