import React, {useState} from 'react';
import {classNames} from "../../utils/utils";
import cl from './Input.module.css'

const Input = ({value, callback, alternCallback, type, name, id, button, focus}) => {

    const func = !callback ? e => alternCallback(e) : e => callback(e.target.value)

    const [dirty, setDirty] = useState(false)

    const validators = {
        email: "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
            "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
    }

    const errors = {
        email: 'Поле должно содержать E-Mail в формате youremail@site.com',
    }

    const blurHandler = (e) => {
        if (e.target.value !== null){
            setDirty(true);
        }
    }

    return (
        <div className={cl.inputContainer}>
            {button !== null &&
                <img
                    className={cl.iconInput}
                    src={button ? button.icon : ''}
                    alt=""
                    onClick={button ? button.callback : () => {}}
                />
            }
            <input
                value={value}
                onChange={func}
                style={button !== null ? {paddingRight: 60} : {}}
                className={cl.input}
                type={type}
                id={id}
                placeholder={' '}
                required={true}
                pattern={validators.type}
                onFocus={() => {if(focus) focus(true)}}
                onBlur={() => {if(focus) focus(false)}}
            />
            <label
                className={dirty ? classNames(cl.label, cl.labelUp) : cl.label}
                onFocus={() => {
                    setDirty(true)
                    if(focus) focus(true)
                }}
                onBlur={e => {
                    blurHandler(e)
                    if(focus) focus(false)
                }}
                htmlFor={id}
            >
                {name}
            </label>
            <div className={cl.error}>{errors[type]}</div>
        </div>
    )
};

export default Input;