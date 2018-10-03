import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userDelete } from "_redux/actions"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'
import moment from 'moment'
import Modal from 'components/Modal'
import { AddUserForm } from 'components/Forms'
// ()
class UserCard extends Component {
 constructor ({ className, _id, onEdit, deleteUser, ...props }) {
  super()
  this.state = {
   ...props,
   editProps: {},
   isModalOpen: false
  }
 }
 render() {
  const { state, props } = this
  const { editProps, isModalOpen, ...fieldsState } = state
  return (
    <Card className={classNames(props.className)}>
     <CardContent>
      {
       Object.keys(fieldsState).map(key => (
         <div key={key} className='c-user-card__prop'>
          <Typography className='c-user-card__prop-label' color="textSecondary">
           { key }
          </Typography>
          <Typography component="p">
           {
            key === 'birthDate' || key === 'updated'
              ? (
                key === 'birthDate'
                  ? moment(fieldsState[key]).format('DD MMM YYYY')
                  : moment(fieldsState[key]).format('DD MMM YYYY HH:mm')
              )
              : fieldsState[key]
           }
          </Typography>
         </div>
       ))
      }
     </CardContent>
     <CardActions>
      <Button size="small" onClick={() => this.props.deleteUser(props._id)}>
       <Typography color='error'>Delete</Typography>
      </Button>
      <Button
        size="small"
        onClick={() => this.setState({isModalOpen: true, editProps: {_id: props._id, ...fieldsState}})}
      >
       <Typography color='error'>Edit</Typography>
      </Button>
     </CardActions>

     <Modal
       open={state.isModalOpen}
       onClose={() => this.setState({isModalOpen: false})}
     >
      <AddUserForm
        edit
        {...state.editProps}
        editCallback={(state) => this.setState({...state, isModalOpen: false})}
        onModalClose={() => this.setState({isModalOpen: false})}
      />
     </Modal>

    </Card>
  )
 }
}

const mapDispatchToProps = dispatch => ({
 deleteUser(id) {
  return dispatch(userDelete(id))
 }
});


export default connect(null, mapDispatchToProps)(UserCard)