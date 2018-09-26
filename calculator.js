let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let equals = document.getElementById('equal-btn');
let clear = document.getElementById('clear');
let inputValue = [];
let outputReg = /(\d+\.*\d*)([+/*-]?)(\d*\.*\d*)/;

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
	Math.sqrt(num1);
}

function operate() {

	console.log(inputValue);
	let inputString = inputValue.join("");
	console.log(inputString);
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	console.log("event:", event);
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);
	console.log("operator:", operator);
	console.log("num1:", num1);
	console.log("num2:", num2);

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

	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;

	// if (test)


	
}


equals.addEventListener('click', operate);
