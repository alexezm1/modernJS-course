// Form Blur Event Listeners

document.querySelector("#name").addEventListener("keydown", validateName);
// document.querySelector("#email").addEventListener("keydown", validateEmail);
// document.querySelector("#zip").addEventListener("keydown", validateZip);
// document.querySelector("#phone").addEventListener("keydown", validatePhone);

function validateName() {
  const name = document.querySelector("#name");
  const re = /^[a-zA-Z]{2,10}$/;

  if (!re.test(name.value)) {
    name.classList.add = "is-invalid";
  } else {
    name.classList.remove = "is-invalid";
  }
}

// function validateEmail() {}

// function validateZip() {}

// function validatePhone() {}
