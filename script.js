// DECLARE VARIABLES

const tipCalculator = document.querySelector("#calc-form");

const currencies = document.querySelector("#currency-select");
const currencyIcons = document.querySelectorAll(".currency-icon");
const resultDisplays = document.querySelectorAll(".amount-result");

const billInput = document.querySelector("#bill-input");
const tipPresetInput = document.querySelectorAll(".percentBtn");
const tipCustomInput = document.querySelector("#custom-input");
const peopleInput = document.querySelector("#people-input");

const billError = document.querySelector("#bill-error");
const peopleError = document.querySelector("#people-error");
const customError = document.querySelector("#custom-error");

const tipAmount = document.querySelector("#tip-amount-result");
const totalAmount = document.querySelector("#total-amount-result");

const resetBtn = document.querySelector("#reset-btn");

let selectedTipValue = 0;

let billTouched = false;
let billDirty = false;
let peopleTouched = false;
let peopleDirty = false;
let customTouched = false;
let customDirty = false;

// ADD EVENT LISTENERS

tipCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
});

currencies.addEventListener("change", setCurrency);

billInput.addEventListener("blur", (e) => {
  billTouched = true;
});

peopleInput.addEventListener("blur", (e) => {
  peopleTouched = true;
});

billInput.addEventListener("input", (e) => {
  billDirty = true;
  updateCalcState();
});

peopleInput.addEventListener("input", () => {
  peopleDirty = true;
  updateCalcState();
});

tipPresetInput.forEach((button) => {
  button.addEventListener("click", (e) => {
    tipPresetInput.forEach((button) => button.classList.remove("active-state"));
    e.currentTarget.classList.add("active-state");
    setTipValue("preset", Number(e.currentTarget.value));
    customError.textContent = "";
    tipCustomInput.classList.remove("error-state");
    customTouched = false;
    customDirty = false;
  });
});

tipCustomInput.addEventListener("focus", () => {
  tipPresetInput.forEach((button) => button.classList.remove("active-state"));
  selectedTipValue = 0;
});

tipCustomInput.addEventListener("blur", (e) => {
  customTouched = true;
});

tipCustomInput.addEventListener("input", () => {
  customDirty = true;
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
    if (Number.isInteger(value) && value > 0 && value <= 100) {
      selectedTipValue = value;
    } else {
      selectedTipValue = 0;
    }
  }
  updateCalcState();
}

function setError(inputEl, errorEl, showError, message) {
  if (showError) {
    errorEl.textContent = message;
    inputEl.classList.add("error-state");
  } else {
    errorEl.textContent = "";
    inputEl.classList.remove("error-state");
  }
}

function updateCalcState() {
  const billValue = billInput.valueAsNumber;
  const peopleValue = peopleInput.valueAsNumber;
  const customValue = tipCustomInput.valueAsNumber;
  const invalidBill = !Number.isFinite(billValue) || billValue <= 0;
  const invalidPeople = !Number.isFinite(peopleValue) || peopleValue <= 0;
  const invalidCustom =
    !Number.isFinite(customValue) || customValue <= 0 || customValue > 100;
  const showBillError = invalidBill && billDirty;
  const showPeopleError = invalidPeople && peopleDirty;
  // prettier-ignore
  const customInUse = (tipCustomInput.value.trim() !== "") || (customTouched || customDirty);
  const showCustomError = customInUse && invalidCustom && customDirty;

  setError(
    billInput,
    billError,
    showBillError,
    "Please enter valid number over 0",
  );
  setError(peopleInput, peopleError, showPeopleError, "Number must be over 0");
  setError(
    tipCustomInput,
    customError,
    showCustomError,
    "Number must be between 1 and 100",
  );

  if (invalidBill || invalidPeople) {
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
    return;
  } else {
    const tipPerPerson = (billValue * (selectedTipValue / 100)) / peopleValue;
    const totalPerPerson =
      (billValue * (1 + selectedTipValue / 100)) / peopleValue;
    tipAmount.textContent = tipPerPerson.toFixed(2);
    totalAmount.textContent = totalPerPerson.toFixed(2);
  }
}

function resetCalcState() {
  tipCalculator.reset();
  selectedTipValue = 0;
  tipPresetInput.forEach((button) => button.classList.remove("active-state"));
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
  billError.textContent = "";
  peopleError.textContent = "";
  customError.textContent = "";
  tipCustomInput.classList.remove("error-state");
  billInput.classList.remove("error-state");
  peopleInput.classList.remove("error-state");
  billTouched = false;
  billDirty = false;
  peopleTouched = false;
  peopleDirty = false;
  customTouched = false;
  customDirty = false;
  setCurrency();
}

resetCalcState();
