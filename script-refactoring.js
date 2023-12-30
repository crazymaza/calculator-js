/***

 */
document.addEventListener("DOMContentLoaded", () => {
    console.log('Document loaded. Happy calculate!');
    const input = document.querySelector('input');
    const activeButtons = Array.of(...document.querySelectorAll('button'))
        .filter(button => !button.disabled);
    const numbers = activeButtons.filter(item => !Number.isNaN(Number(item.innerText)));
    const notNumberButtons = activeButtons.filter(item => !numbers.includes(item));

    let operationValue = 0;
    let operation = '';

    const setOperationValue = (inputValue, operationType) => {
        if (operationType === '+') {
            operationValue += inputValue;
        } else if (operationType === '-') {
            operationValue -= inputValue;
        } else if (operationType === '/') {
            operationValue /= inputValue;
        } else if (operationType === '*') {
            operationValue *= inputValue;
        } else {
            operationValue = 0;
        }

        operation = operationType;
        input.value = '';
    }

    const setResultValue = (inputValue, operation) => {
        switch (operation) {
            case '+':
                input.value = inputValue + operationValue;
                break;
            case '-':
                input.value = operationValue - inputValue;
                break;
            case 'x':
                input.value = operationValue * inputValue;
                break;
            case '%':
                input.value = (inputValue / 100) * operationValue;
                break;
            case '/':
                if (inputValue === 0) {
                    input.value = 'Ошибка'
                    break;
                }
                input.value = operationValue / inputValue;
                break;
        }
    }


    numbers.forEach(item => {
        item.addEventListener('click', () => {
            input.value += item.innerText;
        })
    });

    notNumberButtons.forEach(item => {
        // Получаем значения символов изображённых на кнопках
        const buttonValue = item.textContent;
        item.addEventListener('click', () => {
            // Область видимости, при нажатии на кнопку будет иметь новое значение.
            const inputValue = Number(input.value);

            if (buttonValue === '.') {
                input.value += buttonValue;
            }

            if (buttonValue === 'ac') {
                setOperationValue('', '');
            }

            if (buttonValue === '+') {
                setOperationValue(inputValue, '+');
            }

            if (buttonValue === '-') {
                if (!operationValue) {
                    operationValue = inputValue;
                    input.value = '';
                    operation = '-';
                    return;
                }
                setOperationValue(inputValue, '-');
            }

            if (buttonValue === '%') {
                operationValue = inputValue;
                input.value = '';
                operation = '%';
            }

            if (buttonValue === '÷') {
                if (!operationValue) {
                    operationValue = inputValue;
                    input.value = '';
                    operation = '/';
                    return;
                }

                if (operationValue && inputValue === 0) {
                    input.value = 'Ошибка'
                    operation = '';
                    return;
                }
                setOperationValue(inputValue, '/');
            }

            if (buttonValue === 'x') {
                if (!operationValue) {
                    operationValue = inputValue;
                    input.value = '';
                    operation = 'x';
                    return;
                }
                setOperationValue(inputValue, '*');
            }

            if (buttonValue === '√') {
                operationValue = inputValue;
                input.value = Math.sqrt(operationValue);
            }

            if (buttonValue === '+/-') {
                if (inputValue < 0) {
                    input.value = Math.abs(inputValue);
                }
                if (inputValue > 0) {
                    input.value = `-${inputValue}`;
                }
            }

            if (buttonValue === '=') {
                setResultValue(inputValue, operation);
                operation = '';
                operationValue = 0;
            }
        })
    });































































});