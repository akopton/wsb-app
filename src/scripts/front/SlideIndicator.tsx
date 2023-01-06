import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { useEffect, useState } from "react"

const SlideIndicator = ({slides} : any) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const swiper = useSwiper()
    
    swiper.on('transitionEnd', ()=>{
        setCurrentSlide(swiper.realIndex)
    })

    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleWindowWidth)
    },[window.innerWidth])


    return (
        <div className="slide-indicator">
            {windowWidth < 640 ? 
                <>
                    {slides.map((slide:any, id:number) => {
                    return (
                        currentSlide === id ? 
                        <div className='slide-indicator__dot' key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}}/>
                        :
                        <div className='slide-indicator__dot' key={id} style={{background: '#1c1c1c',  transition: '.3s ease'}}/>
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
                            <div className='slide-indicator__dot' key={id} style={{background: 'rgb(57, 255, 238)',  transition: '.3s ease'}}/>
                            :
                            <div className='slide-indicator__dot' key={id} style={{background: '#1c1c1c', transition: '.3s ease'}}/>
                    )
                    })}
                </>
            }
        </div>
    )
}

export default SlideIndicator