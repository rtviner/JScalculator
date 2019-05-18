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

	const defaultInput = [];

	window.addEventListener('keydown', keyFilter) 

	function keyFilter(event) {
		if (/\d/.test(event.key)) {
			numberFilter(event.key);
		}
		else if (event.key === ".") {
			decimalFilter(event.key);
		}
		else if (/[√+/*-]/.test(event.key)) {
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
		newInputValue = defaultInput;
		output(newInputValue);
	});

	deleteBtn.addEventListener('click', backspace); 

	const lastNum = (string) => {
		let outputArray = string.split(" ");
		return outputArray[outputArray.length -1];
	}

	const noDecimalLastNum = (string) => string.indexOf(".") === -1;

	const noOperatorLastNum = (string) => string !== "";

	const noAnswerBtnLastNum = (string) => string !== answerBtn.value;

	function numberFilter(event) {
		if(outputValue.innerHTML === answerBtn.value || noAnswerBtnLastNum(lastNum(outputValue.innerHTML))) {
			addNumber(event);
		}
	}

	function decimalFilter(event) {
		if  (noDecimalLastNum(lastNum(outputValue.innerHTML)) || outputValue.innerHTML === answerBtn.value) {
				addValue(event);
		}
	}

	function operatorFilter(event) {
		if (noOperatorLastNum(lastNum(outputValue.innerHTML))) {
			addOperator(event);
		}

	}

	function sqRtFilter(event) {
		//check if there is an operator in output HTML, if so call calculateSqRt(equalsFilter(outputValue.innerHTML))
		if (lastNum(outputValue.innerHTML) !== outputValue.innerHTML) {
			console.log("its going through if:", inputValue);
			// this isnt working because equals calls calculate which already calls an
			calculateSqRt(equalsFilter(outputValue.innerHTML));
		}
		calculateSqRt(outputValue.innerHTML);
	}

	function answerFilter(event) {
		if (lastNum(outputValue.innerHTML).length === 0) {
			addValue(event)
		}
	}

	function equalsFilter(event) {
		console.log("equals Filter has been called with:", event)
		// if there is an operator with 0 or 1 decimals and 1 or more digits call the calculate formula
		if (/[+/*-]{1}\s\d*\.?\d+/g.test(outputValue.innerHTML)) {
			let inputString = outputValue.innerHTML;
			calculate(inputString);
		}
	}

	function backspace(event) {
		//will this work with operators?
		const backspaceInput = [...outputValue.innerHTML].slice(0, [...outputValue.innerHTML].length - 1);
		output(backspaceInput);
	};

	function addNumber(number) {
		let inputValue = (outputValue.innerHTML === answerBtn.value) ? [number] : [...outputValue.innerHTML, number]
		output(inputValue);		
	}

	function addValue(value) {
		inputValue.push(value);
		output(inputValue);	
	}

	function addOperator(operator) {
		let operatorString = " " + operator + " ";
		inputValue.push(operatorString);
		output(inputValue);
	}

	function output(inputValue) {
		outputValue.innerHTML = inputValue.join("");
	}

	function add(num1, num2) {
		return num1 + num2;
	}

	function subtract(num1, num2) {
		return num1 - num2;
	}

	function multiply(num1, num2) {
		product = num1 * num2;
		return parseFloat(product.toFixed(decimalPlaces(num1)+decimalPlaces(num2)));
	}

	function decimalPlaces(num) {
	    var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	    return Math.max(
	        0,
	        (match[1] ? match[1].length : 0)
	        - (match[2] ? +match[2] : 0));
	}

	function divide(num1, num2) {
		return num1 / num2;
	}

	function sqrt(num1) {
		return Math.sqrt(num1);
	}

	function calculateSqRt(number) {
		console.log("calculateSqRt has been called with:", number);
	    	answer(sqrt(number));
	}

	function calculate(inputString) {
		console.log("calculate has been called:", inputString);
		// if there are no operators (with spaces after them) left then return the answer
		if (/[+\/*-]{1}\s/.test(inputString) === false) {
	  		answer(inputString);
	  	}
	  //otherwise keep solving equations
	  	else {
	  		let regMD = /[\/\*]+/g; 
	  		let regAS = /[+-]+/g; 
	  		let outputRegMD = /(\-*\d*\.?\d+)\s{1}([*/]+)\s{1}(\-*\d*\.?\d+)/;
	  		let outputRegAS = /(\-*\d*\.?\d+)\s{1}([+-]+)\s{1}(\-*\d*\.?\d+)/;
	    //if there is a multiplication or division equation do those first
			if (/[\/\*]+/.test(inputString) === true) {
	        //assign the left and right sides of the equation and operator to variables;
	    		let match = outputRegMD.exec(inputString);
	      		let num1 = parseFloat(match[1]);
	      		let operator = match[2];
	      		let num2 = parseFloat(match[3]);
	      
	      		if (operator === "/") {
	        // replace entire equation match with divide(num1, num2)
	        		inputString = inputString.replace(outputRegMD, divide(num1, num2));
	        		calculate(inputString);
	      		}
	      		else {
	      //replace entire equation match with multiply(num1, num2)
	        		inputString = inputString.replace(outputRegMD, multiply(num1, num2));
	        		calculate(inputString);
	      		}
	    	}
	    //if there is a multiplication or division equation do that next
	    	else if (/[+-]+/.test(inputString) === true) {
	        //assign the left and right sides of the equation and operator to variables;
	      		let match = outputRegAS.exec(inputString);
	      		let num1 = parseFloat(match[1]);
	      		let operator = match[2];
	      		let num2 = parseFloat(match[3]);
	  
	      		if (operator === "+") {
	        //replace entire equation match with add(num1, num2)
	        		inputString = inputString.replace(outputRegAS, add(num1, num2));
	        		calculate(inputString);
	      		}
	      		else {
	         //replace entire equation match with subtract(num1, num2)
	        		inputString = inputString.replace(outputRegAS, subtract(num1, num2));
	        		calculate(inputString);
	      		}
	    	}
	  	} 
	}

	const eNotation = (string) => Number.parseFloat(string).toExponential(5);

	function answer(inputString) {
		console.log(inputString);
	    const answer = (inputString.length > 20) ? eNotation(inputString) : inputString;

	    inputValue = [answer];
	    answerBtn.value = answer;   
	    output(inputValue);
	}
}());



