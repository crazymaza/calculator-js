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
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded. Happy calculate!");
    const input = document.querySelector("input");
    const historyBlock = document.querySelector(".history");
  
    const NULL_VALUE = null;
    const EMPTY_VALUE = "";
  
    const activeButton = Array.of(...document.querySelectorAll("button")).filter(
      (button) => !button.disabled
    );
  
    const numbers = activeButton.filter(
      (item) => !Number.isNaN(Number(item.innerText))
    );
  
    const notNumberButtons = activeButton.filter(
      (item) => !numbers.includes(item)
    );
  
    let operationValue = NULL_VALUE;
    let operation = EMPTY_VALUE;
    let historyText = EMPTY_VALUE;
    let prevOperation = EMPTY_VALUE;
  
    const setOperationValue = (inputValue, operationType) => {
      if(prevOperation && prevOperation !== operationType) {
        setOperationValue(inputValue, prevOperation);
        prevOperation = EMPTY_VALUE;
        operation = operationType;
        return;
      }
  
      if (operationType === "+") {
        operationValue += inputValue;
      } else if (operationType === "-") {
        operationValue -= inputValue;
      } else if (operationType === "÷") {
        operationValue /= inputValue;
      } else if (operationType === "x") {
        operationValue *= inputValue;
      } else {
        operationValue = 0;
      }
  
      historyText += `${operationType} ${inputValue} `;
      operation = operationType;
      input.value = EMPTY_VALUE;
    };
  
    const setFirstValue = (operationSign, inputValue) => {
      operationValue = inputValue;
      input.value = EMPTY_VALUE;
      operation = operationSign;
      prevOperation = operationSign;
      historyText += `${inputValue} `;
    };
  
    const setResultValue = (inputValue, operation) => {
      switch (operation) {
        case "+":
          input.value = inputValue + operationValue;
          break;
        case "-":
          input.value = operationValue - inputValue;
          break;
        case "%":
          input.value = (inputValue / 100) * operationValue;
          break;
        case "÷":
          if (inputValue === 0) {
            input.value = "Ошибка";
            break;
          }
          input.value = operationValue / inputValue;
          break;
        case "x":
          input.value = operationValue * inputValue;
          break;
      }
  
      if (operation === "%") {
        historyText += `${operationValue}% from ${inputValue} = ${input.value}`;
      } else {
        historyText += `${operation} ${inputValue} = ${input.value}`;
      }
    };
  
    // new
    const clearValues = () => {
      operation = EMPTY_VALUE;
      operationValue = NULL_VALUE;
      prevOperation = EMPTY_VALUE;
      historyText = EMPTY_VALUE;
      input.value = EMPTY_VALUE;
    };
    // end new
  
    numbers.forEach((item) => {
      item.addEventListener("click", () => {
        if (
          item.innerText === "0" &&
          !/^0./.test(input.value) &&
          input.value.startsWith("0")
        ) {
          input.value = 0;
          return;
        }
        input.value += item.innerText;
      });
    });
  
    notNumberButtons.forEach((item) => {
      const buttonValue = item.textContent;
      item.addEventListener("click", () => {
        const inputValue = Number(input.value);
        const historyP = document.createElement("p");
        const withoutFirstValueOperation = [".", "ac", "√", "+/-"];
  
        if(input.value === EMPTY_VALUE) {
          return;
        }
  
        if(input.value === EMPTY_VALUE && 
          withoutFirstValueOperation.includes(buttonValue)
        ) {
          return;
        }
  
        if(!withoutFirstValueOperation.includes(buttonValue) && operationValue === NULL_VALUE) {
          setFirstValue(buttonValue, inputValue);
          return;
        }
  
        if (buttonValue === ".") {
          if (input.value.includes(".")) {
            return;
          }
          input.value += buttonValue;
        }
  
        if (buttonValue === "ac") {
          clearValues();
        }
  
        if (["+", "-", "x"].includes(buttonValue)) {
          setOperationValue(inputValue, buttonValue);
        }
  
        if (buttonValue === "%") {
          operationValue = inputValue;
          input.value = EMPTY_VALUE;
          operation = "%";
        }
  
        if (buttonValue === "÷") {
          if (operationValue && inputValue === 0) {
            input.value = "Ошибка";
            operation = EMPTY_VALUE;
            return;
          }
  
          setOperationValue(inputValue, buttonValue);
        }
  
        if (buttonValue === "√") {
          operationValue = inputValue;
          input.value = Math.sqrt(Math.abs(operationValue));
          historyP.insertAdjacentText(
            "beforeend",
            `√${inputValue} = ${input.value}`
          );
          historyBlock.insertAdjacentElement("beforeend", historyP);
          operation = buttonValue;
        }
  
        if (buttonValue === "+/-") {
          if (inputValue < 0) {
            input.value = Math.abs(inputValue);
          }
          if (inputValue > 0) {
            input.value = `-${inputValue}`;
          }
        }
  
        if (buttonValue === "=") {
          if (operation) {
            setResultValue(inputValue, operation);
            historyP.insertAdjacentText("beforeend", historyText);
            historyBlock.insertAdjacentElement("beforeend", historyP);
            // new сделал единый метод очистки
            clearValues();
          }
        }
      });
    });
  });
  