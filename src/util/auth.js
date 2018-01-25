import axios from 'axios'
import router from '../router'
import decode from 'jwt-decode'

const tokenKey = 'JWTtoken'
const serverAdress = "http://localhost:3000/api/auth/"

export function requireAuth(to, from, next) {
  next();
  if (!isLoggedIn()) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
}

export function getUser() {
  let user = decode(loadToken())
  return {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    _id: user._id,
    role: user.role,
  }
}

export function isLoggedIn() {
  let token = loadToken();
  try {
    token = decode(token)
  } catch (err) {
    console.error(err);window.alert(err.data);
    return false;
  }
  return true
}

function saveToken(token) {
  localStorage.setItem(tokenKey, token)
}

function deleteToken() {
  localStorage.removeItem(tokenKey)
}

function loadToken() {
  return localStorage.getItem(tokenKey)
}

export function getToken() {
  return loadToken()
}

export function logout() {
  router.push('/login')
  deleteToken();
}

export function login(userEmail, userPassword) {
  axios.post(serverAdress + 'signin', {
    email: userEmail,
    password: userPassword
  })
  .then(response => {
    saveToken(response.data.token)
    router.push('/')
  })
  .catch(error => {
    console.error(error);window.alert(error.data);
  })
}

export function register(userEmail, userPassword, fname, lname) {
  axios.post(serverAdress + 'signup', {
    email: userEmail,
    password: userPassword,
    first_name: fname,
    last_name: lname
  })
  .then(response => {
    login(userEmail, userPassword)
  })
  .catch(error => {
    console.error(error);window.alert(error.data);
  })
}

