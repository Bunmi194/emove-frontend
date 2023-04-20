import React from 'react'
import "../styles/button.styles.css"

interface IButton {
    backgroundColor?: string
    text?: string
    handleClick?: React.MouseEventHandler
    additionalClasses?: string 
    disabled?: boolean
}
export const Button: React.FC< IButton> = (props:IButton) => {
  return (
      <button
          disabled={props.disabled}
          style={{ backgroundColor: props.backgroundColor }}
          onClick={props.handleClick}
          className={props.additionalClasses}
      >
          {props.text}
      </button>
  )
}
