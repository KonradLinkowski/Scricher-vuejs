import axios from 'axios'
import router from '../router'

const tokenKey = 'JWTtoken'
const serverAdress = "http://localhost:3000/api/auth/"

export function test() {
  axios.get('http://localhost:3000')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
}

export function requireAuth(to, from, next) {
  console.log(!isLoggedIn())
  next();
  if (!isLoggedIn()) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
}

export function isLoggedIn() {
  return loadToken() != null
}

function saveToken(token) {
  localStorage.setItem(tokenKey, token)
}

function deleteToken() {
  localStorage.removeItem(tokenKey)
}

function loadToken() {
  console.log("token " + localStorage.getItem(tokenKey))
  return localStorage.getItem(tokenKey)
}

export function logout() {
  router.push('/login')
  deleteToken();
}

export function login(userEmail, userPassword) {
  router.push('/')
  axios.post(serverAdress + 'signin', {
    email: userEmail,
    password: userPassword
  })
  .then(response => {
    console.log(response.data)
    saveToken(response.data.token)
  })
  .catch(error => {
    console.log(error)
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
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
}

