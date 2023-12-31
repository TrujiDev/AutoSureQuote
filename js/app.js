/**
 * Represents an insurance policy.
 * @constructor
 * @param {string} brand - The brand of the vehicle.
 * @param {number} year - The year of the vehicle.
 * @param {string} type - The type of insurance policy.
 */
function Insurance(brand, year, type) {
	this.brand = brand;
	this.year = year;
	this.type = type;
}

Insurance.prototype.quoteInsurance = function () {
	let price;
	const base = 2000;

	switch (this.brand) {
		case 'American':
			price = base * 1.15;
			break;
		case 'Asian':
			price = base * 1.05;
			break;
		case 'European':
			price = base * 1.35;
			break;
		default:
			break;
	}

	/**
	 * Represents the difference between the current year and the year property.
	 * @type {number}
	 */
	const difference = new Date().getFullYear() - this.year;
	price -= (difference * 3 * price) / 100;

	if (this.type === 'basic') {
		price *= 1.3;
	} else {
		price *= 1.5;
	}

	return price;
};

function UI() {}

UI.prototype.fillOptions = () => {
	const max = new Date().getFullYear();
	const min = max - 23;

	/**
	 * Represents the select element for choosing a year.
	 * @type {HTMLSelectElement}
	 */
	const selectYear = document.querySelector('#year');

	for (let i = max; i >= min; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		selectYear.appendChild(option);
	}
};

UI.prototype.showMessage = (message, type) => {
	const div = document.createElement('DIV');

	if (type === 'error') {
		div.classList.add('error');
	} else {
		div.classList.add('correct');
	}

	div.classList.add('mt-10');
	div.textContent = message;

	/**
	 * Represents the insurance quote form.
	 * @type {HTMLFormElement}
	 */
	const form = document.querySelector('#insurance-quote');
	form.insertBefore(div, document.querySelector('#result'));

	setTimeout(() => {
		div.remove();
	}, 3000);
};

UI.prototype.showResult = (total, insurance) => {
	const { brand, year, type } = insurance;

	const div = document.createElement('DIV');
	div.classList.add('mt-10');
	div.innerHTML = `
        <p class="header">Summary</p>
        <p class="font-bold">Brand: <span class="font-normal">${brand}</span></p>
        <p class="font-bold">Year: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Type: <span class="font-normal capitalize">${type}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

	const result = document.querySelector('#result');
	/**
	 * Represents a spinner element.
	 * @type {HTMLElement}
	 */
	const spinner = document.querySelector('#loading');
	spinner.style.display = 'block';

	setTimeout(() => {
		spinner.style.display = 'none';
		result.appendChild(div);
	}, 3000);
};

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.fillOptions();
});

eventListeners();

/**
 * Attaches event listeners to the form element.
 */
function eventListeners() {
	const form = document.querySelector('#insurance-quote');
	form.addEventListener('submit', quoteInsurance);
}

/**
 * Calculates the insurance quote based on the selected brand, year, and type.
 * @param {Event} event - The event object.
 * @returns {void}
 */
function quoteInsurance(event) {
	event.preventDefault();

	const brand = document.querySelector('#brand').value;
	const year = document.querySelector('#year').value;
	const type = document.querySelector('input[name="type"]:checked').value;

	if (brand === '' || year === '' || type === '') {
		ui.showMessage('All fields are required', 'error');
		return;
	}

	const results = document.querySelector('#result div');
	if (results != null) {
		results.remove();
	}

	const insurance = new Insurance(brand, year, type);
	const total = insurance.quoteInsurance();

	ui.showResult(total, insurance);
}
