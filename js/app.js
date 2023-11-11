// Definition of a constructor function named 'Insurance' that takes three parameters: brand, year, type
function Insurance(brand, year, type) {
	this.brand = brand; // Assign the value of 'brand' to the 'brand' attribute of the object
	this.year = year; // Assign the value of 'year' to the 'year' attribute of the object
	this.type = type; // Assign the value of 'type' to the 'type' attribute of the object
}

// Definition of a 'quoteInsurance' method in the prototype of 'Insurance'
Insurance.prototype.quoteInsurance = function () {
	let price; // Declaration of the 'price' variable to store the insurance price calculation
	const base = 2000; // Definition of a constant 'base' with a value of 2000 as a base for the calculation

	// Switch statement to calculate the price based on the car brand
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

	// Calculation of the discount based on the car's age
	const difference = new Date().getFullYear() - this.year;
	price -= (difference * 3 * price) / 100;

	// Adjustment of the price based on the type of insurance
	if (this.type === 'basic') {
		price *= 1.3;
	} else {
		price *= 1.5;
	}

	// Return the calculated price
	return price;
};

// Definition of a constructor function named 'UI'
function UI() {}

// Definition of a 'fillOptions' method in the prototype of 'UI'
UI.prototype.fillOptions = () => {
	const max = new Date().getFullYear(); // Get the current year
	const min = max - 23; // Calculate the minimum year by subtracting 23 years from the current year

	const selectYear = document.querySelector('#year'); // Select the element with the id 'year' in the document

	// For loop to fill the options of the dropdown menu with years
	for (let i = max; i >= min; i--) {
		const option = document.createElement('option'); // Create an 'option' element in the document
		option.value = i; // Assign the value of the year to the 'value' attribute of the 'option' element
		option.textContent = i; // Assign the text of the year to the content of the 'option' element
		selectYear.appendChild(option); // Add the 'option' element to the dropdown menu
	}
};

// Definition of a 'showMessage' method in the prototype of 'UI'
UI.prototype.showMessage = (message, type) => {
	const div = document.createElement('DIV'); // Create a 'div' element in the document

	// Apply CSS classes to the 'div' element based on the message type
	if (type === 'error') {
		div.classList.add('error');
	} else {
		div.classList.add('correct');
	}

	div.classList.add('mt-10'); // Add a top margin class to the 'div' element
	div.textContent = message; // Assign the message to the content of the 'div' element

	const form = document.querySelector('#insurance-quote'); // Select the form with the id 'insurance-quote'
	form.insertBefore(div, document.querySelector('#result')); // Insert the 'div' element before the element with the id 'result' in the form

	// Remove the message after 3 seconds
	setTimeout(() => {
		div.remove();
	}, 3000);
};

// Definition of a 'showResult' method in the prototype of 'UI'
UI.prototype.showResult = (total, insurance) => {
	const { brand, year, type } = insurance; // Destructure the 'insurance' object to get its attributes

	const div = document.createElement('DIV'); // Create a 'div' element in the document
	div.classList.add('mt-10'); // Add a top margin class to the 'div' element
	div.innerHTML = `
        <p class="header">Summary</p>
        <p class="font-bold">Brand: <span class="font-normal">${brand}</span></p>
        <p class="font-bold">Year: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Type: <span class="font-normal capitalize">${type}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `; // Assign an HTML content to the 'div' element with information about the insurance and the total

	const result = document.querySelector('#result'); // Select the element with the id 'result'
	const spinner = document.querySelector('#loading'); // Select the element with the id 'loading'
	spinner.style.display = 'block'; // Show the spinner

	// Show the result after 3 seconds and hide the spinner
	setTimeout(() => {
		spinner.style.display = 'none';
		result.appendChild(div);
	}, 3000);
};

// Instance of the UI class
const ui = new UI();

// Event listener for the DOMContentLoaded event to execute the 'fillOptions' function when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	ui.fillOptions();
});

// Event setup
eventListeners();

// Function to set up events
function eventListeners() {
	const form = document.querySelector('#insurance-quote'); // Select the form with the id 'insurance-quote'
	form.addEventListener('submit', quoteInsurance); // Add a 'submit' event to the form that executes the 'quoteInsurance' function
}

// Function to handle the submission of the insurance quote form
function quoteInsurance(event) {
	event.preventDefault(); // Prevent the default form behavior

	const brand = document.querySelector('#brand').value; // Get the value of the brand field
	const year = document.querySelector('#year').value; // Get the value of the year field
	const type = document.querySelector('input[name="type"]:checked').value; // Get the value of the selected insurance type

	// Validate the form inputs
	if (brand === '' || year === '' || type === '') {
		ui.showMessage('All fields are required', 'error'); // Show an error message if any field is empty
		return;
	}

	const results = document.querySelector('#result div'); // Select the div element within #result
	if (results != null) {
		results.remove(); // Remove previous results
	}

	const insurance = new Insurance(brand, year, type); // Create an Insurance object with the form data
	const total = insurance.quoteInsurance(); // Calculate the total insurance cost

	ui.showResult(total, insurance); // Display the result in the user interface
}
