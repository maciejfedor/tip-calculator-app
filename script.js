'use strict';

const inputBill = document.querySelector('.input-bill');
const inputPeople = document.querySelector('.input-people');
const inputCustom = document.querySelector('.btn--custom');
const inputBtns = document.querySelectorAll('.input-btns');
const labelError = document.querySelector('.label-error');
const btn = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const amountTip = document.querySelector('.tip-amount');
const amountTotal = document.querySelector('.tip-amount--total');

const removeLatestActive = function () {
  btn.forEach(function (btnActive) {
    btnActive.classList.remove('btn--active');
  });
};

const init = function () {
  amountTip.textContent = '$0.00';
  amountTotal.textContent = '$0.00';
  removeLatestActive();
  inputBill.value = '';
  inputPeople.value = '';
  inputCustom.value = '';
};

init();

const calcTip = function () {
  const bill = Number(inputBill.value);
  const people = Number(inputPeople.value);
  const tipPercent = currentBtn ? Number(currentBtn.value) : 0;

  if (inputPeople.value === '0') {
    labelError.classList.add('hidden');
    inputPeople.classList.add('input-people--error');
  } else {
    labelError.classList.remove('hidden');
    inputPeople.classList.remove('input-people--error');
  }

  if (bill && people !== 0) {
    const tip = (bill * tipPercent) / 100 / people;
    const total = (tip + bill) / people;

    amountTip.textContent = `$${tip.toFixed(2)}`;
    amountTotal.textContent = `$${total.toFixed(2)}`;
  }
};

let currentBtn;

btn.forEach(function (button, i) {
  button.addEventListener('click', function () {
    removeLatestActive();
    if (!button.classList.contains('btn--custom')) {
      button.classList.toggle('btn--active');
    }
    currentBtn = button;
    calcTip();
  });
});

inputBill.addEventListener('input', calcTip);
inputPeople.addEventListener('input', calcTip);
btnReset.addEventListener('click', init);
