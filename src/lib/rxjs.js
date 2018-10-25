// Copyright (c) 2015-2018 Peter Hillerström, Google, Inc., Netflix, Inc.,
// Microsoft Corp. and contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Kefir from 'kefir'
import { isFunction } from './util'

// Adapted from RxJS function fromEventPattern
// https://github.com/ReactiveX/rxjs/blob/6.3.2/src/internal/observable/fromEventPattern.ts#L135-L163
//
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
