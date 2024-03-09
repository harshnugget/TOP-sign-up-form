const inputs = document.querySelectorAll('input[required]');
const form = document.querySelector("#sign-up-form");

const validationMessages = {
    "first-name": "*Please enter your first name",
    "last-name": "*Please enter your last name",
    "email": "*Please provide a valid email address",
    "phone-number": "*Please provide a valid phone number",
    "password": "*Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters",
    "confirm-password": "*Please confirm your password"
};

// Check validity of each input on form submit
form.addEventListener("submit", showValidationMessage);

// Check validity of each input when not in focus
inputs.forEach(e => e.addEventListener("input", (e) => {
    e.target.addEventListener("blur", (e) => {
        const input = e.target;
        if (input.validity.valid) {
            showErrorMessage(input, false);
        } else {
            showErrorMessage(input, true);
        }
    }, { once: true });
}));

function showValidationMessage(e) {
    inputs.forEach(input => {
        if (!(input.validity.valid)) {
            // Display error message below input
            showErrorMessage(input, true);
        } else {
            showErrorMessage(input, false);
        }
    });

    if (form.checkValidity() === false || matchPasswords() === false) {
        // Prevent form from being submitted if validation checks fail
        matchPasswords()
        e.preventDefault();
    }
}

function matchPasswords() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password"); 

    // Select the span element below input
    let errorMsgElement = document.querySelector(`#password ~ span[class="error-message"]`)

    // Regex check password
    if (!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(password.value))) {
        console.log("here");
        showErrorMessage(password, true);
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMsgElement.textContent = "*Passwords do not match";
        // Add invalid class to both inputs to override valid styles
        password.classList.add("invalid");
        confirmPassword.classList.add("invalid");
        return false;
    } else {
        return true;
    }
}

function showErrorMessage(input, show=true) {
    // Do not show confirm password message if password is invalid
    const password = document.getElementById("password");
    if (input.id === "confirm-password" && !(password.value) && !(password.validity.valid)) {
        return;
    }
    let errorMsgElement = document.querySelector(`#${input.id} ~ span[class="error-message"]`)
    if (!show) {
        errorMsgElement.textContent = "";
        input.classList.remove("invalid");
    } else {
        errorMsgElement.textContent = validationMessages[input.id] || "*Invalid!";
        input.classList.add("invalid");
    }
}