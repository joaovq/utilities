import signale from 'signale'

export default {
  error: function(...params: any[]) {
    signale.error(...params)
  },
  debug: function(...params: any[]) {
    signale.debug(...params)
  },
  info: function(...params: any[]) {
    signale.info(...params)
  },
  success: function(...params: any[]) {
    signale.success(...params)
  },
  log: function(...params: any[]) {
    console.log(...params)
  },
  emptyLine: function() {
    console.log()
  }
}
