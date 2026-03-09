const loginForm = document.getElementById("loginform");
const signupForm = document.getElementById("signupform");
const loginSpan = document.getElementById("loginspan");
const loginError = document.getElementById("loginerror");
const signupError = document.getElementById("signuperror");
const signupemail = document.getElementById("signupemail");
const signupbtn = document.getElementById("signupbtn");
const loginbtn = document.getElementById("loginbtn");
const loginuser = document.getElementById("loginuser");
const loginpass = document.getElementById("loginpass");
const signupSpan = document.getElementById("signupspan");
const signupname = document.getElementById("signupname");
const signupuser = document.getElementById("signupuser");
const signupphone = document.getElementById("signupphone");
const signuppass = document.getElementById("signuppass");
const signupconfirm = document.getElementById("signupconfirm");

//swap between login and sign up
loginSpan.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

signupSpan.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

//eror message for not filled filed
loginbtn.addEventListener("click", () => {

  const username = loginuser.value.trim();
  const password = loginpass.value.trim();

  if (username === "" || password === "") {
    loginError.textContent = "Please fill all fields!";
    loginError.style.display = "block";

    setTimeout(() => {
      loginError.style.display = "none";
    }, 2000);

    return;
  }

  // get users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user exists
  const foundUser = users.find(user =>
    user.username === username && user.password === password
  );

  if (foundUser) {
    loginError.textContent = "Login successful!";
    loginError.style.display = "block";

    // clear inputs
    loginuser.value = "";
    loginpass.value = "";

  } else {
    loginError.textContent = "Invalid username or password";
    loginError.style.display = "block";
 
     loginuser.value = "";
    loginpass.value = "";
   
  }

  setTimeout(() => {
    loginError.style.display = "none";
  }, 2000);

});


// sign up button email @ check

signupbtn.addEventListener("click", (e) => {

  e.preventDefault(); //prevent reload
    const name = signupname.value.trim();
  const user = signupuser.value.trim();
  const email = signupemail.value.trim();
  const phone = signupphone.value.trim();
  const pass = signuppass.value.trim();
  const confirmpass = signupconfirm.value.trim();

  // Validation
  if(name === "" || user === "" || email === "" || phone === "" || pass === "" || confirmpass === ""){
    showError("Please fill all fields");
  }
  else if(!email.includes("@")){
    showError("Please enter a valid email");
  }
  else if(isNaN(phone)){
    showError("Phone must be a number");
  }
  else if(pass !== confirmpass){
    showError("Passwords do not match");
  }else {
    // Store in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]"); // get existing or empty array

    users.push({
      name,
      username: user,
      email,
      phone,
      password: pass
    });

    localStorage.setItem("users", JSON.stringify(users));

      signupname.value = "";
      signupuser.value = "";
      signupemail.value = "";
      signupphone.value = "";
      signuppass.value = "";
      signupconfirm.value = "";

      signupError.textContent = "Signup successful!";
      signupError.style.display = "block";

      setTimeout(() => {
        signupError.style.display = "none";
      }, 2000);
  }
});

// Show error helper
function showError(text){
  signupError.textContent = text;
  signupError.style.display = "block";

  setTimeout(() => {
     signupError.style.display = "none";
  }, 2000);
}


 

