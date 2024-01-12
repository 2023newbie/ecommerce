import axios from 'axios'
import url from './url'

const instance = axios.create({
  baseURL: url.root
})

export default instance