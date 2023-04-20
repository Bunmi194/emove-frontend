import React, { ReactNode, useState } from 'react'
import '../styles/layout.styles.css'
export const Layout: React.FC<{
  leftContent?: ReactNode
  rightContent?: ReactNode
  leftContentWidth?: string
  rightContentWidth?: string
  useTopBottomLayout?: boolean
  singleColumnLeft?: boolean
  singleColumnRight?: boolean
  additionalClasses?: string
  customLeftContentClasses?:string
  customRightContentClasses?:string
}> = (props: {
  leftContent?: ReactNode
  rightContent?: ReactNode
  leftContentWidth?: string
  rightContentWidth?: string
  useTopBottomLayout?: boolean
  singleColumnLeft?: boolean
  singleColumnRight?: boolean
  additionalClasses?: string
  customLeftContentClasses?:string
  customRightContentClasses?:string
}) => {
  return (
    <>
      <div
        className={(`layout ${props.additionalClasses? props.additionalClasses : "" }`).trim()}
        style={{
          flexDirection: props.useTopBottomLayout ? 'column' : 'row',
          justifyContent: props.useTopBottomLayout ? 'start' : 'center',
        }}
      >
        <div
          className={(`base-left-content ${props.customLeftContentClasses? props.customLeftContentClasses : "" }`).trim()}
          style={{
            width: !props.useTopBottomLayout ? props.leftContentWidth : "100%",
            height: props.useTopBottomLayout ? props.leftContentWidth : "100%"
          }}
        >
          {props.leftContent && (props.leftContent)} 
        </div>
        <div
          className={(`base-right-content ${props.customRightContentClasses? props.customRightContentClasses : "" }`).trim()}
          style={{
           width: !props.useTopBottomLayout ? props.rightContentWidth : "100%",
            height: props.useTopBottomLayout ? props.rightContentWidth : "100%"
          }}
        >
          {props.rightContent && (props.rightContent)}
        </div>
      </div>
    </>
  )
}

