import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.css'

const Btn = ({ children, variant, className, ...props }) => {
 const materialProps = { variant }
 return (
   <Button
     className={classNames('c-btn', className)}
     { ...materialProps }
     { ...props }
   >
    { children }
   </Button>
 )
}

Btn.propTypes = {
 variant: PropTypes.string
}

export default Btn

