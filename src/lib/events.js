const add = (element, event, fn, useCapture = false) => {
  if (!element) {
    throw new Error('[events] Trying to attach event listener to an element that does not exist!')
  }
  if (typeof fn !== 'function') {
    console.warn('[events] Trying to add nonexisting event handler on:\n', element, fn)
    return false
  }
  console.debug(`[events] add '${event}' event with {useCapture: ${useCapture}} on element using function:\n`, element, fn)
  element.addEventListener(event, fn, useCapture)
}

const remove = (element, event, fn) => {
  console.debug(`[events] remove '${event}' event handler from:\n`, element, fn)
  element.removeEventListener(event, fn)
}

export const events = {
  add,
  remove
}

export default events
