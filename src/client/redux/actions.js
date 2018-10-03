import api from '../api'
import store from './store'

/** GET USERS LIST */
export const USERS_GET = 'USERS_GET'

export const USERS_GET_RECEIVE = 'USERS_GET_RECEIVE'

export const usersReceive = data => ({
 type: USERS_GET_RECEIVE,
 payload: data
})

export const getUsers = (query) => dispatch => {
 dispatch({type: USERS_GET})

 const req = api.getUsers(query)

 req.then(({ data }) => dispatch(usersReceive(data)))

 return req
}

/** POST USER */
export const USER_ADD = 'USER_ADD'

export const USER_ADD_RECEIVE = 'USER_ADD_RECEIVE'

export const userAddReceive = data => ({
 type: USER_ADD_RECEIVE,
 payload: data
})

export const userAdd = formData => dispatch => {
 dispatch({type: USER_ADD})

 const req = api.postUser(formData)

 req.then(({ data }) => {
  const { users, total } = store.getState()
  const items = users.slice(0, users.length)
  items.unshift(data)

  dispatch(userAddReceive({items, total: total + 1}))
 })

 return req
}

/** PUT USER */
export const USER_PUT = 'USER_PUT'

export const USER_PUT_RECEIVE = 'USER_PUT_RECEIVE'

export const userPutReceive = data => ({
 type: USER_PUT_RECEIVE,
 payload: data
})

export const userPut = (id, data) => dispatch => {
 dispatch({type: USER_PUT})

 const req = api.putUser(id, data)

 req.then(({ data }) => dispatch(userPutReceive(data)))

 return req
}

/** DELETE USER */
export const USER_DELETE = 'USER_DELETE'

export const USER_DELETE_RECEIVE = 'USER_DELETE_RECEIVE'

export const userDeleteReceive = data => ({
 type: USER_DELETE_RECEIVE,
 payload: data
})

export const userDelete = (id) => dispatch => {
 dispatch({type: USER_DELETE})

 const req = api.deleteUser(id)

 req.then(({ data }) => {
  const { users, total } = store.getState()
  let items = users.slice(0, users.length)
  items = items.filter(item => id !== item._id)

  dispatch(userDeleteReceive({ items, total: total - 1 }))
 })

 return req
}
