let stopSorting = false;
let pauseSorting = false;

let comparisons = 0;
let swaps = 0;

let array = [];
let originalArray = [];

function updateComparisons() {
  comparisons++;
  document.getElementById("comparisons").innerText =
    "Comparisons: " + comparisons;
}

function updateSwaps() {
  swaps++;
  document.getElementById("swaps").innerText = "Swaps: " + swaps;
}

function resetCounters() {
  comparisons = 0;
  swaps = 0;
  document.getElementById("comparisons").innerText = "Comparisons: 0";
  document.getElementById("swaps").innerText = "Swaps: 0";
}

function swap(el1, el2) {
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
  updateSwaps();
}

function disableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = true;
  document.querySelector(".insertionSort").disabled = true;
  document.querySelector(".mergeSort").disabled = true;
  document.querySelector(".quickSort").disabled = true;
  document.querySelector(".selectionSort").disabled = true;
}

function enableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = false;
  document.querySelector(".insertionSort").disabled = false;
  document.querySelector(".mergeSort").disabled = false;
  document.querySelector(".quickSort").disabled = false;
  document.querySelector(".selectionSort").disabled = false;
}

function disableSizeSlider() {
  document.querySelector("#arr_sz").disabled = true;
}

function enableSizeSlider() {
  document.querySelector("#arr_sz").disabled = false;
}

function disableNewArrayBtn() {
  document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn() {
  document.querySelector(".newArray").disabled = false;
}

function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      while (pauseSorting) {
        await new Promise((r) => setTimeout(r, 100));
      }
      resolve("");
    }, milisec);
  });
}

let arraySize = document.querySelector("#arr_sz");
let delay = 260;

let delayElement = document.querySelector("#speed_input");

delayElement.addEventListener("input", function () {
  delay = 320 - parseInt(delayElement.value);
});

createNewArray();

arraySize.addEventListener("input", function () {
  createNewArray(parseInt(arraySize.value));
});

function createNewArray(noOfBars = 60) {
  stopSorting = true;

  deleteChild();

  array = [];
  originalArray = [];

  const bars = document.querySelector("#bars");

  for (let i = 0; i < noOfBars; i++) {
    let value = Math.floor(Math.random() * 250) + 10;

    array.push(value);
    originalArray.push(value);

    const bar = document.createElement("div");

    bar.classList.add("bar");

    bar.style.height = value * 2 + "px";

    bars.appendChild(bar);
  }

  resetCounters();
}

function deleteChild() {
  const bar = document.querySelector("#bars");

  while (bar.firstChild) {
    bar.removeChild(bar.firstChild);
  }
}

const newArray = document.querySelector(".newArray");

newArray.addEventListener("click", function () {
  enableSortingBtn();
  enableSizeSlider();

  createNewArray(arraySize.value);
});

function resetArray() {
  stopSorting = true;
  pauseSorting = false;

  deleteChild();

  const bars = document.querySelector("#bars");

  for (let i = 0; i < originalArray.length; i++) {
    const bar = document.createElement("div");

    bar.classList.add("bar");

    bar.style.height = originalArray[i] * 2 + "px";

    bars.appendChild(bar);
  }

  resetCounters();
}

const resetBtn = document.querySelector(".resetArray");

resetBtn.addEventListener("click", function () {
  enableSortingBtn();
  enableSizeSlider();

  resetArray();
});

const pauseBtn = document.querySelector(".pauseBtn");

pauseBtn.addEventListener("click", function () {
  pauseSorting = true;
});

const resumeBtn = document.querySelector(".resumeBtn");

resumeBtn.addEventListener("click", function () {
  pauseSorting = false;
});
