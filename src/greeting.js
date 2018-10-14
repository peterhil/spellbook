import riot from 'riot'

export default riot.tag('my-tag', `
  <p>{ message }</p>
  <ul each="{ greeting in greetings }">
    <li>{ greeting }</li>
  </ul>
  <button onclick="{ onClick }">Click me</button>
`, function() {
  this.message = 'Some greetings for you:'
  this.greetings = ['hallo', 'ciao', 'hoy', 'hola']

  this.onClick = function() {
    this.greetings.reverse()
  }.bind(this)
})
