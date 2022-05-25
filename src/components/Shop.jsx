import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import ShopCard from "../ui/shopcard/ShopCard";
import {getItems} from "../http/itemsAPI";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Scrollbar} from "swiper";
import flower1 from '../static/img/flower1.jpg'
import flower2 from '../static/img/flower2.jpg'
import flower3 from '../static/img/flower3.jpg'
import Button from "../ui/button/Button";

const Shop = () => {
    const {user} = useContext(Context)
    const [items, setItems] = useState([])
    const [slides, setSlides] = useState([
        {id: 1, icon: flower1},
        {id: 2, icon: flower2},
        {id: 3, icon: flower3},
    ])

    const getItemsToShop = () => {
        getItems().then(data => setItems(data.rows))
    }

    useEffect(() => {
        getItemsToShop()
    }, [])

    return (
        <>
        <br/>
        <br/>
        <br/>
        <div className={'shopContainer'}>
            <div className={'swiperMain'}>
                <Swiper
                    style={{userSelect: 'none'}}
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    speed={500}
                    //preventClicks={false}
                    //preventClicksPropagation={false}
                >
                    {slides.map(slide =>
                        <SwiperSlide key={slide.id} style={{height: '100%'}}>
                            <div className={'mainSwipeItem'} style={{background: `url("${slide.icon}")`, backgroundSize: 'cover'}}>

                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
        <div className={'shop'}>

            <div>
                123
            </div>
            <div>
                <h1>Все цветы в нашем магазине:</h1>
                <div className={'shopItemList'}>
                    {items.map(i =>
                        <ShopCard key={i.id} item={i} to={i.id}/>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Shop;