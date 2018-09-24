let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
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

function operate(operator, num1, num2) {
	switch (operator) {
		case "+":
			return add(num1, num2);
			break;
		case "-":
			return subtract(num1, num2);
			break;
		case "*":
			return multiply(num1, num2);
			break;
		case "/":
			return divide(num1, num2);
			break;
		case "sqrt":
			return sqrt(num1);
			break;
	}
}

numbers.forEach((number) => {
	number.addEventListener('click', output);
});

function output(event) {
	inputValue.push(event.target.innerHTML);
	outputValue.innerHTML = inputValue.join("");
	console.log(inputValue);
	return outputValue;
}













