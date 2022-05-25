import React from 'react';
import cl from './ShopCard.module.css'
import image from '../../static/img/15-roz-premium-60-sm-v-kraft-bumage/rose1.jpg'
import {Link, useNavigate} from "react-router-dom";
import Button from "../button/Button";

const ShopCard = ({item, to}) => {

    const navigate = useNavigate()

    const nav = () => {
        navigate('/item/' + to)
    }

    return (
        <div className={cl.container}>
            <a onClick={nav} className={cl.image}>
                <img src={image} alt=""/>
            </a>
            <a onClick={nav} className={cl.text}>{item.name}</a>
            <div className={cl.price}>{item.price}₽</div>
            <Button color={'light'} click={nav}>Купить</Button>
        </div>
    );
};

export default ShopCard;