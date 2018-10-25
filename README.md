# JS Calculator

Description
-----------
This is a simple calculator created with JavaScript, HTML, and CSS.  

Almost every button click or keyboard press goes through a filter function to prevent things such as multiple decimals in a row e.g .... or multiple operators in a row e.g ***** from outputting onto the screen.

A similar filter prevents the equals button and square root button from doing anything until there are enough numbers and operators present.
I used the RegExp test method for these filters.  The RegExp exec method is used in the buildEquation functions to parse the input values into the paramaters for the actual math functions (2 number variables and an operator variable).

There is a decimal places function to account for the inaccuracy of doing math with floats.  This function uses the RegExp match method to count the number of digits after the decimal point for each number in a multiplication equation, the multiplication answer is then rounded to the sum of the number of digits after the decimal in num1 and the number of digits after the decimal in num2.  Otherwise 0.2 * 0.2 = 0.040000000000012 rather than 0.04.

Finally, there is a pushOrClear function to determine if keys/buttons pushed after an answer should be added to the answer on the output screen (pushed to the inputValue array) or should start a new equation and reset the output screen.  If a number or decimal is clicked then the screen resets and shows only that number or decimal however, if an operator is clicked, then the operator shows up on the screen after the answer number.

How to Use
----------
Navigate to the calculator in the browser here: https://rtviner.github.io/JScalculator/

Use the keyboard or mouse to input numbers, decimals, and operators for simple math problems (multiplication, division, subtraction, and square roots). 

AC:  All clear, click this button to clear everything from the screen

DEL:  Backspace, click this button or press the "delete" key to erase the last number, decimal, or operator on the screen

Ans: Stores the answer to the last operation. Click this button if you would like to perform another operation with the answer from the last problem.

√:  Square root.  Click or type a number then press the square root button to calculate the square root of the preceeding number

Use Notes
---------------
If you press the "enter" key when a button is highlighted, that button will be "clicked". The "Enter" key works as an equals button if no buttons are highlighted.

If the equation or answer is longer than the screen you can scroll to the right to see the overflow.



