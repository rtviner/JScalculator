var calculator = (function () {

	let numbers = document.querySelectorAll('.num-btn');
	let decimal = document.getElementById('decimal')
	let operators = document.querySelectorAll('.op-btn');
	let sqrtBtn = document.getElementById('sqRt');
	let outputValue = document.getElementById('display');
	let equals = document.getElementById('equals');
	let answerBtn = document.getElementById('answer');
	let allClearBtn = document.getElementById('allClear');
	let deleteBtn = document.getElementById('delete');

	window.addEventListener('keydown', (event) => keyFilter(event)); 

	function keyFilter(event) {
		console.log("keypress key:", event.key);

		if (/\d/.test(event.key)) {
			numberFilter(event.key);
		}
		else if (event.key === ".") {
			decimalFilter(event.key);
		}
		else if (/[+/*-]/.test(event.key)) {
			operatorFilter(event.key);
		}
		else if (event.key === "=" || event.key === "Enter") {
			equalsFilter(event);	
		}		
		else if (event.key === "Backspace") {
			backspace();
		}
	}

	numbers.forEach((number) => {
		number.addEventListener('click', (event) => {
			numberFilter(event.target.innerHTML);	
		})
	});

	decimal.addEventListener('click', (event) => decimalFilter((event.target.innerHTML)));

	operators.forEach((operator) => {
		operator.addEventListener('click', (event) => operatorFilter((event.target.innerHTML)));
	}); 

	sqrtBtn.addEventListener('click', (event) => sqRtFilter(event));

	answerBtn.addEventListener('click', (event) => answerFilter(answerBtn.value));

	equals.addEventListener('click', equalsFilter);

	allClearBtn.addEventListener('click', function(event) {
		newInputValue = [];
		output(newInputValue);
	});

	deleteBtn.addEventListener('click', backspace); 

	const lastNum = (string) => {
		let outputArray = string.split(" ");
		console.log("lastNum at lastNum:", [outputArray[outputArray.length -1]]);
		return outputArray[outputArray.length -1];
	}

	const noDecimal= (string) => string.indexOf(".") === -1;

	const noOperator = (string) => string !== "";

	const noAnswerBtn = (string) => string !== answerBtn.value;

	function numberFilter(event) {
		if(outputValue.innerHTML === answerBtn.value || noAnswerBtn(lastNum(outputValue.innerHTML))) {
			addValue(event);
		}
	}

	function decimalFilter(event) {
		if  (outputValue.innerHTML === answerBtn.value ||noDecimal(lastNum(outputValue.innerHTML))) {
				addValue(event);
		}
	}

	function operatorFilter(event) {
		if (noOperator(lastNum(outputValue.innerHTML)) && lastNum(outputValue.innerHTML) !== ".") {
			addOperator(event);
		}

	}

	function sqRtFilter(event) {
		//check if last number != outputValue indicating outputValue is at least 2 numbers and an operator, then call calculate to get answer for sqRt function
		if (lastNum(outputValue.innerHTML) !== outputValue.innerHTML) {
			reduceByOrderOfOperations(outputValue.innerHTML);
		}

		calculateSqRt(outputValue.innerHTML);
	}

	function answerFilter(event) {
		if (lastNum(outputValue.innerHTML).length === 0) {
			addValue(event)
		}
	}

	function equalsFilter(event) {
		//check if last number != outputValue indicating outputValue is at least 2 numbers and an operator, then call calculate to get answer
		if (lastNum(outputValue.innerHTML) !== outputValue.innerHTML) {
			reduceByOrderOfOperations(outputValue.innerHTML);
		}
	}

	function backspace(event) {
		const outputArray = [...outputValue.innerHTML];
		const backspacedInput = (noOperator(lastNum(outputValue.innerHTML))) ? 
			outputArray.slice(0, outputArray.length - 1) :
			outputArray.slice(0, outputArray.length - 3)	
		output(backspacedInput);
	};

	function addValue(number) {
		const inputArray = (outputValue.innerHTML === answerBtn.value) ? [number] : [...outputValue.innerHTML, number]
		output(inputArray);		
	}

	function addOperator(operator) {
		let operatorString = " " + operator + " ";
		const inputArray = [...outputValue.innerHTML, operatorString];
		output(inputArray);
	}

	function output(array) {
		outputValue.innerHTML = array.join("");
	}

	function add(number1, number2) {
		return number1 + number2;
	}

	function subtract(number1, number2) {
		return number1 - number2;
	}

	function multiply(number1, number2) {
		product = number1 * number2;
		return parseFloat(product.toFixed(decimalPlaces(number1)+decimalPlaces(number2)));
	}

	function decimalPlaces(number) {
	    var match = (''+number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	    return Math.max(
	        0,
	        (match[1] ? match[1].length : 0)
	        - (match[2] ? +match[2] : 0));
	}

	function divide(number1, number2) {
		return number1 / number2;
	}

	function sqrt(number) {
		return Math.sqrt(number);
	}

	function calculateSqRt(number) {
	    	answer(sqrt(number));
	}

	function makeMultiplyOrDivideEquation(equationString) {
		const multiplyOrDivideEquation = /(\-*\d*\.?\d+)\s{1}([*/]+)\s{1}(\-*\d*\.?\d+)/;

	  	const match = multiplyOrDivideEquation.exec(equationString);
	    const num1 = parseFloat(match[1]);
	    const operator = match[2];
	    const num2 = parseFloat(match[3]);
	    //replace entire equation match with result of divide(num1, num2) or multiply(num1, num2) and call reduceByOrderOfOperations again
	    const reducedEquationString = (operator === "/") ? 
	    	equationString.replace(multiplyOrDivideEquation, divide(num1, num2)) :
	    	equationString.replace(multiplyOrDivideEquation, multiply(num1, num2));

	    reduceByOrderOfOperations(reducedEquationString);
	}

	function makeAddOrSubtractEquation(equationString) {
		const addOrSubtractEquation = /(\-*\d*\.?\d+)\s{1}([+-]+)\s{1}(\-*\d*\.?\d+)/;

		let match = addOrSubtractEquation.exec(equationString);
	    let num1 = parseFloat(match[1]);
	    let operator = match[2];
	    let num2 = parseFloat(match[3]);
	    //replace entire equation match with result of add(num1, num2) or subtract(num1, num2) and call reduceByOrderOfOperations again
	    const reducedEquationString = (operator === "+") ?
	    	equationString.replace(addOrSubtractEquation, add(num1, num2)) :
	    	equationString.replace(addOrSubtractEquation, subtract(num1, num2));

	    reduceByOrderOfOperations(reducedEquationString);
	}

	function reduceByOrderOfOperations(equationString) {
		// if there are no operators (with spaces after them) left then return the answer
		console.log("reduceByOrderOfOperations has been called with:", equationString)
	
		if (!/[+\/*-]{1}\s/.test(equationString)) {
	  		answer(equationString);
	  	}
	  	//otherwise keep making and solving equations
	  	if (/[*/]\s/.test(equationString)) {
	  		console.log("calling makeMultiplyOrDivideEquation");
	  		makeMultiplyOrDivideEquation(equationString);
	  	}
		else if (/[+-]\s/.test(equationString)) {
			console.log("calling makeAddOrSubtractEquation");
	  		makeAddOrSubtractEquation(equationString);
	  	}
 
	}

	const eNotation = (numberString) => Number.parseFloat(numberString).toExponential(5);

	function answer(numberString) {
	    const answer = (numberString.length > 20) ? eNotation(numberString) : numberString;
	    finalAnswer = [answer];
	    answerBtn.value = finalAnswer;   
	    output(finalAnswer);
	}
}());



