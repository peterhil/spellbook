import test from 'ava'
import Popup from '../../src/components/Popup.svelte'

test('Popup should mount', t => {
    const target = document.createElement('div')
    new Popup({ // eslint-disable-line no-new
        target,
        props: {
        },
    })

    const h1 = target.getElementsByTagName('h1')[0]

    t.is(h1.textContent, 'Add bookmark!')
})
