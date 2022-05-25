import React from 'react';
import classes from "../Navigation.module.css";

const BurgerMenu = ({isBurgerOpen, burgerClickHandler}) => {
    return (
        <div
            id="burgerMenu"
            className={isBurgerOpen ? classes.open : ''}
            onClick={() => burgerClickHandler()}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default BurgerMenu;