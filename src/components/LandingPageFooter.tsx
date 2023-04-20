import React from 'react';

const Footer: React.FC =()=> {
  const APP_NAME = 'E-move';
  const date: any = new Date(Date.now()).getFullYear().toString() as unknown as any
  return (
    <div className='landingPageFooterContainer'>
      <div style={{ marginBottom: '20px' }}>
        <div className='landingPage__footerLogo'>
          <div>
            <img src='/emove-logo.png' alt='logo' className='landingPage__logoImage' />
          </div>
          <div>
            <span className='landingPage__appName'>E-Move</span>
          </div>
        </div>
        <div className='landingPageFooter'>
          <div className='landingPageFooterItem'>About</div>
          <div className='landingPageFooterItem'>Privacy</div>
          <div className='landingPageFooterItem'>FAQ</div>
        </div>
      </div>
      <hr />
      <div className='landingPageCopy'>
        <div className='landingPage__copy'>
          <p className='landingPageFloor landingPage__allRights'>
            All rights reserved. &copy; {date} {`${APP_NAME}`}
          </p>
        </div>
        <div className='landingPage__socialIcon'>
          <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
            <img src='/instagram.png' alt='instagram' className='landingPage__icon' />
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noreferrer'>
            <img src='/twitter.png' alt='twitter' className='landingPage__icon' />
          </a>
          <a href='https://www.youtube.com' target='_blank' rel='noreferrer'>
            <img src='/youtube.png' alt='youtube' className='landingPage__icon' />
          </a>
          <p className='landingPageFloor'>flawlessflavour@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
