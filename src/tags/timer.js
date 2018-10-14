export default function timer (opts) {
  this.time = opts.start || 0

  tick() {
    this.update({ time: ++this.time })
  }

  var timer = setInterval(this.tick, 1000)

  this.on('unmount', function () {
    clearInterval(timer)
  })
}
