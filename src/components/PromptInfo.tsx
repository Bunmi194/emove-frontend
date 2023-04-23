import React from 'react';
import "../styles/prompt.styles.css"

const PromptInfo = ({header, handleClickClose}:any) => {
    return (
        <div className='profile-card_container'>
            <div className='new__wrapper'>

                <h3>{header}</h3>
                <div className='new__btnCard'>
                    <div>
                        <button type='button' className='new__btnCardFooter' onClick={handleClickClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
      )
    }

export default PromptInfo