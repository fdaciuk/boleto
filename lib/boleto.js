;(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define('boleto', factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.boleto = factory()
  }
})(this, function () {
  'use strict'

  function getMonth (monthId) {
    return +monthId - 1
  }

  function getDifferenceByDays (miliseconds) {
    return miliseconds / 1000 / 60 / 60 / 24
  }

  function lessThan14ZerosAtTheEnd (number) {
    return !number.match(/\d{14}$/)
  }

  function hasLength47Digits (number) {
    return number.length === 47
  }

  function boleto (answers) {
    var clearDigits = answers.digits.replace(/\D/g, '')
    if (
      !hasLength47Digits(clearDigits) ||
      lessThan14ZerosAtTheEnd(clearDigits)
    ) {
      return 'Linha digitável inválida!'
    }
    var newDate = answers.dueDate.split('/').map((num) => +num)
    var firstDate = new Date(1997, getMonth(10), 7)
    var dueDate = new Date(newDate[2], getMonth(newDate[1]), newDate[0])
    var value = answers.value.replace(/\D/g, '')
    var days = parseInt(getDifferenceByDays(dueDate - firstDate), 10)
    var newDigits = clearDigits
      .replace(/(0{14})$/, (match) => {
        return match.replace(/0{4}/, days)
          .replace(new RegExp(`0{${value.length}}$`), value)
      })

    return newDigits
  }

  return boleto
})
