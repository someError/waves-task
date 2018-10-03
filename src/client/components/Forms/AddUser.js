import React, {Component, Fragment} from 'react'
import moment from 'moment'
import {getMonthsList, getYearsList, getDaysList} from '../../util'
import {connect} from 'react-redux'
import {userAdd, userPut} from '_redux/actions'
import Input from 'components/Input'
import Button from 'components/Button'
import Select from 'components/Select'

import './AddUserForm.css'

class AddUserForm extends Component {
 constructor({birthDate, edit, onModalClose, editCallback, ...props}) {
  super()

  this.state = {
   ...props,
   birthDate: birthDate ? moment(birthDate) : moment("01 Jan 1990")
  }

 }

 onChange(e) {
  const {name, value} = e.target

  this.setState({[name]: value})
 }

 render() {
  const {state, props} = this

  return (
    <form
      className='c-form c-form--user'
      onSubmit={e => {
       e.preventDefault()
       const {edit, onModalClose, userAdd, userEdit, updated, _id, ...data} = state
       props.edit
         ? props.userEdit(props._id, {updated: moment(), ...data})
           .then(() => props.editCallback({updated: moment(), ...data}))
         : props.userAdd({updated: moment(), ...data})
      }}
    >
     <div className="c-form__col">
      <Input
        name='name'
        label='Username'
        maxLength='100'
        onChange={e => this.onChange(e)}
        value={state.name}
      />
     </div>

     <div className="c-form__col">
      <Input
        name='city'
        label='City'
        onChange={e => this.onChange(e)}
        value={state.city}
      />
     </div>

     <div className="c-form__col">
      <Input
        name='address'
        label='Address'
        onChange={e => this.onChange(e)}
        value={state.address}
      />
     </div>

     <div className="c-form__col">
      <Input
        name='phone'
        label='Phone'
        mask='+7 999 999 99 99'
        onChange={e => this.onChange(e)}
        value={state.phone}
      />
     </div>

     <div className="c-form__col">
      <Select
        name='DD'
        label='Day'
        options={getDaysList(moment(state.birthDate).daysInMonth())}
        value={moment(state.birthDate).format('DD')}
        onChange={e => {
         const birthDate = moment(state.birthDate).date(e.target.value).format()
         this.setState({birthDate})
        }}
      />
      <Select
        name='MM'
        label='Month'
        options={getMonthsList()}
        value={moment(state.birthDate).format('MMMM')}
        onChange={e => {
         const monthIndex = moment().month(e.target.value).format('M') - 1
         const birthDate = moment(state.birthDate).month(monthIndex).format()
         this.setState({birthDate})
        }}
      />
      <Select
        name='YYYY'
        label='Year'
        options={getYearsList(1921, 2014)}
        value={String(moment(state.birthDate).format('YYYY'))}
        onChange={e => {
         const birthDate = moment(state.birthDate).year(e.target.value).format()
         this.setState({birthDate})
        }}
      />
     </div>
     <Button variant="outlined" color="primary" type='submit'>
      {props.edit ? 'Edit' : 'Add'} user
     </Button>
    </form>
  )
 }
}

const mapDispatchToProps = dispatch => ({
 userAdd(data) {
  return dispatch(userAdd(data))
 },
 userEdit(id, data) {
  return dispatch(userPut(id, data))
 },
})

export default connect(null, mapDispatchToProps)(AddUserForm)