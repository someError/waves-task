import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUsers, userDelete } from '_redux/actions'
import UserCard from 'components/UserCard'
import Modal from 'components/Modal'
import { AddUserForm } from 'components/Forms'

import  './UserGrid.css'


class UserGrid extends Component {
 constructor (){
  super()
  this.state = {
   editProps: {},
   isModalOpen: false
  }
 }

 componentDidMount() {
  this.props.fetchUsers()
 }

 render() {
  const { state, props } = this
  if (props.loading || !props.users) return <div>loading</div>
  return (
    <div className='l-users'>
     {
      props.users.length
       ? props.users.map(user => {
          return (
            <UserCard
              className='l-users__item'
              key={user._id}
              {...user}
            />
          )
        })
       : 'no user yet'
     }
    </div>
  )
 }

}

const mapStateToProps = ({users, loading}) => ({users, loading})

const mapDispatchToProps = dispatch => ({
 fetchUsers() {
  return dispatch(getUsers())
 }
});


export default connect(mapStateToProps, mapDispatchToProps)(UserGrid)