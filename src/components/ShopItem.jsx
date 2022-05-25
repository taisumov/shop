import React, {useContext, useEffect, useState} from 'react';
import Slider from "../ui/slider/Slider";
import 'swiper/css';
import 'swiper/css/scrollbar';
import image from '../static/img/15-roz-premium-60-sm-v-kraft-bumage/rose1.jpg'
import image2 from '../static/img/15-roz-premium-60-sm-v-kraft-bumage/rose2.jpg'
import image3 from '../static/img/15-roz-premium-60-sm-v-kraft-bumage/rose3.jpg'
import {useParams} from "react-router-dom";
import {getItemByID, getRating, getRecs} from "../http/itemsAPI";
import StarRatings from "react-star-ratings/build/star-ratings";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import cl from "../ui/slider/Slider.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Scrollbar} from "swiper";
import ShopCard from "../ui/shopcard/ShopCard";

const ShopItem = observer(() => {
    SwiperCore.use([Scrollbar, Navigation]);
    const {user} = useContext(Context)

    const [item, setItem] = useState({})
    const {id} = useParams()
    const [rating, setRating] = useState(0)
    const [recs, setRecs] = useState([])

    useEffect(() => {
        getItemByID(id).then(data => {
            setItem(data)
            setRating(data.rating)
        }).catch(e => alert(e))
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        getRating((jwt_decode(localStorage.getItem('token'))).id, id).then(data => {
            console.log(data ? 'Ваша оценка' : 'Оценка пользователей')
        })
    }, [])

    useEffect(() => {
        getRecs((jwt_decode(localStorage.getItem('token'))).id).then(data => setRecs(data))
    }, [])

    const createImages = (images) =>
        images
            ? images.split(',').map(img => `${process.env.REACT_APP_API_URL}${img}`)
            : []

    return (
        <div className={'shopItem'}>
            <div className={'itemFirstInfo'}>
                <div className={'itemSlider'}>
                    <Slider images={item.img ? createImages(item.img) : [image, image2, image3]}/>
                </div>
                <div className={'itemContent'}>
                    <h1 className={'itemTitle'}>
                        {item.name}
                    </h1>
                    <p className="itemPrice">
                        ₽ {item.price}
                    </p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                        <StarRatings
                            rating={rating}
                            starRatedColor="black"
                            starHoverColor='black'
                            starDimension={'25px'}
                            changeRating={setRating}
                            numberOfStars={5}
                            name='rating'
                        />
                        <p className={'itemAbout'}>{item.counter_rating} оценок пользователей</p>
                    </div>
                    <h3>Страна-производитель:</h3>
                    <p className={'itemAbout'}>
                        {item.region}
                    </p>
                    <h3>Описание:</h3>
                    <p className={'itemAbout'}>
                        {item.description}
                    </p>
                </div>
            </div>
            <div>
                <h1 className={'centeredHeader'}>Рекомендации для вас</h1>
                <div className={'swiperRecs'}>
                    <Swiper
                        style={{padding: '0 50px', userSelect: 'none'}}
                        modules={[Scrollbar, Navigation]}
                        spaceBetween={50}
                        slidesPerView={4}
                        speed={500}
                        navigation
                        scrollbar={{draggable: true}}
                        preventClicks={false}
                        //preventClicksPropagation={false}
                    >
                        {recs.map(rec =>
                            <SwiperSlide key={rec.id} style={{height: '100%'}}>
                                <ShopCard item={rec} to={rec.id}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
});

export default ShopItem;