import Axios from './axiosConfig'
import jwt_decode from 'jwt-decode'

export const setAuthToken = token => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete Axios.defaults.headers.common['Authorization']
  }
}

export const checkToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  const userData = jwt_decode(token)
  const currentTime = Date.now() / 1000

  if (userData.exp < currentTime) {
    localStorage.removeItem('token')
    setAuthToken(null)
    return false
  } else {
    setAuthToken(token)
    return userData
  }
}

export const signup = async formBody => {
  try {
    let response = await Axios.post('/api/users/signup', formBody)
    return response
  } catch (err) {
    return err.response
  }
}

export const signin = async formBody => {
  try {
    let response = await Axios.post('/api/users/signin', formBody)
    return response
  } catch (err) {
    return err.response
  }
}
