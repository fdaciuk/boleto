#!/usr/bin/env node

'use strict'

const inquirer = require('inquirer')
const boleto = require('./lib/boleto')

const twoDigits = (number) => {
  return number < 10 ? '0' + number : number
}

const getDate = (date) => {
  const day = twoDigits(date.getDate())
  const month = twoDigits(date.getMonth() + 1)
  return `${day}/${(month)}/${date.getFullYear()}`
}

const questions = [
  {
    name: 'digits',
    type: 'input',
    message: 'Linha digitável:'
  }, {
    name: 'value',
    type: 'input',
    'default': '0,00',
    message: 'Valor (inclua os centavos, separando por vírgula):'
  }, {
    name: 'dueDate',
    type: 'input',
    'default': getDate(new Date()),
    message: 'Data do vencimento:'
  }
]

inquirer.prompt(questions, (answers) => (
  console.log('Nova linha digitável:', boleto(answers))
))
