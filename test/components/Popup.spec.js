/* global chrome */

import test from 'ava';
import Popup from '../../src/components/Popup.svelte';

test('Popup should mount', t => {
  const tr = translate
  const target = document.createElement('div');
  const app = new Popup({
    target,
    props: {
    },
  });

  const h1 = target.getElementsByTagName('h1')[0];

  t.is(h1.textContent, "Add bookmark!");
});
