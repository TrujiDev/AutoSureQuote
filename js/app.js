function Insurance(brand, year, type) {
	this.brand = brand;
	this.year = year;
	this.type = type;
}

function UI() {}

UI.prototype.fillOptions = () => {
	const max = new Date().getFullYear(),
		min = max - 23;

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
    
	div.classList.add('message', 'mt-10');
    div.textContent = message;
    
	const form = document.querySelector('#insurance-quote');
	form.insertBefore(div, document.querySelector('#result'));

	setTimeout(() => {
		div.remove();
	}, 3000);
};

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.fillOptions();
});

eventListeners();

function eventListeners() {
	const form = document.querySelector('#insurance-quote');
	form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance(event) {
	event.preventDefault();

	const brand = document.querySelector('#brand').value;
	const year = document.querySelector('#year').value;
	const type = document.querySelector('input[name="type"]:checked').value;

	if (brand === '' || year === '' || type === '') {
        ui.showMessage('All fields are required', 'error');
        return;
    }
    ui.showMessage('Quoting...', 'correct');
}
