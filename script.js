// Prevent animations from repeating
window.addEventListener('load', stopAnimations);

const inputs = document.querySelectorAll('input[required]');
const form = document.querySelector("#sign-up-form");

// Check validity of each input on form submit
form.addEventListener("submit", (submit) => {
    let inputsAreValid = true;

    // Set inputsAreValid to false if any are invalid
    inputs.forEach((input) => {
        if (!checkInputValidity(input)) {
            inputsAreValid = false;
        }
    });

    // If one or more inputs are invalid, or passwords do not match
    if (!inputsAreValid || !matchPasswords()) {
        // Prevent form from submitting
        submit.preventDefault();
        
        // Create array of invalid inputs
        const invalidInputs = Array.from(document.querySelectorAll(".invalid"));

        // Focus on confirm password input if passwords do not match & password is validated
        if (invalidInputs.every((e) => {
                return ["password", "confirm-password"].includes(e.id);
            }) && document.getElementById("password").validity.valid
        ) {
            document.getElementById("confirm-password").focus();
        } else {
            // Otherwise, focus on the first invalid input
            invalidInputs[0].focus();
        }
    }
});

// Check for input events on each input
// Activate input listener only once
inputs.forEach((input) => {
    input.addEventListener("input", handleBlur, { once: true });
});

// Reactivate input listener on the active input element on blur event
// Validate input on blur event
// Activate blur listener once to avoid duplicates
function handleBlur(event) {
    const activeInput = event.target;

    function handleBlurEvent() {
        activeInput.addEventListener("input", handleBlur, { once: true });
        checkInputValidity(activeInput);
    }

    activeInput.addEventListener("blur", handleBlurEvent, { once: true });
}

function checkInputValidity(activeInput) {
    // Check if input is valid
    if (activeInput.validity.valid) {
        // Remove error message from below input
        showValidationMessage(activeInput, false);
        return true;
    } else {
        // Display error message below input
        showValidationMessage(activeInput, true);
        return false;
    }
}

// Check if password and confirm password values match
function matchPasswords() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password"); 

    // Select the span element below input
    let validationMessageElement = document.querySelector(`#password ~ .validation-message`)

    if (password.value !== confirmPassword.value) {
        validationMessageElement.textContent = "*Passwords do not match";
        // Add invalid class to both inputs to override valid styles
        password.classList.add("invalid");
        confirmPassword.classList.add("invalid");
        return false;
    } else {
        return true;
    }
}

function showValidationMessage(input, show=true) {
    // Validation messages to show beneath each input
    const validationMessages = {
        "first-name": "*Please enter your first name",
        "last-name": "*Please enter your last name",
        "email": "*Please provide a valid email address",
        "phone-number": "*Please provide a valid phone number",
        "password": "*Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters",
        "confirm-password": "*Please confirm your password"
    };

    // Do not show confirm password message if password is invalid
    const password = document.getElementById("password");
    if (input.id === "confirm-password" && checkInputValidity(password) === false) {
        if (input.validity.valid === false) {
            input.classList.add("invalid");
        }
        return;
    }
    
    // Select the span element below each input
    const validationMessageElement = document.querySelector(`#${input.id} ~ .validation-message`)
    if (!show) {
        // Hide the validation message
        validationMessageElement.textContent = "";
        input.classList.remove("invalid");
    } else {
        // Show the validation message
        validationMessageElement.textContent = validationMessages[input.id] || "*Invalid!";
        input.classList.add("invalid");
    }
}

// Remove animation classes from elements
function stopAnimations() {
    const elementsSlideUp = document.querySelectorAll('.slide-up-animation');
    const elementsSlideDown = document.querySelectorAll('.slide-down-animation');

    elementsSlideUp.forEach(function (element) {
        // Add an event listener for the 'animationend' event
        element.addEventListener('animationend', function () {
            // Remove the class only after the animation is finished
            element.classList.remove('slide-up-animation');
        }, { once: true });
    });

    elementsSlideDown.forEach(function (element) {
        // Add an event listener for the 'animationend' event
        element.addEventListener('animationend', function () {
            // Remove the class only after the animation is finished
            element.classList.remove('slide-down-animation');
        }, { once: true });
    });

    // Remove the event listener
    window.removeEventListener('load', stopAnimations);
}