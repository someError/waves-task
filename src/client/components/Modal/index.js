import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MaterialModal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
 return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
 const top = 50 + rand();
 const left = 50 + rand();

 return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`,
 };
}

const styles = theme => ({
 paper: {
  position: 'absolute',
  width: theme.spacing.unit * 50,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing.unit * 4,
 },
});

const Modal = ({open, classes, onClose, children, ...props}) => {
 return (
   <MaterialModal
     className='c-modal'
     aria-labelledby="simple-modal-title"
     aria-describedby="simple-modal-description"
     open={open}
     onClose={onClose}
   >
    <div style={getModalStyle()} className={classes.paper}>
     { children }
     <ModalWrapped />
    </div>
   </MaterialModal>
 )
}

Modal.propTypes = {
 classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ModalWrapped = withStyles(styles)(Modal);

export default ModalWrapped;