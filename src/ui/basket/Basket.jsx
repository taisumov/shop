import React from 'react';
import cl from './Basket.module.css'
import {classNames} from "../../utils/utils";
import {observer} from "mobx-react-lite";
import Button from "../button/Button";
import BasketItem from "../basketItem/BasketItem";

const Basket = observer(({basketIsOpen, setBasketIsOpen}) => {

    document.addEventListener('click', (e) => {
        if (e.clientX <= (window.innerWidth - 370) && basketIsOpen) {
            setBasketIsOpen(false)
        }
    })

    const totalPrice = 1000
    const totalItems = 5

    return (
        <div className={basketIsOpen ? classNames(cl.basket, cl.active) : cl.basket}>
            <div className={cl.basketContainer}>
                <h2 className={cl.basketHeader}>Корзина</h2>
                <div className={cl.items}>
                    <BasketItem/>
                    <BasketItem/>
                    <BasketItem/>
                    <BasketItem/>
                    <BasketItem/>
                </div>
            </div>
            <div className={cl.basketFooter}>
                <div className={cl.total}>
                    <p>Сумма заказа</p>
                    <p>{totalPrice}₽</p>
                </div>
                <Button color={'light'} click={()=> setBasketIsOpen(false)}>Закрыть</Button>
            </div>
        </div>
    );
});

export default Basket;