let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let equals = document.getElementById('equal-btn');
let allClearBtn = document.getElementById('allClear');
let deleteBtn = document.getElementById('delete');
let inputValue = [];
let outputReg = /(\d*\.?\d*)([+/*-]?)(\d*\.?\d*)/;
let equationReg = /(\d*\.?\d*)([+/*-]{1})(\d*\.?\d*)/;

//add keyboard event listener 
window.addEventListener('keydown', event => {
	console.log(event.key);

	if  (/\d|\./.test(event.key) === true) {
		output();
	}
	else if (event.key == "Backspace") {
		backspace();
	}
});

numbers.forEach((number) => {
	number.addEventListener('click', output);
});

decimal.addEventListener('click', output);
 
operators.forEach((operator) => {
	operator.addEventListener('click', output);
});

allClearBtn.addEventListener('click', function() {
	inputValue = [];
	outputValue.innerHTML = "";
	decimal.addEventListener('click', output);
})

deleteBtn.addEventListener('click', backspace); 

function backspace() {
	inputValue.pop();

	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;
	decimal.addEventListener('click', output);
}

function output() {

	if (inputValue.length === 1 && typeof inputValue[0] == "number") {
		if (/[+/*-]/.test(event.target.innerHTML) === true) {
			inputValue.push(event.target.innerHTML);
		}
		else if (/[+/*-]/.test(event.key) === true) {
			inputValue.push(event.key);
		}
	} 
	else if (inputValue.length === 1 && typeof inputValue[0] == "number") {
		if (/[+/*-]/.test(event.target.innerHTML) === false) {
			inputValue.pop();
			inputValue.push(event.target.innerHTML);
		}
		else if (/[+/*-]/.test(event.key) === false) {
			inputValue.push(event.key);
		}
	} 
	else if (event.key !== null) {
		inputValue.push(event.key);
	}
	else {
		inputValue.push(event.target.innerHTML);
	}
	
	if (inputValue.indexOf('.') > -1) decimal.removeEventListener('click', output);
	
	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	if (/[+/*-]/.test(inputValue) === true) decimal.addEventListener('click', output);

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
	equals.removeEventListener('click', buildEquation);
}

function operate(operator, num1, num2) {
	let answer;

	switch (operator) {
		case "+":
			answer = add(num1, num2);
			break;
		case "-":
			answer = subtract(num1, num2);
			break;
		case "*":
			answer = multiply(num1, num2);
			break;
		case "/":
			answer = divide(num1, num2);
			break;
		case "sqrt":
			answer = sqrt(num1);
			break;
	}

	if (answer.toString().length > 20) {
		inputValue = [answer.toExponential()];
	} 
	else {
		inputValue = [answer];
	}

	outputValue.innerHTML = inputValue.toString();	
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




