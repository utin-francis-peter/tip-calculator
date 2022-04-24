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
function warningStyles() {
	warning.classList.remove("hidden");
	warning.style.color = "red";
	peopleContainer.style.borderColor = "red";
}
// function that remove styles from dom elements if condition for computation is met
function removeWarningStyles() {
	warning.classList.add("hidden");
	peopleContainer.style.borderColor = "transparent";
}
// function that calculates tip amount per person
function tipAmountCalc(generalBill, numberOfPeople, tipPercent) {
	return ((tipPercent / 100) * generalBill) / numberOfPeople;
}
// function that calculates total amount per person
function totalAmountCalc(generalBill, numberOfPeople, tipPercent) {
	const computedTipAmount = tipAmountCalc(
		generalBill,
		numberOfPeople,
		tipPercent
	);
	// display the computed tip amount per person into tipAmount Dom as text content and truncate to 2dp
	tipAmount.textContent = computedTipAmount.toFixed(2);
	return computedTipAmount + generalBill / numberOfPeople;
}
// function that convert DOM elements to numbers and invoke calc functions to compute results
function toNumberAndTrigger(tipPercent) {
	const generalBill = Number(billInput.value);
	const numberOfPeople = Number(peopleInput.value);
	// invoking totalAmountCalc function which also invoked the tipAmountcalc function
	const computedTotalAmount = totalAmountCalc(
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
			tipAmount.textContent = "0.00";
			totalAmount.textContent = "0.00";
			//invokes computation function
			toNumberAndTrigger(tipPercent);
			// invokes removeWarningStyles function since condition for computation execution is met
			removeWarningStyles();
		} else {
			tipAmount.textContent = "0.00";
			totalAmount.textContent = "0.00";
			warningStyles();
		}
	});
}

// EXECUTING COMPUTATION WHEN CUSTOM TIP PERCENTAGE VALUE IS ENTERED
for (let i = 0; i < customTip.length; i++) {
	customTip[i].addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			const customTipPercentage = Number(customTip[i].value);
			const generalBill = Number(billInput.value);
			const numberOfPeople = Number(peopleInput.value);
			// invoking computation function if condition is met
			if (generalBill && numberOfPeople !== 0) {
				//invokes computation function
				toNumberAndTrigger(customTipPercentage);
				// invokes removeWarningStyles function
				removeWarningStyles();
			} else {
				warningStyles();
			}
		}
	});
}

// RESETING FIELDS, TEXT-CONTENTS AND VALUES WHEN RESET BUTTON IS CLICKED
reset.addEventListener("click", function () {
	for (let i = 0; i < customTip.length; i++) customTip[i].value = "";
	billInput.value = "";
	peopleInput.value = "";
	tipAmount.textContent = "0.00";
	totalAmount.textContent = "0.00";
});
