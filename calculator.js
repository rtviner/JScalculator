let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let equals = document.getElementById('equal-btn');
let clear = document.getElementById('clear');
let inputValue = [];

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

// function operate(operator, num1, num2) {

// 	num1 = parseFloat(num1);
// 	num2 = parseFloat(num2);

// 	switch (operator) {
// 		case "+":
// 			outputValue.innerHTML = add(num1, num2);
// 			break;
// 		case "-":
// 			outputValue.innerHTML = subtract(num1, num2);
// 			break;
// 		case "*":
// 			outputValue.innerHTML = multiply(num1, num2);
// 			break;
// 		case "/":
// 			outputValue.innerHTML = divide(num1, num2);
// 			break;
// 		case "sqrt":
// 			outputValue.innerHTML = sqrt(num1);
// 			break;
// 	}
// }

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

	let reg = /(\d+\.*\d*)([+/*-]?)(\d*\.*\d*)/;

	let inputString = inputValue.join("");
	let match = reg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;
	
	// equals.addEventListener('click', operate(operator, num1, num2));
 
}

// function addOperator(event) {
//     inputValue.push(" ",event.target.innerHTML," ");
//     	console.log(inputValue);

// 	numbers.forEach((number) => {
// 		number.addEventListener('click', output);
// 	});

// 	decimal.addEventListener('click', output);
// }
    

// function buildEquation(inputValue) {
// 	    let inputValueStr = inputValue.join("");

// 		let reg = /(\d+)([+/*-])(\d+)/;
// 		let match = reg.exec(inputValueStr);

// 		let num1 = match[1];
// 		let operator = match[2];
// 		let num2 = match[3];

// 		outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;
// }
















