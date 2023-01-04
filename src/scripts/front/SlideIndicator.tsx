import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { useEffect, useState } from "react"

const SlideIndicator = ({slides} : any) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [dotClassName, setDotClassName] = useState<string>('slide-indicator__dot')
    const swiper = useSwiper()
    
    swiper.on('transitionEnd', ()=>{
        setCurrentSlide(swiper.realIndex)
    })

    // const moveIndicator = (id: number) => {
    //     if (currentSlide > 2) {
    //         return `${(id*14)-5}px`
    //     }

    //     return `${id*14+10}px`
    // }

    return (
        <div className="slide-indicator">
            {window.innerWidth < 640 ? 
                <>
                    {slides.map((slide:any, id:number) => {
                    return (
                        currentSlide === id ? 
                        <div className={dotClassName} key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}}/>
                        :
                        <div className={dotClassName} key={id} style={{background: '#1c1c1c',  transition: '.3s ease'}}/>
                    )
                    })}
                </>
                :
                <>
                    {slides.slice(0,-1).map((slide:any, id:number) => {
                        return (
                            currentSlide === id ? 
                            <div className={dotClassName} key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}}/>
                            :
                            <div className={dotClassName} key={id} style={{background: '#1c1c1c', transition: '.3s ease'}}/>
                    )
                    })}
                </>
            }
        </div>
    )
}

export default SlideIndicator