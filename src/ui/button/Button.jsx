import React from 'react';
import cl from './Button.module.css'
import {classNames} from "../../utils/utils";

const Button = ({children, color, click}) => {
    return (
        <a
            className={color === 'light'
                ? classNames(cl.button, cl.light)
                : classNames(cl.button, cl.dark)}
            onClick={click}
        >
            {children}
        </a>
    );
};

export default Button;