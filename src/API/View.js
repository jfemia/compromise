import world from './world.js'
import api from './methods/index.js'

class View {
  constructor(document, pointer, groups = {}) {
    this.document = document
    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world,
      writable: true,
    })
    Object.defineProperty(this, '_groups', {
      enumerable: false,
      value: groups,
      writable: true,
    })
    Object.defineProperty(this, '_cache', {
      enumerable: false,
      value: null,
      writable: true,
    })

    this.pointer = pointer
  }
  /* getters:  */
  // lazy-getter (fires once)
  get docs() {
    let docs = this.document
    if (this.pointer) {
      docs = world.methods.one.getDoc(this.pointer, this.document)
    }
    Object.defineProperty(this, 'docs', {
      value: docs,
    })
    return docs
  }
  get methods() {
    return this.world.methods
  }
  get model() {
    return this.world.model
  }
  get hooks() {
    return this.world.hooks
  }
  get isView() {
    return true //this comes in handy sometimes
  }
  // is the view not-empty?
  get found() {
    return this.docs.length > 0
  }
  // how many matches we have
  get length() {
    return this.docs.length
  }
  // return a more-hackable pointer
  get fullPointer() {
    let { docs, pointer } = this
    let ptrs = pointer || docs.map((_d, n) => [n])
    return ptrs.map((a, n) => {
      a[1] = a[1] || 0
      a[2] = a[2] || docs[n].length
      return a
    })
  }
  // create a new View, from this one
  update(pointer) {
    let m = new View(this.document, pointer)
    m._cache = this._cache // share this full thing
    return m
  }
  clone() {
    let document = this.document.slice(0)
    this.forEach(m => {
      let terms = this.docs[0].map(term => {
        term = Object.assign({}, term)
        term.tags = new Set(term.tags)
        return term
      })
      let ptr = m.pointer[0]
      document[ptr[0]] = terms
    })
    // let docs = this.fullPointers().docs
    // console.log(docs)
    // document = document.map(terms => {
    //   return terms.map(term => {
    //     term = Object.assign({}, term)
    //     term.tags = new Set(term.tags)
    //     return term
    //   })
    // })
    let m = new View(document, this.pointer)
    // m._cache = this._cache //clone this too?
    return m
  }
}
Object.assign(View.prototype, api)
export default View
