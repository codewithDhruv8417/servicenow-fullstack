// =============================
// CONFIG
// =============================
const API_BASE = "https://servicenow-backend-88y5.onrender.com";


// =============================
// TOGGLE SIGNUP
// =============================
function toggleSignup() {
  document
    .getElementById("signupBox")
    .classList
    .toggle("hidden");
}


// =============================
// ROLE CHECK
// =============================
function checkRole() {
  let role = document.getElementById("role").value;
  let field = document.getElementById("serviceField");

  if (role === "provider") {
    field.classList.remove("hidden");
  } else {
    field.classList.add("hidden");
  }
}


// =============================
// SIGNUP
// =============================
async function signup() {
  let name = document.getElementById("signupName").value.trim();
  let phone = document.getElementById("signupPhone").value.trim();
  let username = document.getElementById("signupUsername").value.trim();
  let password = document.getElementById("signupPassword").value.trim();
  let role = document.getElementById("role").value;

  if (!name || !phone || !username || !password) {
    alert("Fill all required fields");
    return;
  }

  let user = {
    name,
    phone,
    username,
    password,
    role,
    service: "",
    experience: 0,
    price: 0,
    location: "",
    about: "",
    image: ""
  };

  if (role === "provider") {
    user.service = document.getElementById("serviceType").value;
    user.experience = parseInt(document.getElementById("providerExperience").value) || 0;
    user.price = parseInt(document.getElementById("providerPrice").value) || 0;
    user.location = document.getElementById("providerLocation").value.trim();
    user.image = document.getElementById("providerImage").value.trim();
    user.about = document.getElementById("providerAbout").value.trim();
  }

  try {
    let response = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      let errorText = await response.text();
      throw new Error(errorText || "Signup failed");
    }

    await response.json();

    alert("Signup successful! Please login now.");

    document.getElementById("signupName").value = "";
    document.getElementById("signupPhone").value = "";
    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("providerExperience").value = "";
    document.getElementById("providerPrice").value = "";
    document.getElementById("providerLocation").value = "";
    document.getElementById("providerImage").value = "";
    document.getElementById("providerAbout").value = "";

  } catch (error) {
    console.error(error);
    alert(error.message || "Backend connection failed!");
  }
}


// =============================
// LOGIN
// =============================
async function login() {
  let username = document.getElementById("loginUsername").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let role = document.getElementById("roleSelect").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  let loginData = {
    username,
    password,
    role
  };

  try {
    let response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      let errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }

    let user = await response.json();

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "provider") {
      window.location.href = "provider.html";
    } else {
      window.location.href = "user.html";
    }

  } catch (error) {
    console.error(error);
    alert(error.message || "Login failed");
  }
}


// =============================
// LOGOUT
// =============================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}