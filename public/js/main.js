;(function (boleto) {
  'use strict'

  function $ (el) {
    return document.querySelector(el)
  }

  var $digits = $('[data-js="digits"]')
  var $date = $('[data-js="date"]')
  var $value = $('[data-js="value"]')
  var $generate = $('[data-js="generate"]')
  var $newCode = $('[data-js="new-code"]')

  $generate.onclick = function () {
    console.log($date.value)
    var newNumber = boleto({
      digits: $digits.value,
      dueDate: $date.value,
      value: $value.value
    })

    $newCode.innerText = newNumber
  }
})(window.boleto)

