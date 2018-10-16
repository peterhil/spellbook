const add = (element, event, fn, useCapture = false) => {
  if (!element) {
    throw new Error('[events] Trying to attach event listener to an element that does not exist!')
  }
  if (typeof fn !== 'function') {
    console.warn('[events] Trying to add nonexisting event handler on:\n', element, fn)
    return false
  }
  element.addEventListener(event, fn, useCapture)
}

const remove = (element, event, fn, useCapture = false) => {
  element.removeEventListener(event, fn, useCapture)
}

export const events = {
  add,
  remove
}

export default events
