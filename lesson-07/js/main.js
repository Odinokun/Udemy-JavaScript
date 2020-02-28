'use strict';

// btns
const btnStart = document.getElementById('start'),
      btnExpenses = document.getElementsByTagName('button[0]'),
      btnCount  = document.getElementsByTagName('button[1]');

// left fields
const expensesItem = document.querySelector('.expenses-item'),
      optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
const chooseIncome = document.querySelector('.choose-income-label');
const savings = document.querySelector('#savings');
const sum = document.querySelector('#sum');
const percent = document.querySelector('#percent');
const yearValue = document.querySelector('.year-value');
const monthValue = document.querySelector('.month-value');
const dayValue = document.querySelector('.day-value');
// right fields
const budgetValue = document.querySelector('.budget-value'),
      daybudgetValue = document.querySelector('.daybudget-value'),
      levelValue = document.querySelector('.level-value'),
      expensesValue = document.querySelector('.expenses-value'),
      optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
      incomeValue = document.querySelector('.income-value'),
      monthsavingsValue = document.querySelector('.monthsavings-value'),
      yearsavingsValue = document.querySelector('.yearsavings-value');


      let money,
      time;
  
  function start() {
      while(isNaN(money) || money == '' || money == null) {
          money = +prompt('Ваш бюджет на месяц?', '');
      }
  
      time = prompt('Введите дату в формате YYYY-MM-DD', '');
  }
  start();
  
  let appData =  {
      budget: money,
      expenses: {},
      optionalExpenses: {},
      income : [],
      timeData: time,
      savings: true,
      chooseExpenses: function() { //Расчет обязательных расходов
          for (let i = 0; i < 2; i++) {
              let a = prompt('Введите обязательную статью расходов в этом месяце', '');
              let b = prompt('Во сколько обойдется?', '');
              
              if ((typeof(a) === 'string') && (typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
                  appData.expenses[a] = b;
              } else {
                  i--;
              }
          }
      },
      chooseOptExpenses: function() { //Расчет необязательных расходов
          for (let i = 0; i < 3; i++) {
              let a = prompt('Статья необязательных расходов?', '');
          
              if ((typeof(a) === 'string') && (typeof(a) != null) && a != '' && a.length < 50) {
                  appData.optionalExpenses[i + 1] = a;
              } else {
                  i--;
              }
          }
      },
      detectDayBudget: function() { //Расчет ежедневного бюждета
          appData.moneyPerDay = Math.round(appData.budget / 30);
          alert('Ежедневный бюджет: ' + appData.moneyPerDay);
      },
      detectLevel: function() { //Расчет уровня достатка
          if (appData.moneyPerDay < 100) {
              console.log('Минимальный уровень достатка');
          } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
              console.log('Средний уровень достатка');
          } else if (appData.moneyPerDay > 2000) {
              console.log('Высокий уровень достатка');
          } else {
              console.log('Произошла ошибка');
          }
      },
      checkSavings: function() { //Расчет дохода с депозита
          if (appData.savings == true) {
              let save = +prompt('Какова сумма накоплений?');
              let percent = +prompt('Под какой процент?');
          
              appData.monthIncome = Math.round(save/100/12*percent);
              alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
          }
      },
      chooseIncome: function() { //Дополнительный доход который можно получить
  
          for (let i = 0; i < 1; i++) {
              let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
  
              if (typeof(items) === 'string' && items != '' && items != null) {
                  appData.income = items.split(', ');
                  // console.log(appData.income);
                  // appData.income.push(prompt('Может что-то еще?', ''));
                  appData.income.sort();
  
                  appData.income.forEach((item, index) => {
                      alert('Способы нашего доп. заработка: ' + (index + 1) + ' - ' + item);
                  });
              } else {
                  // console.log('this is fack');
                  i--;
              }
          }
  
      }
  };
  
  console.log(appData);
  appData.chooseIncome();
  
  for (let key in appData) {
      console.log('Ключ - ' + key + ' и его значение ' + appData[key]);
  }