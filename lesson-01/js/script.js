'use strict';

let money = prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData =  {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income : [],
    savings: false
};

let quest1 = prompt('Введите обязательную статью расходов в этом месяце', '');
let quest2 = prompt('Во сколько обойдется?', '');
let quest3 = prompt('Введите обязательную статью расходов в этом месяце', '');
let quest4 = prompt('Во сколько обойдется?', '');

appData.expenses[quest1] = quest2;
appData.expenses[quest3] = quest4;

alert(appData.budget / 30);