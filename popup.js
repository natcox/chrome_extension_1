let historyList = document.getElementById("historyList");
let currentInput = '';
let operator = '';
let firstOperand = null;
let history = [];

// Load history on startup
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();

    // Clear history button event listener
    document.getElementById('clearHistoryButton').addEventListener('click', clearHistory);

    // View history button event listener
    document.getElementById('historyButton').addEventListener('click', toggleHistoryVisibility);

    // Event listener for calculator buttons
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button);
        });
    });
});

// Function to toggle history list visibility
function toggleHistoryVisibility() {
    historyList.style.display = historyList.style.display === "none" ? "block" : "none"; // Toggle visibility
}

// Function to handle button clicks
function handleButtonClick(button) {
    const value = button.getAttribute('data-value');
    
    if (value === 'C') {
        clearDisplay();
    } else if (value === '=') {
        if (firstOperand !== null && operator) {
            const result = calculate(firstOperand, currentInput, operator);
            display.value = result;
            addHistory(`${firstOperand} ${operator} ${currentInput} = ${result}`); // Add to history
            firstOperand = null;
            operator = '';
            currentInput = result; // Keep the result for further calculations
        }
    } else if (value === '√') {
        if (currentInput) {
            const result = Math.sqrt(parseFloat(currentInput));
            display.value = result;
            addHistory(`√${currentInput} = ${result}`);
            currentInput = result;
        }
    } else if (value === '∛') {
        if (currentInput) {
            const result = Math.cbrt(parseFloat(currentInput));
            display.value = result;
            addHistory(`∛${currentInput} = ${result}`);
            currentInput = result;
        }
    } else if (value === 'X') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (value === '^') {
        operator = '^';
        firstOperand = currentInput;
        currentInput = '';
        display.value = '';
    } else {
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                firstOperand = currentInput;
            }
            operator = value;
            currentInput = '';
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    }
}

// Clear history function
function clearHistory() {
    chrome.storage.local.set({ history: [] }, () => {
        historyList.innerHTML = ''; // Clear displayed history
        history = []; // Reset local history array
        console.log('History cleared.');
    });
}

// Function to perform the calculation
function calculate(firstOperand, secondOperand, operator) {
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);

    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        case '^':
            return Math.pow(firstOperand, secondOperand);
        default:
            return secondOperand;
    }
}

// Add entry to history
function addHistory(entry) {
    if (!history.includes(entry)) {
        history.push(entry);
        chrome.storage.local.set({ history: history }, () => {
            const div = document.createElement('div');
            div.textContent = entry;
            historyList.appendChild(div);
        });
    }
}

// Load history function
function loadHistory() {
    chrome.storage.local.get(['history'], function(result) {
        if (result.history) {
            history = result.history; // Load history into local array
            historyList.innerHTML = ''; // Clear existing entries before loading new
            history.forEach(entry => {
                const div = document.createElement('div');
                div.textContent = entry;
                historyList.appendChild(div);
            });
        }
    });
}

// Clear display function
function clearDisplay() {
    display.value = ''; // Clear the display
    currentInput = ''; // Reset current input
    firstOperand = null; // Reset first operand
    operator = ''; // Reset current operation
}