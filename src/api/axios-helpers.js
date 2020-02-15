import Axios from './axiosConfig'
import jwt_decode from 'jwt-decode'

export const setAuthHeader = token => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete Axios.defaults.headers.common['Authorization']
  }
}

export const checkTokenAndReturn = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  const userData = jwt_decode(token)

  const currentTime = Date.now() / 1000

  if (userData.exp < currentTime) {
    localStorage.removeItem('token')
    setAuthHeader(null)
    return null
  } else {
    setAuthHeader(token)
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

export const getUser = async () => {
  try {
    let success = await Axios.get('/api/users/get-user')
    return success.data
  } catch (e) {
    return e.response
  }
}
export const editUser = async user => {
  try {
    let success = await Axios.put('/api/users/edit-user', user)

    return success
  } catch (e) {
    return e.response
  }
}

export const getChannels = async roomName => {
  try {
    let response = await Axios.get(`/api/channels/`)
    return response
  } catch (err) {
    return err.response
  }
}

export const getChannelMessages = async roomName => {
  try {
    let response = await Axios.get(`/api/channels/getMessages/${roomName}`)
    return response
  } catch (err) {
    return err.response
  }
}

export const getChannelUsers = async roomName => {
  try {
    let response = await Axios.get(`/api/channels/getUsers/${roomName}`)
    return response
  } catch (err) {
    return err.response
  }
}
