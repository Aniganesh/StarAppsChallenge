const calculateButton = document.querySelector("#calculate");
const textArea = document.querySelector("textarea");
const resultArea = document.querySelector("#result");
const note = document.querySelector("#note");
const codeToggle = document.querySelector("#code-toggle");

const code = `let requiredHops = [];
const fly = (arr) => {
  requiredHops = Array.from({ length: arr.length }).fill(
    Infinity,
    0,
    arr.length
  );
  getLeastHopsToEnd(arr, 0);
  return requiredHops[0];
};

const getLeastHopsToEnd = (arr, index) => {
  if (arr.length - 1 === index) {
    requiredHops[index] = 0;
    return true;
  }

  const availableFuel = arr[index];
  if (!availableFuel) {
    return false;
  }

  let indexToReach = index + availableFuel;
  if (indexToReach >= arr.length - 1) {
    requiredHops[index] = 1;
    return true;
  }
  if (requiredHops[indexToReach] !== Infinity) {
    requiredHops[index] = Math.min(
      requiredHops[index],
      1 + requiredHops[indexToReach]
    );
    return true;
  }

  while (indexToReach > 0) {
    const canReachEnd = getLeastHopsToEnd(arr, indexToReach);
    if (canReachEnd) {
      requiredHops[index] = Math.min(
        requiredHops[index],
        1 + requiredHops[indexToReach]
      );
      return true;
    }
    indexToReach--;
  }
  return false;
};`;
const codeArea = document.querySelector("pre");
codeArea.innerHTML = code;

const getResultText = (processedArray, numFlights) => {
  if (numFlights !== Infinity) {
    return `For the given array ${JSON.stringify(
      processedArray
    )}, you need to take ${numFlights} flight${
      numFlights !== 1 ? "s" : ""
    } starting from airport 1`;
  }
  return `You cannot reach the last airport for the given array ${JSON.stringify(
    processedArray
  )}`;
};

const processInputAndShowResult = () => {
  try {
    let input = textArea.value;

    if (!input.includes(",")) {
      input = input.split(" ").join(",");
    }

    if (!input.startsWith("[")) {
      input = "[" + input;
    }
    if (!input.endsWith("]")) {
      input += "]";
    }

    const processedArray = JSON.parse(input).map((item) => parseInt(item, 10));
    const res = fly(processedArray);
    resultArea.innerText = getResultText(processedArray, res);
    resultArea.classList.remove("bg-red");
    resultArea.classList.add("text-white", "bg-green");
    code.innerHTML = ``;
  } catch (error) {
    console.error(error);
    resultArea.classList.add("text-white", "bg-red");
    resultArea.classList.remove("bg-green");
    resultArea.innerText = "Failed to process input.";
    note.innerText =
      "Please note: Deviating from the format given above may cause data to be misread and give wrong info";
  }
};

let requiredHops = [];
const fly = (arr) => {
  requiredHops = Array.from({ length: arr.length }).fill(
    Infinity,
    0,
    arr.length
  );
  getLeastHopsToEnd(arr, 0);
  return requiredHops[0];
};

const getLeastHopsToEnd = (arr, index) => {
  if (arr.length - 1 === index) {
    requiredHops[index] = 0;
    return true;
  }

  const availableFuel = arr[index];
  if (!availableFuel) {
    return false;
  }

  let indexToReach = index + availableFuel;
  if (indexToReach >= arr.length - 1) {
    requiredHops[index] = 1;
    return true;
  }
  if (requiredHops[indexToReach] !== Infinity) {
    requiredHops[index] = Math.min(
      requiredHops[index],
      1 + requiredHops[indexToReach]
    );
    return true;
  }

  while (indexToReach > 0) {
    const canReachEnd = getLeastHopsToEnd(arr, indexToReach);
    if (canReachEnd) {
      requiredHops[index] = Math.min(
        requiredHops[index],
        1 + requiredHops[indexToReach]
      );
      return true;
    }
    indexToReach--;
  }
  return false;
};

const toggleCode = () => {
  codeArea.classList.contains("hidden")
    ? codeArea.classList.remove("hidden")
    : codeArea.classList.add("hidden");
};

calculateButton.addEventListener("click", processInputAndShowResult);
codeToggle.addEventListener("click", toggleCode);
