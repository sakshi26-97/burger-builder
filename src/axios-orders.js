import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-d334d.firebaseio.com/'
})

export default instance