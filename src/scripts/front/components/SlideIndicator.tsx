import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { useEffect, useState } from "react"

const SlideIndicator = ({slides, windowWidth} : any) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const swiper = useSwiper()
    
    swiper.on('transitionEnd', ()=>{
        setCurrentSlide(swiper.realIndex)
    })

    const swipe = (currentSlide: number, id: number) => {
        if (id > currentSlide ) swiper.slideNext()
        else if (id < currentSlide) swiper.slidePrev()
    }

    return (
        <div className="slide-indicator">
            {windowWidth < 640 ? 
                <>
                    {slides.map((slide:any, id:number) => {
                    return (
                        currentSlide === id ? 
                        <div className='slide-indicator__dot' key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}} />
                        :
                        <div className='slide-indicator__dot' key={id} style={{background: '#1c1c1c',  transition: '.3s ease'}} />
                    )
                    })}
                </>
                :
                windowWidth < 1024 ? 
                <>
                    {slides.slice(0,-1).map((slide:any, id:number) => {
                        return (
                            currentSlide === id ? 
                            <div className='slide-indicator__dot' key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}}/>
                            :
                            <div className='slide-indicator__dot' key={id} style={{background: '#1c1c1c', transition: '.3s ease'}}/>
                    )
                    })}
                </>
                :
                <>
                    {slides.slice(0,-2).map((slide:any, id:number) => {
                        return (
                            currentSlide === id ? 
                            <div className='slide-indicator__dot' key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}} onClick={()=>swipe(currentSlide, id)}/>
                            :
                            <div className='slide-indicator__dot' key={id} style={{background: '#1c1c1c', transition: '.3s ease'}} onClick={()=>swipe(currentSlide, id)}/>
                    )
                    })}
                </>
            }
        </div>
    )
}

export default SlideIndicator