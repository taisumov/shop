import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Scrollbar} from "swiper";
import cl from './Slider.module.css'

const Slider = ({images}) => {
    SwiperCore.use([Scrollbar]);
    return (
        <div className={cl.forSwiper}>
            <Swiper
                modules={[Scrollbar]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                scrollbar={{draggable: true}}
            >
                {images.map(image =>
                    <SwiperSlide>
                        <img className={cl.sliderImage} src={image} alt=""/>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default Slider;