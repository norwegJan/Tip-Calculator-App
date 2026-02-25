const tipCalculator = document.querySelector("#calc-form");
const currencies = document.querySelector("#currency-select");
const billInput = document.querySelector("#bill-input");
const currencyIcons = document.querySelectorAll(".currency-icon");

tipCalculator.addEventListener("submit", (e) => {
  e.preventDefault();
});

currencies.addEventListener("change", setCurrency);

function setCurrency() {
  const selectedCurrency = currencies.value;
  currencyIcons.forEach((element) => element.classList.add("hidden"));

  if (selectedCurrency === `NOK`) {
    billInput.classList.add("nok-bg");
    billInput.classList.remove("eur-bg");
    billInput.classList.remove("usd-bg");
    currencyIcons[0].classList.remove("hidden");
    currencyIcons[3].classList.remove("hidden");
  } else if (selectedCurrency === `EUR`) {
    billInput.classList.add("eur-bg");
    billInput.classList.remove("nok-bg");
    billInput.classList.remove("usd-bg");
    currencyIcons[1].classList.remove("hidden");
    currencyIcons[4].classList.remove("hidden");
  } else if (selectedCurrency === `USD`) {
    billInput.classList.add("usd-bg");
    billInput.classList.remove("nok-bg");
    billInput.classList.remove("eur-bg");
    currencyIcons[2].classList.remove("hidden");
    currencyIcons[5].classList.remove("hidden");
  }
}

setCurrency();

console.log(currencyIcons);
