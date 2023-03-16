
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");

// Formulaire Elements
const form = document.getElementById("register-form");
const formFinised = document.getElementById('validationForm');
const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const successMessage = document.getElementById('successMsg');
const cgu = document.getElementById("checkbox1");
const locations = document.getElementsByName('location');
const validMessage = document.getElementById("validMessage");
const btnSubmit = document.getElementById("btnSubmit");
const btnValid = document.getElementById("btnValid");
const close = document.getElementsByClassName("close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  form.style.display = "block";
  formFinised.style.display = "none";
}

function resetForm() {
  form.style.display = "block";
  formFinised.style.display = "none";
  validMessage.innerHTML = "";
  closeModal()
}

// Evement submit du formulaire et ouverture formulaure
form.addEventListener('submit', (e) => { 
  validate(e);
})

form.addEventListener('click', editNav)
btnValid.addEventListener('click', closeModal)

// Evement ouverture formulaire
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// Validation des champs du formulaire
const validate = (e) => {

  const emailValue = email.value.trim();
  const firstValue = firstname.value.trim();
  const lastValue = lastname.value.trim();
  const quantityValue = parseInt(quantity.value.trim());
  const birthdateValue = birthdate.value.trim();

  const cguValid = checkCgu(cgu)
  const firstValid = checkFirst(firstValue);
  const lastValid = checkLast(lastValue)
  const emailValid = checkEmail(emailValue)
  const birthdateValid = checkBirthdate(birthdateValue)
  const quantityValid = checkQuantity(quantityValue)
  const locationValid = checkLocation()

  if (cguValid  && firstValid && lastValid  && emailValid
    && birthdateValid && quantityValid && locationValid 
  ) {
    e.preventDefault();
    form.reset()
    finishForm()
  } else {
    e.preventDefault();
  }
}

// fonction checking champs formulaire 
const checkFirst = (firstName) => {
  if (firstName === '' || firstName.length <= 2) {
    return setError(first, 'Prénom est obligatoire et contenir au minimum 2 caractères');
  } else if (firstName != '') {
    if (onlyLetter(firstName)) {
      return setSuccess(first)
    } else {
      return setError(first, 'Seul les caractères a b c ... sont accepter');
    }
  }

}

const checkLast = (lastName) => {
  if (lastName === '' || lastName.length <= 2) {
    return setError(last, 'Nom est obligatoire et doit contenir au minimum 2 caractères');
  } else if (lastName != '') {
    if (onlyLetter(lastName)) {
      return setSuccess(last)
    } else {
      return setError(last, 'Seul les caractères a b c ... sont accepter');
    }
  }
}

const checkEmail = (emailValue) => {
  if (emailValue === '') {
    return setError(email, 'email est obligatoire');

  } else if (emailValue != '') {
    if (isValidEmail(emailValue)) {
      return setSuccess(email)

    } else {
      return setError(email, 'merci de respecter le format email ');
    }
  }
}

const checkQuantity = (quantityValue) => {
  if (quantityValue === '') {
    return setError(quantity, 'Merci de séléctionner le nombre de tournois GameOne');

  } else if (quantityValue != '') {
    if (isNumber(quantityValue)) {
      return setSuccess(quantity)
    } else {
      return setError(quantity, 'seul les nombre sont acceptés');
    }
  }
}
const checkBirthdate = (birthdateValue) => {

  if (birthdateValue != '') {
    return setSuccess(birthdate)
  } else {
    return setError(birthdate, 'Votre date de naissance est obligatoire'), form_OK = false;
  }
}

const checkCgu = (cgu) => {
  if (cgu.checked) {
    return setSuccess(cgu)
  } else {
    return setError(cgu, 'Merci accepter cgu')
  }
}

const checkLocation = () => {

  let arrayRadios = [];
  for (i = 0; i < locations.length; i++) {
    if (locations[i].checked)
      arrayRadios.push(locations[i].value);
  }
  if (arrayRadios.length > 0) {
    return setSuccess(location6)
  } else {
    return setError(location6, 'Merci de choisir une ville du tournoi'), form_OK = false;
  }
}


// Validation Champs Formulaire REGEX
const isValidEmail = (email) => {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  return emailRegex.test(String(email).toLowerCase());
}

const isNumber = (value) => {
  const reg = /^\d+$/
  return reg.test(value)
}
const onlyLetter = (value) => {
  const reg = /^[a-zA-Z]+$/
  return reg.test(value)
}
const isBirthday = (value) => {
  var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;
  return reg.test(value);
}

// Recuperation valeur btn radio
function getValueRadios() {
  for (i = 0; i < locations.length; i++) {
    if (locations[i].checked)
      arrayRadios.push(locations[i].value);
  }
}


// Message succes 
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const errorBorder = inputControl.querySelector('input');
  errorDisplay.innerText = '';
  errorBorder.classList.remove('invalid');
  return true;
};

// Message Error
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const errorInput = inputControl.querySelector('input');
  errorDisplay.innerText = message;
  errorInput.classList.add('invalid');
  return false;
}

// Msg validation 

const finishForm = () => {
  form.style.display = "none";
  formFinised.style.display = "flex";
  validMessage.innerHTML = "Merci pour votre inscription";
}

