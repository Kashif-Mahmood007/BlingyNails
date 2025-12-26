let userName = document.getElementById("fullname");
let userPhone = document.getElementById("Phone");
let useremail = document.getElementById("email");
let usercountry = document.getElementById("country");
let usercity = document.getElementById("city");
let useraddress = document.getElementById("address");
let userwords = document.getElementById("word_of_mouth");
let usermsg = document.getElementById("message");
let submit = document.getElementById("submitBtn");




// console.log(userName, email, userpassword, address, city, submit);

userName.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = userName.value;
    let regex = /[^0-9][a-zA-Z]{3,15}/;

    // console.log(regex.test(str));
    if(regex.test(str)){
        userName.classList.remove("is-invalid");
        userName.classList.add("is-valid");
    }
    
    else{
        userName.classList.remove("is-valid");
        userName.classList.add("is-invalid");
    }

});

userPhone.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = userPhone.value;
    let regex = /^\+\d{2}-\d{7,14}$/;

    // console.log(regex.test(str));
    if(regex.test(str)){
        userPhone.classList.remove("is-invalid");
        userPhone.classList.add("is-valid");
    }
    
    else{
        userPhone.classList.remove("is-valid");
        userPhone.classList.add("is-invalid");
    }

});


useremail.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = email.value;
    let regex = /[a-zA-Z0-9]{4,16}@[a-zA-Z.]{3,10}/;

    // console.log(regex.test(str));
    if(regex.test(str)){
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
    
    else{
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
    }

});


usercity.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = usercity.value;
    let regex = /^\w[a-zA-Z]{3,40}/;

    console.log(regex.test(str));
    if(regex.test(str)){
        usercity.classList.remove("is-invalid");
        usercity.classList.add("is-valid");
    }
    
    else{
        usercity.classList.remove("is-valid");
        usercity.classList.add("is-invalid");
    }

});


usercountry.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = usercountry.value;
    let regex = /^\w[a-zA-Z]{3,40}/;

    console.log(regex.test(str));
    if(regex.test(str)){
        usercountry.classList.remove("is-invalid");
        usercountry.classList.add("is-valid");
    }
    
    else{
        usercountry.classList.remove("is-valid");
        usercountry.classList.add("is-invalid");
    }

});


useraddress.addEventListener("blur", () => {
    // console.log("helluu gg");
    let str = useraddress.value;
    let regex = /[a-zA-Z0-9#-_. ]{20,50}/;

    console.log(regex.test(str));
    if(regex.test(str)){
        useraddress.classList.remove("is-invalid");
        useraddress.classList.add("is-valid");
    }
    
    else{
        useraddress.classList.remove("is-valid");
        useraddress.classList.add("is-invalid");
    }

});


userwords.addEventListener("blur", () => {
    let str = userwords.value;

    if (str.trim() === "") {
        userwords.classList.remove("is-valid");
        userwords.classList.add("is-invalid");
    } else {
        userwords.classList.remove("is-invalid");
        userwords.classList.add("is-valid");
    }
});

usermsg.addEventListener("blur", () => {
    let str = usermsg.value;

    if (str.trim() === "") {
        usermsg.classList.remove("is-valid");
        usermsg.classList.add("is-invalid");
    } else {
        usermsg.classList.remove("is-invalid");
        usermsg.classList.add("is-valid");
    }
});




// Submit button validation
submit.addEventListener("click", (e) => {
    let isValid = true;

    // Check if all fields are valid
    if (
        userName.classList.contains("is-invalid") ||
        userPhone.classList.contains("is-invalid") ||
        email.classList.contains("is-invalid") ||
        usercountry.classList.contains("is-invalid") ||
        usercity.classList.contains("is-invalid") ||
        useraddress.classList.contains("is-invalid") ||
        userwords.classList.contains("is-invalid") ||
        usermsg.classList.contains("is-invalid")
    ) {
        isValid = false;
    }

    // Check if any field is empty
    if (
        userName.value === "" ||
        userPhone.value === "" ||
        email.value === "" ||
        usercountry.value === "" ||
        usercity.value === "" ||
        useraddress.value === "" ||
        userwords.value === "" ||
        usermsg.value === ""
    ) {
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission if validation fails
        document.getElementById("isEmpty").innerHTML = "Please fill all fields correctly.";
        document.getElementById("isEmpty").classList.add("text-danger");
        document.getElementById("isEmpty").classList.remove("text-success");
    } else {
        // Allow form submission
        document.getElementById("isEmpty").innerHTML = "";
        document.getElementById("isEmpty").classList.remove("text-danger");
    }
});

