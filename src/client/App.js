import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import api from './api'

import { AddUserForm } from 'components/Forms'
import { UsersGrid } from 'components/Grid'

import 'animate.css'

api.init();

const App = () => {
 return (
  <Provider store={store}>
   <Fragment>
    <AddUserForm />
    <UsersGrid />
   </Fragment>
  </Provider>
 )
}

export default App
