"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay,  Navigation } from 'swiper/modules';
import Image from 'next/image';


const EventSlider = () => {
    return (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        navigation={false}
        modules={[Autoplay,  Navigation]}
        className="w-full max-h-[100vh]"
      >
        <SwiperSlide>
            <Image src="/images/slider.jpg" alt="" width={1000} height={500} className='w-full h-auto'/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/images/slider.jpg" alt="" width={1000} height={500} className='w-full h-auto'/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/images/slider.jpg" alt="" width={1000} height={500} className='w-full h-auto'/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/images/slider.jpg" alt="" width={1000} height={500} className='w-full h-auto'/>
        </SwiperSlide>
       
      </Swiper>
    );
};


export default EventSlider;