'use strict';

// btns
const   startBtn = document.getElementById('start'),
        expensesBtn = document.querySelector('.expenses-item-btn'),
        optionalexpensesBtn = document.querySelector('.optionalexpenses-btn'),
        countBtn  = document.querySelector('.count-budget-btn'),
        allBtns = document.querySelectorAll('button');

// left fields
const   expensesItem = document.getElementsByClassName('expenses-item'),
        optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
        chooseIncome = document.querySelector('.choose-income'),
        savings = document.querySelector('#savings'),
        sumValue = document.querySelector('#sum'),
        percentValue = document.querySelector('#percent'),
        yearValue = document.querySelector('.year-value'),
        monthValue = document.querySelector('.month-value'),
        dayValue = document.querySelector('.day-value');

// right fields
const   budgetValue = document.querySelector('.budget-value'),
        daybudgetValue = document.querySelector('.daybudget-value'),
        levelValue = document.querySelector('.level-value'),
        expensesValue = document.querySelector('.expenses-value'),
        optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
        incomeValue = document.querySelector('.income-value'),
        monthsavingsValue = document.querySelector('.monthsavings-value'),
        yearsavingsValue = document.querySelector('.yearsavings-value');

let money,
    time,
    mostHavePays;

// разблокировка кнопок
startBtn.addEventListener('click', function() {
    for(let i = 0; i < allBtns.length; i++) {
        allBtns[i].disabled = false;
    }
});

// ввод даты и месячного дохода
startBtn.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }

    appData.budget = money; //передаем бюджет в объект
    appData.timeData = time; //передаем дату в объект
    // выводим в соответствующем поле округленное значение суммы бюджета
    budgetValue.textContent = money.toFixed();

    // парсим полученную дату, извлекаем из нее год/месяц/день и выводим даты в поля
    yearValue.value = new Date(Date.parse(time)).getFullYear(); 
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1; //единица потому что нумерация месяцев от 0 до 11 
    dayValue.value = new Date(Date.parse(time)).getDate(); 
});

// считаем обязательные расходы
expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;
        
        if ((typeof(a) === 'string') && (typeof(a) != null) && (typeof(b) != null) && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b; //доплюсовываем результат в сумму
        } else {
            i--;
        }
    }
    
    expensesValue.textContent = sum; //выводим результат в поле справа
    mostHavePays = sum;
});

// считаем не обязательные расходы
optionalexpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let a = optionalExpensesItem[i].value; 
        
        if ((typeof(a) === 'string') && (typeof(a) != null) && a != '' && a.length < 50) {
            appData.optionalExpenses[i] = a;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + [', '];
        } else {
            i--;
        }
    }
});

// расчет дневного бюджета
countBtn.addEventListener('click', function() {
    if (appData.budget != undefined && mostHavePays != undefined) {
        let realMoney = appData.budget - mostHavePays;

        //расчитываем бюджет
        appData.moneyPerDay = Math.round(realMoney / 30);
        //выводим результат в поле справа
        daybudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        daybudgetValue.textContent = 'Введите месячный доход';
    }
});

// дополнительный доход
chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    if (typeof(items) === 'string' && items != '' && items != null) {
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    }
});

// checkbox
savings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

// сумма накоплений
sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        
        appData.monthIncome = Math.round(sum/100/12*percent); //расчитываем на месяц
        appData.yearIncome = Math.round(sum/100*percent); //расчитываем на 1 год

        //выводим значение в поле и округляем его до одной цифты после запятой
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
// проценты вклада
percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
        percent = +percentValue.value;
    
    appData.monthIncome = Math.round(sum/100/12*percent); //расчитываем на месяц
    appData.yearIncome = Math.round(sum/100*percent); //расчитываем на 1 год

    //выводим значение в поле и округляем его до одной цифты после запятой
    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData =  {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income : [],
    timeData: time,
    savings: false
};