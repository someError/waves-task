import React from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import InputMask from 'react-input-mask'

const Input = ({className, mask, onChange, maxLength, ...props}) => {
 if (mask) {
  const {value, ...textFieldProps} = props
  return (
    <InputMask
     mask={mask}
     value={value}
     onChange={onChange}
    >
     {() => <TextField {...textFieldProps} />}
    </InputMask>
  )
 }

 const _onChange = (e) => {
  if (maxLength && e.target.value.length && e.target.value.length > Number(maxLength)) {
   e.target.value = e.target.value.slice(0, Number(maxLength))
  }
  onChange(e)
 }

 return (
   <TextField
     className={classNames('c-input', className)}
     onChange={e => _onChange(e)}
     {...props}
   />
 )
}

export default Input
