import React, { ReactNode } from 'react'
import { Layout } from './Layout'
import  '../styles/dashboardLayout.styles.css'

interface IdashboardLayout{
    navbar?: ReactNode
    header?: ReactNode
    mainContent?: ReactNode
    mainContentWidth?: string
    navbarHeight?: string
    sidebar?: ReactNode
    sidebarContent?: ReactNode
    sidebarWidth?: string
    sidebarHeight?: string
    mainContentHeight?: string
    headerHeight?: string
    bodyContainerHeight?: string
    useTopBottomLayout?: boolean
    singleColumnLeft?: boolean
    singleColumnRight?: boolean
    additionalClasses?: string
    customLeftContentClasses?:string
    customRightContentClasses?: string
    toggleSidebar? :boolean
    
}

export const DashboardLayout: React.FC<IdashboardLayout> = (props:IdashboardLayout) => {
    return (
      <>
            <Layout
                useTopBottomLayout
                customRightContentClasses='dashboard-layout-bodyContainer'
                leftContent={props.navbar && props.navbar}
                leftContentWidth={props.navbarHeight && props.navbarHeight}
                rightContentWidth={props.bodyContainerHeight && props.bodyContainerHeight}
                rightContent={
                    props.toggleSidebar ? (<>
                        <Layout
                        additionalClasses='dashboard-layout-sidebar'
                        leftContent={props.sidebar && props.sidebar}
                        rightContent={
                            <Layout
                                useTopBottomLayout
                                leftContentWidth= {props.headerHeight && props.headerHeight}
                                rightContentWidth={props.mainContentHeight && props.mainContentHeight}
                                customLeftContentClasses={props.customLeftContentClasses && props.customLeftContentClasses}
                                customRightContentClasses={props.customRightContentClasses && props.customRightContentClasses}
                                additionalClasses={props.additionalClasses && props.additionalClasses}
                                // customLeftContentClasses='dashboard-layout-header'
                                // customRightContentClasses='dashboard-layout-content'
                                // additionalClasses='dashboard-layout-containers'
                                leftContent={props.header && props.header}
                                rightContent={props.mainContent && props.mainContent }
                            />
                        }
                        leftContentWidth={props.sidebarWidth && props.sidebarWidth}
                        rightContentWidth={props.mainContentWidth && props.mainContentWidth}
                    />
                    </>)
                        :
                        (
                         
                            <Layout
                                useTopBottomLayout
                                leftContentWidth= {props.headerHeight && props.headerHeight}
                                rightContentWidth={props.mainContentHeight && props.mainContentHeight}
                                customLeftContentClasses={props.customLeftContentClasses && props.customLeftContentClasses}
                                customRightContentClasses={props.customRightContentClasses && props.customRightContentClasses}
                                additionalClasses={props.additionalClasses && props.additionalClasses}
                                // customLeftContentClasses='dashboard-layout-header'
                                // customRightContentClasses='dashboard-layout-content'
                                // additionalClasses='dashboard-layout-containers'
                                leftContent={props.header && props.header}
                                rightContent={props.mainContent && props.mainContent }
                            />
                        )
                    
                    //  "Bottom content"
                }
                
            />
      </>
  )
}




