import axios from 'axios'
import { getToken } from './auth'

const serverAdress = "http://localhost:3000/api/"

export function post(message) {
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