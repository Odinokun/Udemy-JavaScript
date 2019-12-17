'use strict';

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
    savings: true
};


//Расчет обязательных расходов
function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let a = prompt('Введите обязательную статью расходов в этом месяце', '');
        let b = prompt('Во сколько обойдется?', '');
        
        if ((typeof(a) === 'string') && (typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
        } else {
            i--;
        }
    }
}
chooseExpenses();


//Расчет необязательных расходов
function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
        let a = prompt('Статья необязательных расходов?', '');

        if ((typeof(a) === 'string') && (typeof(a) != null) && a != '' && a.length < 50) {
            appData.optionalExpenses[i + 1] = a;
        } else {
            i--;
        }
    }
}
chooseOptExpenses();


// Расчет ежедневного бюждета
function detectDayBudget() {
    appData.moneyPerDay = Math.round(appData.budget / 30);
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
}
detectDayBudget();


// Расчет уровня достатка
function detectLevel(){
    if (appData.moneyPerDay < 100) {
        console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
        console.log('Высокий уровень достатка');
    } else {
        console.log('Произошла ошибка');
    }
}
detectLevel();


//Расчет дохода с депозита
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('Какова сумма накоплений?');
        let percent = +prompt('Под какой процент?');

        appData.monthIncome = Math.round(save/100/12*percent);
        alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
}
checkSavings();

console.log(appData);