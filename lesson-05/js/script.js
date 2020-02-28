'use strict';

let menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu-item'),
    newMenuItem = document.createElement('li'),
    title = document.getElementById('title'),
    adv = document.querySelector('.adv'),
    question = prompt('Ваше отношение к технике apple', ''),
    answer = document.getElementById('prompt');


// отсортировали пункты меню
menu.insertBefore(menuItem[2], menuItem[1]);

// добавляем пятый пункт меню
newMenuItem.classList.add('menu-item');
newMenuItem.innerText = 'Пятый пункт';
menu.appendChild(newMenuItem);

// меняем фоновую картинку
document.body.style.backgroundImage = 'url(../img/apple_true.jpg)';

// меняем заголовок
title.innerText = 'Мы продаем только подлинную технику Apple';

//удаляем рекламу
adv.remove();

//задаем вопрос
answer.innerText = question;