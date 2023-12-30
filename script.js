/***
 * пишем данную конструкцию, чтобы скрипт начал работать 
 * только после полной загрузки контента
 * 
 * После этого мы получили нужный инпут со страницы
 * и активные кнопки. 
 * Затем для удобства мы получили списки кнопок с числами 
 * и остальные не числовые активные кнопки.
 * 
 * После этого назначили для всех чисел обработчик события,
 * который будет записывать в инпут значение нажатой кнопки.
 * 
 * Затем приступили к оживлению остальных кнопок.
 * 
 * Для каждой активной кнопки, не относящейся к числу,
 * назначили обработчик события. 
 * Определили две общие переменные: первое число для операции и тип операции.
 * 
 * Часть операций делает одинаковые действия, поэтому вынесли их в общее место,
 * остальные попадают в соответствующий блок if.
 * 
 * Имеется также вывод результата, который делается на кнопку "равно".
 * Обработка состоит из switch и кейсов, которые мы проверяем по переменной типа операции.
 * 
 * Заключение:
 * На данном этапе мы написали рабочий код, который выполняет свою функцию на отлично. 
 * Но такой код имеет "плохой запах". Он явно требует рефакторинга. 
 *
 * Поставьте видео на паузу и попробуйте понять, что в этом коде нужно изменить, 
 * а потом сравните свои предположения с моими. 
 * 
 * Пауза...
 * 
 *  1. Весь код написан в одной большой функции и явно требует разбиения на маленькие блоки, 
 *     для облегчения чтения и быстрого понимания, что происходит.
 *  2. В некоторых блоках if присутствует повторяющийся код - его нужно вынести в отдельную функцию.
 *  3. Блоку switch в обработчике для знака "равно" явно требуется переезд в отдельную функцию
 *     с возможностью как-то сократить повторяющийся код. 
 * 
 * А ещё необходимо реализовать функционал для кнопок m* 
 * и ограничить колличество вводимых символов.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log('Document loaded. Happy calculate!');
    const input = document.querySelector('input');
    const activeButtons = Array.of(...document.querySelectorAll('button'))
        .filter(button => !button.disabled);
    const numbers = activeButtons.filter(item => !Number.isNaN(Number(item.innerText)));
    const notNumberButtons = activeButtons.filter(item => !numbers.includes(item));

    let firstValue = 0;
    let operation = '';

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
                input.value = '';
                firstValue = 0;
                operation = '';
            }

            if (buttonValue === '+') {
                firstValue += inputValue;
                input.value = '';
                operation = '+';
            }

            if (buttonValue === '-') {
                if (!firstValue) {
                    firstValue = inputValue;
                    input.value = '';
                    operation = '-';
                    return;
                }
                firstValue -= inputValue;
                input.value = '';
                operation = '-';
            }

            if (buttonValue === '%') {
                firstValue = inputValue;
                input.value = '';
                operation = '%';
            }

            if (buttonValue === '÷') {
                if (!firstValue) {
                    firstValue = inputValue;
                    input.value = '';
                    operation = '/';
                    return;
                }

                if (firstValue && inputValue === 0) {
                    input.value = 'Ошибка'
                    operation = '';
                    return;
                }

                firstValue /= inputValue;
                input.value = '';
                operation = '/';
            }

            if (buttonValue === 'x') {
                if (!firstValue) {
                    firstValue = inputValue;
                    input.value = '';
                    operation = 'x';
                    return;
                }
                firstValue *= inputValue;
                input.value = '';
                operation = 'x';
            }

            if (buttonValue === '√') {
                firstValue = inputValue;
                input.value = Math.sqrt(firstValue);
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
                switch (operation) {
                    case '+':
                        input.value = inputValue + firstValue;
                        break;
                    case '-':
                        input.value = firstValue - inputValue;
                        break;
                    case 'x':
                        input.value = firstValue * inputValue;
                        break;
                    case '%':
                        input.value = (inputValue / 100) * firstValue;
                        break;
                    case '/':
                        if (inputValue === 0) {
                            input.value = 'Ошибка'
                            break;
                        }
                        input.value = firstValue / inputValue;
                        break;
                }
                operation = '';
                firstValue = 0;
            }
        })
    });































































});