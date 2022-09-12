let REQUIRED_MESSAGE = "Please enter this field";
let EMAIL_MESSAGE = "Email is invalid";
let PASSWORD_MESSAGE = "Password is easy";
let PASSWORD_LENGTH = 3;

function invalid(invalidElement, invalidResult, message) {
  invalidElement.classList.add("invalid");
  invalidResult.textContent = message;
}

function validate(selector, validateCallback) {
  const element = document.querySelector(selector);
  const parentElement = element.parentNode;
  let errorElement = parentElement.querySelector(".form-message");

  if (!errorElement) {
    errorElement = document.createElement("span");

    errorElement.classList.add("form-message");
    parentElement.appendChild(errorElement);
  }

  element?.addEventListener("blur", function () {
    if (!this.value) {
      invalid(this, errorElement, REQUIRED_MESSAGE);
      return;
    }

    const output = validateCallback(selector);
    const result = output.check(this.value);

    if (result) {
      invalid(this, errorElement, result);
    } else {
      errorElement.textContent = "";
      this.classList.remove("invalid");
    }
  });
}

const replaceValue = (val, rootVal) => (val && rootVal ? rootVal : val);

function Validator(options = {}) {
  const { form, rules, message } = options;
  const formElement = document.querySelector(form);

  if (message) {
    const { requiredMessage, emailMessage, passwordMessage } = message;

    REQUIRED_MESSAGE = replaceValue(REQUIRED_MESSAGE, requiredMessage);
    EMAIL_MESSAGE = replaceValue(EMAIL_MESSAGE, emailMessage);
    PASSWORD_MESSAGE = replaceValue(PASSWORD_MESSAGE, passwordMessage);
  }

  if (formElement && rules) {
    const { required, email, password, passwordLength } = rules;

    required?.forEach((selector) => validate(selector, ValidatorRequired));
    email?.forEach((selector) => validate(selector, ValidatorEmail));
    password?.forEach((selector) => validate(selector, ValidatorPassword));

    PASSWORD_LENGTH = replaceValue(PASSWORD_LENGTH, passwordLength);
  }
}

function ValidatorRequired(selector) {
  return {
    selector: selector,
    check: (value) => (value ? undefined : REQUIRED_MESSAGE),
  };
}

function ValidatorEmail(selector) {
  return {
    selector: selector,
    check: (value) => {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(value) ? undefined : EMAIL_MESSAGE;
    },
  };
}

function ValidatorPassword(selector, maxLength = PASSWORD_LENGTH) {
  return {
    selector: selector,
    check: (value) =>
      value.length >= maxLength ? undefined : PASSWORD_MESSAGE,
  };
}
