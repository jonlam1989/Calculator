class Calculator {
	constructor() {
		this.monthlyPayments = 0;
		this.principalPaid = 0;
		this.interestPaid = 0;
		this.start();
	}

	//start calculator
	start() {
		const years = document.querySelector('#loan-years');
		const months = document.querySelector('#loan-months');
		const form = document.querySelector('.form');

		years.addEventListener('input', () => {
			if (years.value === '') months.value = '';
			if (years.value) months.value = years.value * 12;
		});
		months.addEventListener('input', () => {
			if (months.value === '') years.value = '';
			if (months.value) years.value = months.value / 12;
		});
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!this.isValid()) return;

			this.calculate();
			this.displayData();
		});
	}

	//check for edge cases + makes sure form is filled out
	isValid() {
		const values = this.getInputVal();
		if (values.loanAmount < 1000 || values.loanAmount > 100000) return alert('Invalid loan amount');
		if (values.loanYears <= 0 || values.loanYears > 30) return alert('Invalid loan term');
		if (values.loanRate <= 0 || values.loanRate >= 100) return alert('Invalid loan rate');
		return true;
	}

	//get input values
	getInputVal() {
		return {
			loanAmount: Number(document.querySelector('#loan-amount').value),
			loanYears: Number(document.querySelector('#loan-years').value),
			loanMonths: Number(document.querySelector('#loan-months').value),
			loanRate: Number(document.querySelector('#loan-rate').value)
		};
	}

	//get formula
	getFormula() {
		return {
			monthlyPayments: (p, n, i) => {
				return (p * i / (1 - Math.pow(1 + i, -n))).toFixed(2);
			},
			interestPaid: (p, n, mp) => {
				return (mp * n - p).toFixed(2);
			}
		};
	}

	//perform calculations
	calculate() {
		const convert = this.getInputVal();
		const formula = this.getFormula();

		const p = convert.loanAmount;
		const n = convert.loanMonths;
		const i = convert.loanRate / 100 / 12;

		this.principalPaid = p;
		this.monthlyPayments = formula.monthlyPayments(p, n, i);
		this.interestPaid = formula.interestPaid(p, n, this.monthlyPayments);
	}

	//display data
	displayData() {
		const monthlyPayment = document.querySelector('#dollars');
		const totalPrincipal = document.querySelector('#dollars-principal');
		const totalInterest = document.querySelector('#dollars-interest');

		monthlyPayment.innerText = this.monthlyPayments;
		totalPrincipal.innerText = this.principalPaid;
		totalInterest.innerText = this.interestPaid;
	}
}

new Calculator();
