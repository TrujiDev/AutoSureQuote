function Insurance(brand, year, type) {
	this.brand = brand;
	this.year = year;
	this.type = type;
}

function UI() {}

UI.prototype.fillOptions = () => {
	const max = new Date().getFullYear(),
		min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.fillOptions();
});