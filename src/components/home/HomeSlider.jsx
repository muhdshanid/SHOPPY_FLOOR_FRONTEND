import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from "swiper";
import { TypeAnimation } from 'react-type-animation';
import {Link} from 'react-router-dom'
import slider1 from '../../assets/images/lapcat.jpg'
const HomeSlider = () => {
  
  const slider3 = "https://t2.tudocdn.net/567748?w=1200&h=1200"
  const slider2 = "https://global.beyerdynamic.com/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg"
  return (
    <div  className='w-full  my-10 h-[50vh] rounded-lg '>
         <Swiper className='h-full w-full'
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter:true
      }}
      modules={[Pagination,Autoplay]}
    >
      <SwiperSlide className='relative'>
        <div className='w-full h-full absolute inset-0  bg-no-repeat bg-cover '>
            <img src={slider1} className='w-full h-full rounded-lg object-cover' alt="banner" />
        </div>
        <div className='absolute  bottom-0 left-2 sm:top-20 sm:left-20'>
        <TypeAnimation
      sequence={[
        'BEST', // Types 'One'
        1000, // Waits 1s
        'LAPTOPS', // Deletes 'One' and types 'Two'
        2000, // Waits 2
      ]}
      wrapper="div"
      
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em',color:"white",fontWeight:700 }}
    />
          <h6 className='text-2xl font-bold text-white uppercase'>from ₹37,000 </h6>
          <Link to={"/cat-products/laptops"} className='button-green animate-bounce my-4 !w-full  uppercase'>check it now!</Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className='relative'>
        <div className='w-full h-full absolute inset-0  bg-no-repeat bg-cover '>
            <img src={slider2} className='w-full h-full  rounded-lg object-cover' alt="banner" />
        </div>
        <div className='absolute  bottom-0 left-2 sm:top-20 sm:left-20'>
        <TypeAnimation
      sequence={[
        'BEST IS HERE', // Types 'One'
        1000, // Waits 1s
        'BUY NOWWWW', // Deletes 'One' and types 'Two'
        2000, // Waits 2
      ]}
      wrapper="div"
      
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em',color:"white",fontWeight:700 }}
    />
          <h6 className='text-2xl font-bold text-white uppercase'>from ₹1,499 </h6>
          <div className="">
          <Link to={"/cat-products/headphones"} className='button-green 
          my-4 animate-bounce w-[10rem] uppercase'>check it now!</Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='relative'>
        <div className='w-full h-full absolute inset-0  bg-no-repeat bg-cover '>
            <img src={slider3} className='w-full h-full rounded-lg object-cover' alt="banner" />
        </div>
        <div className='absolute  bottom-0 left-2 sm:top-20 sm:left-20'>
        <TypeAnimation
      sequence={[
        'NEX 3', // Types 'One'
        1000, // Waits 1s
        'THE GAME CHANGER', // Deletes 'One' and types 'Two'
        2000, // Waits 2
      ]}
      wrapper="div"
      
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em',color:"white",fontWeight:700 }}
    />
          <h6 className='text-2xl font-bold text-white uppercase'>Upto 20%off </h6>
         <div>
         <Link to={"/product/63e458d1c0e070be30609623"} className='button-green
           my-4 animate-bounce w-[10rem]  uppercase'>check it now!</Link>
         </div>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default HomeSlider