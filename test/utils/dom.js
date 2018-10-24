// Copyright (c) 2018 Peter Hillerström and contributors
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

((module) => {

  const $q = document.querySelector.bind(document)
  const $createElement = document.createElement.bind(document)

  module.exports = {
    $createElement,
    $q,
  }

})(module)
