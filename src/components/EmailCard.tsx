import React from 'react'
import "../styles/emailCard.styles.css"


interface ICard {
    headerText?: string
    bodyText?: string
    icon?: React.ReactNode
    button?: React.ReactNode
    additionalNode?: React.ReactNode
    additionalClasses?: string
    width?: string
    height?: string
}
export const EmailCard:React.FC< ICard> = (props:ICard) => {
  return (
      <div className='email__card' style={{width: props.width, height: props.height, zIndex: "10"}}>
          {props.icon && props.icon} 
          <h3 className='header_text'>{props.headerText}</h3>
          {props.bodyText && <p className='p_text'>{props.bodyText}</p>}
          {props.additionalNode && props.additionalNode}
          {props.button && props.button}
      </div>
  )
}
  