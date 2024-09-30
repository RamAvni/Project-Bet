let userArray = [];

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
    userArray.push(user);
    userArray = JSON.stringify(userArray);
    console.log(JSON.stringify(userArray))
    localStorage.setItem("userArray", userArray);
    console.log("whooo");
}

function isRegistered() {
    // let storedName = localStorage.getItem("user-name");
    // let storedPassword = localStorage.getItem("password");
    // let storedEmail = localStorage.getItem("email");
    // let storedPhone = localStorage.getItem("phone");

    let enteredName = document.getElementById("user-name").value;
    let enteredPassword = document.getElementById("password").value;
    let enteredEmail = document.getElementById("email").value;
    let entetredPhone = document.getElementById("phone").value;

    let storedArray = JSON.parse(localStorage.getItem(userArray));
    let check = false;
    for (let i=0; i<storedArray.length; i++){
        if (enteredName === storedArray[i].name && enteredPassword === storedArray[i].password){
            check = true;
        }
    }
    if (check){
        alert("you're logged in")
    }
    else{
        alert("Error")
    }
}

let form = document.querySelector("form");
form.addEventListener("submit", store);
form.addEventListener("log-in", isRegistered);