import axios from 'axios'

export default() => {
  return axios.create({
    method: 'GET',
    mode: 'no-cors',
    withCredentials: false,
    // credentials: 'same-origin',
    crossdomain: true,
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  })
}
