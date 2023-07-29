const app = document.getElementById("app");
const emailValue = document.getElementById("email-value");
const emailInput = document.getElementById("input");
const form = document.getElementById("form");
const formWrapper = form.parentElement;
const labels = document.getElementById("labels");
const svgImage = document.getElementById("img");
const messageWrapper = document.getElementById("message-wrapper");
const dismissButton = document.getElementById("dismiss");

let width = window.innerWidth;


function isEmail(email) {
  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  return emailRegExp.test(email);
}

function renderSvgBasedPlatform() {
  if (width >= 1440) {
    svgImage.src = "./assets/images/illustration-sign-up-desktop.svg";
    svgImage.style.width = "350px"
  } else {
    svgImage.src = "assets/images/illustration-sign-up-mobile.svg";
    svgImage.style.width = `${width}px`;
  }
}

function navigateToSuccessMessage(email) {
  emailInput.value = "";
  app.classList.add("success");
  formWrapper.classList.add("hidden");
  emailValue.innerHTML = email;
  messageWrapper.classList.remove("hidden");
}

function giveErrorMessage() {
  if (labels.childNodes.length > 3) return;
  const label = document.createElement("label");
  label.classList.add("error-label");
  label.htmlFor = "input";
  label.innerHTML = "Invalid email";
  labels.append(label);
  emailInput.classList.add("error");
  emailInput.value = "";
}

function formSubmitHandler(e) {
  e.preventDefault();
  if (isEmail(emailInput.value)) {
    navigateToSuccessMessage(emailInput.value);
  } else {
    giveErrorMessage();
  }
}

function dismissButtonHandler(e) {
  e.preventDefault();
  messageWrapper.classList.add("hidden");
  app.classList.remove("success");
  formWrapper.classList.remove("hidden");
}

form.addEventListener("submit", formSubmitHandler);
dismissButton.addEventListener("click", dismissButtonHandler);
window.addEventListener("resize", () => {
    width = window.innerWidth;
    renderSvgBasedPlatform()
})


renderSvgBasedPlatform();

emailInput.onfocus = () => {
  const labels = document.getElementById("labels");
  labels.childNodes[3].remove();
  emailInput.classList.remove("error");
};
