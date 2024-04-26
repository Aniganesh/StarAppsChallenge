const colorSelection = document.querySelector("#color-selection");
const imageInput = document.querySelector("input#logo");
const insertLogo = document.querySelector("#insert-logo");

const colorMap = {
  blue: "#00a0df",
  pink: "#ff77ff",
  yellow: "#cfdc36",
};

const imagesSelector = ".umbrella-image";

const handleColorSelect = (e) => {
  if (e.target.tagName === "BUTTON") {
    const colorName = e.target.dataset.bg;
    const imageToDisplaySelector = `${imagesSelector}#${colorName}`;

    document.querySelectorAll(imagesSelector).forEach((element) => {
      element.classList.add("hidden");
    });
    const itemToShow = document.querySelector(imageToDisplaySelector);
    itemToShow.classList.remove("hidden");

    e.target.parentNode.childNodes.forEach((element) => {
      if (element.classList) element.classList.remove("selected-item");
    });

    document.body.style = `--global-background: ${colorMap[colorName]}18; --selected-item-shadow: 0 0 0 4px ${colorMap[colorName]}88`;
    e.target.classList.add("selected-item");
  }
};

const handleImageInputChange = async (e) => {
  const files = e.target.files;
  if (FileReader && files && files.length) {
    const fr = new FileReader();
    fr.onload = function () {
      insertLogo.innerHTML = `<img class="h-8" src="${fr.result}" />`;
    };
    fr.readAsDataURL(files[0]);
  }
};

colorSelection.addEventListener("click", handleColorSelect);
imageInput.addEventListener("change", handleImageInputChange);
