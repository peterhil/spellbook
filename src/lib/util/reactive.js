// Reactive utils

import Kefir from 'kefir'
import { isFunction } from '../util'

export function fromEventPattern (addHandler, removeHandler) {
  if (!isFunction(addHandler)) {
    throw new Error('The addHandler argument must be a function.')
  }

  return Kefir.stream(emitter => {
    const handler = (...e) => emitter.emit(e.length === 1 ? e[0] : e)
    var token

    try {
      token = addHandler(handler)
    } catch (err) {
      emitter.error(err)
      return
    }

    if(!isFunction(removeHandler)) {
      return
    }

    return () => removeHandler(handler, token)
  })
}
