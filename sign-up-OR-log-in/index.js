document.addEventListener('DOMContentLoaded', onLoad);
let userData = [];

function onLoad() {
  let dataStr = localStorage.getItem('userData');
  userData = dataStr ? JSON.parse(dataStr) : [];
  showLoginForm();
  showSigninForm();
}

function showLoginForm() {
  let showOutput = document.querySelector('.log-in-container');

  if (showOutput) {
    showOutput.innerHTML = `
      <div class="mb-3 row">
          <label for="loginEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
              <input type="text" class="form-control" id="loginEmail">
          </div>
      </div>
      <div class="mb-3 row">
          <label for="loginPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
              <input type="password" class="form-control" id="loginPassword">
          </div>
      </div>
      <button class="btn btn-secondary" onclick="login()">Log in</button>
    `;
  }
}

function addUniqueData(arr, data) {
  for (let item of arr) {
    if (item.email === data.email) {
      // If an item with the same email already exists, return without adding the data
      return false;
    }
  }
  // If no such item is found, add the data to the array
  arr.push(userData);
  return true;
}

function addData() {
  const emailElement = document.getElementById('signinEmail');
  const passwordElement = document.getElementById('signinPassword');

  if (emailElement && passwordElement) {
    const inputEmail = emailElement.value;
    const inputPassword = passwordElement.value;

    if (inputEmail && inputPassword) {
      const newUser = { email: inputEmail, password: inputPassword };
      if (addUniqueData(userData, newUser)) {
        localStorage.setItem('userData', JSON.stringify(userData));
        emailElement.value = '';
        passwordElement.value = '';
      } else {
        alert('Email already exists');
      }
    } else {
      alert('Please enter a value');
    }
  } else {
    console.error('Email or Password element not found');
  }
}

function showSigninForm() {
  let showOutput = document.querySelector('.sign-up-container');

  if (showOutput) {
    showOutput.innerHTML = `
      <div class="mb-3 row">
          <label for="signinEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
              <input type="text" class="form-control" id="signinEmail">
          </div>
      </div>
      <div class="mb-3 row">
          <label for="signinPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
              <input type="password" class="form-control" id="signinPassword">
          </div>
      </div>
      <button class="btn btn-primary" onclick="addData()">Sign in</button>
    `;
  }
}

function login() {
  const emailElement = document.getElementById('loginEmail');
  const passwordElement = document.getElementById('loginPassword');

  if (emailElement && passwordElement) {
    const inputEmail = emailElement.value;
    const inputPassword = passwordElement.value;

    const user = userData.find(user => user.email === inputEmail && user.password === inputPassword);
    if (user) {
      alert('Login successful!');
    } else {
      alert('Invalid email or password');
    }
  } else {
    console.error('Email or Password element not found');
  }
}