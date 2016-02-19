'use strict';

const inquirer = require('inquirer');

const twoDigits = (number) => {
  return number < 10 ? '0' + number : number;
};

const getMonth = (monthId) => {
  return +monthId - 1;
};

const getDate = (date) => {
  let day = twoDigits(date.getDate());
  let month = twoDigits(date.getMonth() + 1);
  return `${day}/${(month)}/${date.getFullYear()}`;
};

const getDifferenceByDays = (miliseconds) => {
  // to days ───────────────────────────┐
  // to hours ─────────────────────┐    │
  // to minutes ──────────────┐    │    │
  // to seconds ────────┐     │    │    │
  return miliseconds / 1000 / 60 / 60 / 24;
};

const questions = [
  {
    name: 'digits',
    type: 'input',
    message: 'Linha digitável:'
  },{
    name: 'value',
    type: 'input',
    'default': '0,00',
    message: 'Valor (inclua os centavos, separando por vírgula):'
  },{
    name: 'dueDate',
    type: 'input',
    'default': getDate(new Date()),
    message: 'Data do vencimento:'
  }
];

inquirer.prompt(questions, (answers) => {
  const newDate = answers.dueDate.split('/').map(num => +num);
  const firstDate = new Date(1997, getMonth(10), 7);
  const dueDate = new Date(newDate[2], getMonth(newDate[1]), newDate[0]);
  const value = answers.value.replace(/\D/g, '');
  const days = parseInt(getDifferenceByDays(dueDate - firstDate), 10);
  const newDigits = answers.digits.replace(/\D/g, '')
    .replace(/(0{14})$/, (match) => {
      return match.replace(/0{4}/, days)
        .replace(new RegExp(`0{${value.length}}$`), value);
    })
  ;
  console.log('Nova linha digitável:', newDigits);
});
