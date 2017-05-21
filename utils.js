let clear = () => console.clear()

let log = (msg) => console.log(msg)

let logf = (format, _values) => {
  if (_values) {
    let newFormat = Object
      .keys(_values)
      .reduce((a, v) => a.replace('${' + v + '}', '${_values.' + v + '}'), format)
    log(eval('`' + newFormat + '`'))
  } else {
    log(format)
  }
}

let group = (groupName, fn) => {
  console.groupCollapsed(groupName)
  fn()
  console.groupEnd()
}

let measureTime = (fn) => {
  console.time()
  fn()
  console.timeEnd()
}

let groupAndMeasureTime = (groupName, fn) => group(groupName, () => measureTime(fn))

export { clear, log, logf, group, measureTime, groupAndMeasureTime }
