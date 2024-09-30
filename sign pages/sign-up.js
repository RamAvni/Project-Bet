
let userName = document.getElementById("user-name");
let password = document.getElementById("password");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

function store() {
    let user = {
        name: userName.value,
        password: password.value,
        email: email.value,
        phone: phone.value
    }
    let userArray = JSON.parse(localStorage.getItem("userArray")) || []
    userArray.push(user);
    userArray = JSON.stringify(userArray);
    localStorage.setItem("userArray", userArray);
}

let form = document.querySelector("form");
form.addEventListener("submit", store);