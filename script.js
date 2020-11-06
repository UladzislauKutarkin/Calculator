window.onload=function () {
   let numbers = document.querySelectorAll(".number"),
       operationsBtn = document.querySelectorAll(".operator"),
       clearBtns = document.querySelectorAll(".clear-btn"),
       decimalBtn = document.getElementById("decimal"),
       result = document.getElementById("result"),
       display = document.getElementById("display"),
       memoryCurrentNumber = 0,
       memoryNewNumber = false,
       memoryPendingOperation = "";

    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
        number.addEventListener('click', function (e) {
            numberPress(e.target.textContent);
        })

    }

    for (let i = 0; i < operationsBtn.length; i++) {
        let operation = operationsBtn[i];
        operation.addEventListener('click', function (e) {
            operations(e.target.textContent);
        })

        }

    for (let i=0; i < clearBtns.length; i++) {
        let clearBtn= clearBtns[i];
        clearBtn.addEventListener ('click', function (e) {
            clear(e.target.textContent);
        });
    };

    decimalBtn.addEventListener("click", decimal);


    function numberPress(number) {
        if(memoryNewNumber) {
            display.value = number;
            memoryNewNumber = false;
        } else {
            if(display.value === "0") {
                display.value = number;
            } else {
                display.value += number;
            };
        };
    };

    function operations(op) {
        let localOperationMemory = display.value;

        if(memoryNewNumber && memoryPendingOperation !== "=") {
            display.value = memoryCurrentNumber;
        } else {
            memoryNewNumber = true;
            if (memoryPendingOperation === "+") {
                memoryCurrentNumber += +localOperationMemory;
            } else if (memoryPendingOperation === "-") {
                memoryCurrentNumber -= +localOperationMemory;
            } else if (memoryPendingOperation === "*") {
                memoryCurrentNumber *= +localOperationMemory;
            } else if (memoryPendingOperation === "/") {
                memoryCurrentNumber /= +localOperationMemory;
            } else {
                memoryCurrentNumber = +localOperationMemory;
            }
            display.value = memoryCurrentNumber;
            memoryPendingOperation = op;
        };

    }
    function decimal() {
        let localDecimalMemory = display.value;
        if (memoryNewNumber) {
            localDecimalMemory = '0.';
            memoryNewNumber= false;
        } else {
            if (localDecimalMemory.indexOf('.') === -1) {
                localDecimalMemory += '.';
            };
        };
        display.value = localDecimalMemory;
    };


    function clear(id) {
        if (id==='ce') {
            display.value= '0'
            memoryNewNumber= true;
        } else if (id==='c'){
            display.value= '0';
            memoryNewNumber= true;
            memoryCurrentNumber= '0';
            memoryPendingOperation='0';
        };
    };
}