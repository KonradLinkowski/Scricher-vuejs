import axios from 'axios'
import { getToken } from './auth'

const serverAdress = "http://localhost:3000/api/"

export function sendPost(message) {
  axios({
    method: 'post',
    url: serverAdress + 'posts',
    data: {
      message: message
    },
    headers: {
      'Authorization': 'JWT ' + getToken()
    }
  })
  .then(({ data }) => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
}

export function getPosts(params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: serverAdress + 'posts',
      headers: {
        'Authorization': 'JWT ' + getToken()
      }
    })
    .then(({ data }) => {
      console.log(data)
      resolve(data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}