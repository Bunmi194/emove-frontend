import React from 'react';
import { Layout } from '../Layouts/Layout';
import LeftComponent from './LandingPageLeftComponent';
import RightComponent from './LandingPageRightComponent';

const LandingPageBody: React.FC = () => {
  return (
    <Layout
      leftContent={<LeftComponent />}
      rightContent={<RightComponent />}
      additionalClasses='landingPage__bodyContainer'
      leftContentWidth=''
      rightContentWidth=''
    />
  )
}

export default LandingPageBody
