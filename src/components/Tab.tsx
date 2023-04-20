import React, { ReactNode } from 'react'
import "../styles/tab.styles.css"

interface ITab{
    icon: ReactNode
    text: string
    customClasses?: string
    url?: string
}

export const Tab:React.FC<ITab> = (props:ITab) => {
    return (
    //   (`layout ${props.additionalClasses? props.additionalClasses : "" }`).trim()
      <div className={(`tab ${props.customClasses? props.customClasses : ""}`).trim()}>
          <span className='tab-icon'>{props.icon && props.icon }</span>
          <span className='tab-text'>{ props.text && props.text}</span>  
    </div>
  )
}
