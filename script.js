// DECLARE VARIABLES

const tipCalculator = document.querySelector("#calc-form");

const currencies = document.querySelector("#currency-select");
const currencyIcons = document.querySelectorAll(".currency-icon");
const resultDisplays = document.querySelectorAll(".amount-result");

const billInput = document.querySelector("#bill-input");
const tipPresetInput = document.querySelectorAll(".percentBtn");
const tipCustomInput = document.querySelector("#custom-input");
const peopleInput = document.querySelector("#people-input");

const tipAmount = document.querySelector("#tip-amount-result");
const totalAmount = document.querySelector("#total-amount-result");

const resetBtn = document.querySelector("#reset-btn");

let selectedTipValue = 0;

// ADD EVENT LISTENERS

tipCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
});

currencies.addEventListener("change", setCurrency);

billInput.addEventListener("input", updateCalcState);
peopleInput.addEventListener("input", updateCalcState);

tipPresetInput.forEach((button) => {
  button.addEventListener("click", (e) => {
    tipPresetInput.forEach((button) => button.classList.remove("active-state"));
    e.currentTarget.classList.add("active-state");
    setTipValue("preset", Number(e.currentTarget.value));
  });
});

tipCustomInput.addEventListener("focus", () => {
  tipPresetInput.forEach((button) => button.classList.remove("active-state"));
});

tipCustomInput.addEventListener("input", () => {
  setTipValue("custom", tipCustomInput.valueAsNumber);
});

resetBtn.addEventListener("click", resetCalcState);

// DECLARE FUNCTIONS

function setCurrency() {
  const selectedCurrency = currencies.value;
  currencyIcons.forEach((element) => element.classList.add("hidden"));
  resultDisplays.forEach((element) => element.classList.remove("icon-before"));

  if (selectedCurrency === `NOK`) {
    billInput.classList.add("nok-bg");
    billInput.classList.remove("eur-bg");
    billInput.classList.remove("usd-bg");
    billInput.classList.remove("gbp-bg");
    currencyIcons[0].classList.remove("hidden");
    currencyIcons[4].classList.remove("hidden");
  } else if (selectedCurrency === `EUR`) {
    billInput.classList.add("eur-bg");
    billInput.classList.remove("nok-bg");
    billInput.classList.remove("usd-bg");
    billInput.classList.remove("gbp-bg");
    currencyIcons[1].classList.remove("hidden");
    currencyIcons[5].classList.remove("hidden");
    resultDisplays[0].classList.add("icon-before");
    resultDisplays[1].classList.add("icon-before");
  } else if (selectedCurrency === `USD`) {
    billInput.classList.add("usd-bg");
    billInput.classList.remove("nok-bg");
    billInput.classList.remove("eur-bg");
    billInput.classList.remove("gbp-bg");
    currencyIcons[2].classList.remove("hidden");
    currencyIcons[6].classList.remove("hidden");
    resultDisplays[0].classList.add("icon-before");
    resultDisplays[1].classList.add("icon-before");
  } else if (selectedCurrency === `GBP`) {
    billInput.classList.add("gbp-bg");
    billInput.classList.remove("nok-bg");
    billInput.classList.remove("eur-bg");
    billInput.classList.remove("usd-bg");
    currencyIcons[3].classList.remove("hidden");
    currencyIcons[7].classList.remove("hidden");
    resultDisplays[0].classList.add("icon-before");
    resultDisplays[1].classList.add("icon-before");
  }
}

function setTipValue(source, value) {
  if (source === "preset") {
    selectedTipValue = value;
    tipCustomInput.value = "";
  } else if (source === "custom") {
    if (Number.isInteger(value) && value >= 0) {
      selectedTipValue = value;
    } else {
      selectedTipValue = 0;
    }
  }
  updateCalcState();
}

function updateCalcState() {
  const billValue = billInput.valueAsNumber;
  const peopleValue = peopleInput.valueAsNumber;
  const invalidBill = !Number.isFinite(billValue) || billValue <= 0;
  const invalidPeople = !Number.isFinite(peopleValue) || peopleValue <= 0;

  // console.log(`The selected tip value is ${selectedTipValue}`);
  // console.log(`The bill amount is ${billValue}`);
  // console.log(` The # of people is ${peopleValue}`);

  if (invalidBill || invalidPeople) {
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
    return;
  }
  const tipPerPerson = (billValue * (selectedTipValue / 100)) / peopleValue;
  const totalPerPerson =
    (billValue * (1 + selectedTipValue / 100)) / peopleValue;
  tipAmount.textContent = tipPerPerson.toFixed(2);
  totalAmount.textContent = totalPerPerson.toFixed(2);
}

function resetCalcState() {
  tipCalculator.reset();
  selectedTipValue = 0;
  tipPresetInput.forEach((button) => button.classList.remove("active-state"));
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
}

setCurrency();
updateCalcState();

// console.log(`The selected tip value is ${selectedTipValue}`);

/* billInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log(`The bill amount is ${billInput.value}`);
  }
}); */
