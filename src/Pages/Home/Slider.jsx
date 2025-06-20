import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slide1 from '../../assets/banner/banner1.png';
import slide2 from '../../assets/banner/banner2.png';
import slide3 from '../../assets/banner/banner3.png';

const Slider = () => {
    return (
        <div className='max-w-11/12 mx-auto my-6 rounded-2xl overflow-hidden'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="rounded-2xl"
            >
                <SwiperSlide>
                    <img src={slide1} alt="Slide 1" className="w-full h-auto object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="Slide 2" className="w-full h-auto object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="Slide 3" className="w-full h-auto object-cover" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
