'use strict';
 
const cards4 = document.querySelector('.four_cards');
const cards6 = document.querySelector('.six_cards');
const cards8 = document.querySelector('.eight_cards');
const button = document.querySelector('.btn');
const resultsCards = document.querySelector('.cards');

const adalabCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let number = 0;

function choosePairs() {
  if (cards4.checked) {
    number = 4;
    saveData(4);
  } else if (cards6.checked) {
    number = 6;
    saveData(6);
  } else if (cards8.checked) {
    number = 8;
    saveData(8);
  }
  
}
button.addEventListener('click',choosePairs);

function getResults() {
  const inputs = document.querySelectorAll('.input');
  for  (const input of inputs) {
    if (input.checked === true) {
      number = input.value;
    }
  }
  
  const api = `https://raw.githubusercontent.com/Adalab/cards-data/master/${number}.json`;
  resultsCards.innerHTML = '';
  
  fetch(api)
    .then(response => response.json())
    .then(data => {
      for (const result of data) {
        resultsCards.innerHTML += `
        <li class="cards__list">
          <img class="cards__adalab" src="${adalabCard}">
          <img class="cards__pokemon hidden" src="${result.image}">
        </li>`;

      }
      const cards = document.querySelectorAll('.cards__list');
      for (const card of cards){
        card.addEventListener('click',flipCards);
      }
    });
  
}



function flipCards (event){
  const cards = event.currentTarget;
  const cardPokemon = cards.querySelector('.cards__pokemon');
  const classAdalab = cards.querySelector('.cards__adalab');
  cardPokemon.classList.toggle('hidden');
  classAdalab.classList.toggle('hidden');
}

/* const storeCard = localStorage.getItem('inputValue');
inputValue();

function inputValue() {
  if (storeCard === '4'){
    cards4.checked = true;
  } else if (storeCard === '6') {
    cards6.checked = true;
  } else if (storeCard === '8') {
    cards8.checked = true;
  }
}

function saveData(number){
  localStorage.setItem('inputValue',number);
}
 */

function saveNumber (event){
  const input = event.currentTarget;
  localStorage.setItem('inputValue',input.value);
 }
function getNumber () {
  let storeCard = localStorage.getItem('inputValue');
  console.log(storeCard);
  if(localStorage.getItem('inputValue') === null){
    storeCard = '4';
  }
  const inputs = document.querySelectorAll('.input');
  for (const input of inputs) {
    console.log(input.value, storeCard);
  
    if (input.value === storeCard) { 
      console.log('ahora');
      input.setAttribute('checked', true);
    }
  }
}
getNumber();



const inputs = document.querySelectorAll('.input');
for  (const input of inputs) {
   input.addEventListener('click', saveNumber) 

  }

button.addEventListener('click',getResults);