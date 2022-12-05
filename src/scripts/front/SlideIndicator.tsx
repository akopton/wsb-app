import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { useEffect, useState } from "react"

const SlideIndicator = ({slides} : any) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const swiper = useSwiper()
    swiper.on('transitionEnd', ()=>{
        setCurrentSlide(swiper.realIndex)
    })

    return (
        <div className="slide-indicator">
            {window.innerWidth < 640 ? 
            <>
                {slides.map((slide:any, id:number) => {
                return (
                    currentSlide === id ? 
                    <div key={id} style={{background: 'rgb(57, 255, 238)', borderRadius:'50%', height: '8px', width: '8px'}}/>
                    :
                    <div key={id} style={{background: '#1c1c1c', borderRadius:'50%', height: '8px', width: '8px'}}/>
                )
                })}
            </>
            :
            <>
                {slides.slice(0,-1).map((slide:any, id:number) => {
                    return (
                        currentSlide === id ? 
                        <div key={id} style={{background: 'rgb(57, 255, 238)', borderRadius:'50%', height: '8px', width: '8px'}}/>
                        :
                        <div key={id} style={{background: '#1c1c1c', borderRadius:'50%', height: '8px', width: '8px'}}/>
                )
                })}
            </>
            }
        </div>
    )
}

export default SlideIndicator