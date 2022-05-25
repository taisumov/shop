import React from 'react';
import cl from './TextSwitcher.module.css'

const TextSwitcher = ({firstSwitch, secondSwitch, setTypeAuth, typeAuth}) => {

    const changeAuthType = () => {
        setTypeAuth(typeAuth === 'login' ? 'registration' : 'login')
    }

    return (
        <div className={cl.switchButton}>
            <input
                className={cl.switchButtonCheckbox}
                type="checkbox"
                onClick={() => changeAuthType()}
            />
            <label className={cl.switchButtonLabel} htmlFor={`${cl.switchButtonCheckbox}`}>
                <span className={cl.switchButtonLabelSpan}>
                    {firstSwitch}
                </span>
            </label>
        </div>
    );
};

export default TextSwitcher;