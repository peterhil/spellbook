# Spellbook

Spellbook is a bookmark manager extension for Chrome.

It is still in early development phase, but the motivation is to make a really
usable extension that enables the user to easily manage thousands of bookmarks
with novel UI innovations.

## Technology stack

Currently I am to only use libraries that are well written and most importantly
extremely small in size.

For now the stack is:

- [Riot.js — Simple and elegant component-based UI library](https://riot.js.org/)
- [Kefir.js — fast and light Reactive Programming library for JavaScript inspired by Bacon.js and RxJS](https://kefirjs.github.io/kefir/)
- [nullobject/fkit: A functional programming toolkit for JavaScript](https://github.com/nullobject/fkit) – [FKit API documentation](https://nullobject.github.io/fkit/api.html)
- [Spectre.css - A Lightweight, Responsive and Modern CSS Framework](https://picturepan2.github.io/spectre/)
- [ESLint - Pluggable JavaScript linter](https://eslint.org/)
- [Bublé – the blazing fast, batteries-included ES2015 compiler](https://buble.surge.sh/#%2F*%0A%20%20Thanks%20for%20trying%20Bubl%C3%A9!%20Quickstart%3A%0A%0A%20%20%24%20npm%20install%20-g%20buble%0A%20%20%24%20echo%20%22const%20answer%20%3D%20()%20%3D%3E%2042%22%20%3E%20input.js%0A%20%20%24%20buble%20input.js%20%3E%20output.js%0A%20%20%24%20cat%20output.js%0A%0A%20%20This%20is%20a%20relatively%20new%20project%20%E2%80%93%20please%20report%0A%20%20any%20bugs%20you%20find%20by%20clicking%20'report%20bugs'%20and%0A%20%20linking%20to%20a%20version%20of%20this%20page%20demonstrating%0A%20%20the%20issue.%20Thanks!%0A%0A%20%20Note%20that%20some%20ES2015%20features%20are%20deliberately%0A%20%20unsupported%20-%20click%20the%20'guide'%20link%20in%20nav.%0A*%2F%0A%0A%2F%2F%20arrow%20functions%0Aconst%20add%20%3D%20(%20a%2C%20b%20)%20%3D%3E%20a%20%2B%20b%3B%0A%0A%2F%2F%20classes%0Aclass%20Circle%20extends%20Shape%20%7B%0A%20%20constructor%20(%20radius%20)%20%7B%0A%20%20%20%20super()%3B%0A%20%20%20%20this.radius%20%3D%20this%3B%0A%20%20%7D%0A%0A%20%20area%20()%20%7B%0A%20%20%20%20return%20Math.PI%20*%20Math.pow(%20this.radius%2C%202%20)%3B%0A%20%20%7D%0A%7D%0A%0A%2F%2F%20object%20literals%0Alet%20obj%20%3D%20%7B%0A%20%20shorthandProperty%2C%0A%20%20shorthandMethod%20()%20%7B%0A%20%20%20%20console.log(%20'hello!'%20)%3B%0A%20%20%7D%2C%0A%20%20%5Bcomputed%5D%3A%2042%0A%7D%3B%0A%0A%2F%2F%20template%20strings%0Alet%20message%20%3D%20%60%0A%20%20hello%20%24%7Bname%7D!%0A%20%20it's%20good%20to%20see%20you%60%3B%0A%0A%2F%2F%20destructuring%0Alet%20%7B%20x%2C%20y%20%7D%20%3D%20point%3B%0Alet%20%7B%20top%2C%20left%20%7D%20%3D%20element.getBoundingClientRect()%3B%0Alet%20%5B%20one%2C%20two%2C%20three%20%5D%20%3D%20document.querySelectorAll(%20'p'%20)%3B%0A%0A%2F%2F%20default%20parameters%0Afunction%20foo%20(%20options%20%3D%20%7B%7D%20)%20%7B%0A%20%20if%20(%20options.bar%20)%20alert(%20options.baz%20)%3B%0A%7D%0A%0A%2F%2F%20rest%20parameters%0Afunction%20sprintf%20(%20str%2C%20...values%20)%20%7B%0A%20%20return%20str.replace(%20%2F%25(w%2B)%2Fg%2C%20(%20match%2C%20type%20)%20%3D%3E%20%7B%0A%20%20%20%20return%20format(%20values.shift()%2C%20type%20)%3B%0A%20%20%7D)%3B%0A%7D%0A%0A%2F%2F%20spread%20operator%0Avar%20max%20%3D%20Math.max(%20...values%20)%3B%0A%0A%2F%2F%20block%20scoping%0Afor%20(%20let%20i%20%3D%200%3B%20i%20%3C%2010%3B%20i%20%2B%3D%201%20)%20%7B%0A%20%20const%20square%20%3D%20i%20*%20i%3B%0A%20%20setTimeout(%20()%20%3D%3E%20console.log(%20square%20)%2C%20i%20*%20100%20)%3B%0A%7D%0A%0A%2F%2F%20binary%20and%20octal%20literals%0A0b101010%20%3D%3D%3D%200o52%3B)
- [PostCSS - a tool for transforming CSS with JavaScript](https://postcss.org/)
- [rollup.js](https://rollupjs.org/guide/en)

## Installation

```
yarn
rollup -c
```
