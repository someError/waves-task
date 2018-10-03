import axios, { CancelToken } from 'axios'
import qs from 'qs'

const api = {
 init () {
  if (!this.axios) {
   this.axios = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    }
   })
  }
 },

 getUsers (id) {
  return  this.__createRequest(`/users`)
 },

 postUser (data) {
  return this.__createRequest(`/users`, {
   method: 'post',
   data
  })
 },

 putUser (id, data) {
  return this.__createRequest(`/users/${id}`, {
   method: 'put',
   data
  })
 },

 deleteUser (id) {
  return this.__createRequest(`/users/${id}`, {
   method: 'delete'
  })
 },

 __createRequest (url, conf = {}) {
  let source = CancelToken.source()

  let config = Object.assign(
    conf,
    {
     cancelToken: source.token
    }
  )

  const req = this.axios(url, config)

  Object.assign(req, {
   cancel: () => {
    source.cancel(`Request canceled: ${url}`)
   }
  })

  return req
 }
}

export default api