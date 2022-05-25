import React from 'react';
import cl from './BasketItem.module.css'
import flower from '../../static/img/15-roz-premium-60-sm-v-kraft-bumage/rose1.jpg'

const BasketItem = () => {
    return (
        <div className={cl.basketItem}>
            <div className={cl.image}>
                <img src={flower} alt=""/>
            </div>
            <div className={cl.basketItemInfo}>
                <div>
                    <h4 className={cl.header}>15 роз в крафтовой бумаге</h4>
                    <p className={cl.price}>1500₽</p>
                </div>
                <div>
                    - 1 +
                </div>
            </div>
        </div>
    );
};

export default BasketItem;