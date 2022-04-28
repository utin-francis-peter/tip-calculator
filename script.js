"use strict";
// accessing and storing DOM elements into a global environment
const billInput = document.querySelector(".bill-input");
const percentage = document.querySelectorAll(".percentage");
const peopleInput = document.querySelector(".people-input");
const tipAmount = document.querySelector(".tipAmountPerPerson");
const totalAmount = document.querySelector(".totalPerPerson");
const customTip = document.querySelectorAll(".custom-percentage");
const peopleContainer = document.querySelector(".people-container");
const warning = document.querySelector(".warning");
const reset = document.querySelector(".reset");

// FUNCTIONS ENVIRONMENT FOR DIFFERENT PURPOSES
// function that styles dom elements if condition for computation isn't met
function addWarningStyles() {
	warning.classList.remove("hidden");
	warning.style.color = "red";
	peopleContainer.style.borderColor = "red";
}
// function that remove styles from dom elements if condition for computation is met
function removeWarningStyles() {
	warning.classList.add("hidden");
	peopleContainer.style.borderColor = "transparent";
}
// function that resets tip and total amount values to zero before new computation is done
function resetOutputValues() {
	tipAmount.textContent = "0.00";
	totalAmount.textContent = "0.00";
}
// function that calculates tip amount per person
function calculateTipAmount(generalBill, numberOfPeople, tipPercent) {
	return ((tipPercent / 100) * generalBill) / numberOfPeople;
}
// function that calculates total amount per person
function calculateTotalAmount(generalBill, numberOfPeople, tipPercent) {
	const computedTipAmount = calculateTipAmount(
		generalBill,
		numberOfPeople,
		tipPercent
	);
	// display the computed tip amount per person into tipAmount Dom as text content and truncate to 2dp
	tipAmount.textContent = computedTipAmount.toFixed(2);
	return computedTipAmount + generalBill / numberOfPeople;
}
// function that convert DOM elements to numbers and invoke calc functions to compute results
function TriggerTotalAmountCalc(tipPercent) {
	const generalBill = Number(billInput.value);
	const numberOfPeople = Number(peopleInput.value);
	// invoking calculateTotalAmount function which also invoked the calculateTipAmount function
	const computedTotalAmount = calculateTotalAmount(
		generalBill,
		numberOfPeople,
		tipPercent
	);
	// display the computed total amount per person into totalAmount Dom as text content and truncate to 2dp
	totalAmount.textContent = computedTotalAmount.toFixed(2);
}

// EXECUTING COMPUTATION WHEN EITHER OF THE PERCENTAGE BUTTONS IS CLICKED
for (let i = 0; i < percentage.length; i++) {
	// adding event listener to each buttons
	percentage[i].addEventListener("click", function () {
		// converting each clicked tip percentage textcontent to a number
		const tipPercent = Number(percentage[i].textContent);
		// converting other needed dom element values to number
		const generalBill = Number(billInput.value);
		const numberOfPeople = Number(peopleInput.value);
		// invoking computation function if condition is met
		if (generalBill && numberOfPeople !== 0) {
			// resets current tip amount and total amount values before calling the computation function
			resetOutputValues();
			//invokes computation function
			TriggerTotalAmountCalc(tipPercent);
			// invokes removeWarningStyles function since condition for computation execution is met
			removeWarningStyles();
		} else {
			tipAmount.textContent = "0.00";
			totalAmount.textContent = "0.00";
			addWarningStyles();
		}
	});
}

// EXECUTING COMPUTATION WHEN CUSTOM TIP PERCENTAGE VALUE IS ENTERED
for (let i = 0; i < customTip.length; i++) {
	customTip[i].addEventListener("input", function () {
		const customTipPercentage = Number(customTip[i].value);
		const generalBill = Number(billInput.value);
		const numberOfPeople = Number(peopleInput.value);
		// invoking computation function if condition is met
		if (generalBill && numberOfPeople !== 0) {
			// resets current tip amount and total amount values before calling the computation function
			resetOutputValues();
			//invokes computation function
			TriggerTotalAmountCalc(customTipPercentage);
			// invokes removeWarningStyles function
			removeWarningStyles();
		} else {
			// resets current tip amount and total amount values before calling the computation function
			resetOutputValues();
			addWarningStyles();
		}
	});
}

// RESETING INPUT FIELD VALUES AND TEXT-CONTENTS WHEN RESET BUTTON IS CLICKED
reset.addEventListener("click", function () {
	for (let i = 0; i < customTip.length; i++) customTip[i].value = "";
	billInput.value = "";
	peopleInput.value = "";
	resetOutputValues();
	removeWarningStyles();
});
