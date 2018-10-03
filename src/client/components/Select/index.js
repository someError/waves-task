import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MaterialSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/MenuItem';

const styles = theme => ({
 root: {
  display: 'flex',
  flexWrap: 'wrap',
 },
 formControl: {
  margin: theme.spacing.unit,
  minWidth: 120,
 },
 selectEmpty: {
  marginTop: theme.spacing.unit * 2,
 },
});

const Select = ({className, name, value, onChange, options, label, classes, ...props}) => {
 return (
    <MaterialSelect
      className={classes.selectEmpty}
      value={value}
      onChange={onChange}
      inputProps={{
       name: name,
       id: name,
      }}
    >
     {
      options && options.length
       ? options.map((option, i) => <MenuItem key={i} value={option}>{ option }</MenuItem>)
       : null
     }
    </MaterialSelect>
 )
}

export default withStyles(styles)(Select);