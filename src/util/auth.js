import axios from 'axios'
import Router from 'vue-router'

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

function saveToken(token) {
  localStorage.setItem(tokenKey, token)
}

function deleteToken() {
  localStorage.removeItem(tokenKey)
}

function loadToken() {
  return localStorage.getItem(tokenKey)
}

export function logout() {
  deleteToken();
}

export function login(userEmail, userPassword) {
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

