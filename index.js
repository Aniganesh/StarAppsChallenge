const imagesSelector = ".umbrella-image";

const colorMap = {
  blue: "#00a0df",
  pink: "#ff77ff",
  yellow: "#cfdc36",
};

const colorSelection = document.querySelector("#color-selection");
const imageInput = document.querySelector("input#logo");
const insertLogo = document.querySelector("#insert-logo");
const loader = document.querySelector("#loader");
const images = document.querySelectorAll(imagesSelector);
const buttons = document.querySelectorAll("button");

let currentColor = "blue";

const hideAllImages = () => {
  images.forEach((element) => {
    element.classList.add("hidden");
  });
};

const showLoader = () => {
  hideAllImages();
  loader.classList.remove("hidden");
  loader.classList.remove("text-yellow");
  loader.classList.remove("text-pink");
  loader.classList.remove("text-blue");
  loader.classList.add(`text-${currentColor}`);
};

const showCurrentColorImage = () => {
  const imageToDisplaySelector = `${imagesSelector}#${currentColor}`;
  const itemToShow = document.querySelector(imageToDisplaySelector);
  itemToShow.classList.remove("hidden");
};
const hideLoader = () => {
  document.querySelector("#loader").classList.add("hidden");
};

const handleColorSelect = (e) => {
  if (e.target.tagName === "BUTTON") {
    const colorName = e.target.dataset.bg;
    insertLogo.classList.add("hidden");

    currentColor = colorName;
    showLoader();
    document.body.style = `--global-background: ${colorMap[colorName]}18; --selected-item-shadow: 0 0 0 4px ${colorMap[colorName]}88`;
    e.target.parentNode.childNodes.forEach((element) => {
      if (element.classList) element.classList.remove("selected-item");
    });
    e.target.classList.add("selected-item");
    buttons.forEach((button) => button.setAttribute("disabled", "true"));

    setTimeout(() => {
      buttons.forEach((button) => button.removeAttribute("disabled"));
      insertLogo.classList.remove("hidden");
      hideLoader();
      showCurrentColorImage();
    }, 3000);
  }
};

const handleImageInputChange = async (e) => {
  const files = e.target.files;
  showLoader();
  setTimeout(() => {
    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        hideLoader();
        showCurrentColorImage();
        insertLogo.innerHTML = `<img class="h-8" src="${fr.result}" />`;
      };
      fr.readAsDataURL(files[0]);
    }
  }, 3000);
};

colorSelection.addEventListener("click", handleColorSelect);
imageInput.addEventListener("change", handleImageInputChange);
