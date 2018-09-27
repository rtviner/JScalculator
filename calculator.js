let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let equals = document.getElementById('equal-btn');
let clear = document.getElementById('clear');
let inputValue = [];
let outputReg = /(\d*\.?\d*)([+/*-]?)(\d*\.?\d*)/;
let equationReg = /(\d*\.?\d*)([+/*-]{1})(\d*\.?\d*)/;

numbers.forEach((number) => {
	number.addEventListener('click', output);
});

decimal.addEventListener('click', output);

operators.forEach((operator) => {
	operator.addEventListener('click', output);
});


function output(event) {

	inputValue.push(event.target.innerHTML);

	if (inputValue.indexOf('.') > -1) decimal.removeEventListener('click', output);
	
	if (/[+/*-]/.test(inputValue) === true) decimal.addEventListener('click', output);
	
	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];


	if (num2.indexOf('.') > -1) decimal.removeEventListener('click', output);

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;

	if (equationReg.test(inputString) === true) equals.addEventListener('click', buildEquation);	
}

 function buildEquation() {
			let inputString = inputValue.join("");
			let match = equationReg.exec(inputString);
			let num1 = parseFloat(match[1]);
			let operator = match[2];
			let num2 = parseFloat(match[3]);
	
			operate(operator, num1, num2);
}

function operate(operator, num1, num2) {
	
	switch (operator) {
		case "+":
			outputValue.innerHTML = add(num1, num2);
			break;
		case "-":
			outputValue.innerHTML = subtract(num1, num2);
			break;
		case "*":
			outputValue.innerHTML = multiply(num1, num2);
			break;
		case "/":
			outputValue.innerHTML = divide(num1, num2);
			break;
		case "sqrt":
			outputValue.innerHTML = sqrt(num1);
			break;
	}
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function sqrt(num1) {
	return Math.sqrt(num1);
}




