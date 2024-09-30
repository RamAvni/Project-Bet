function isRegistered() {
    let enteredName = document.getElementById("user-name").value;
    let enteredPassword = document.getElementById("password").value;
    
    let storedArray = JSON.parse(localStorage.getItem("userArray"));
    console.log(storedArray);
    let check = false;
    for (let i = 0; i < storedArray.length; i++) {
        if (enteredName === storedArray[i].name && enteredPassword === storedArray[i].password) {
            check = true;
        }
        console.log(check);
    }
    if (check) {
        window.location.href = "../choose-game/choose-game.html"; 
    }
    else {
        alert("Error");
    }
    console.log(check);
}

let form = document.querySelector("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    isRegistered();
});

