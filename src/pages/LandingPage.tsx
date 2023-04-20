import React from 'react';
import LandingPageBody from '../components/LandingPageBody';
import Header from '../components/LandingPageHeader';
import Footer from '../components/LandingPageFooter';
import { Layout } from '../Layouts/Layout';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Layout
        useTopBottomLayout={true}
        leftContentWidth='100%'
        rightContentWidth='100%'
        leftContent={<Header />}
        rightContent={
          <Layout
            leftContentWidth='100%'
            rightContentWidth='100%'
            useTopBottomLayout={true}
            leftContent={<LandingPageBody />}
            rightContent={<Footer />}
          />
        }
      />
    </div>
  )
}

export default LandingPage
