import React, { useCallback } from "react"
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
import SlideIndicator from "./SlideIndicator";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import SingleTask from "./SingleTask";
import { EffectFade } from 'swiper';
const { NewTaskBtn, NewTaskForm} = NewTask
const { Hamburger, NavMenu } = Nav




const MainSite = ( { usersList, loggedUser, TUser }: any) => {
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [tasksList, setTasksList] = useState<[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [slides, setSlides] = useState<number[]>([])
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [isSingleTaskOpened, setIsSingleTaskOpened] = useState<boolean>(false)


    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleWindowWidth)
    },[window.innerWidth])


    const getTasksFromDatabase = async () => {
        fetch('http://127.0.0.1:8888/get-tasks')
        .then(data => data.json())
        .then(res => {
            console.log('getting tasks...')
            setTasksList(res)
            setLoadingTasks(false)
        })
        .catch(e => console.log(e))
    }

    useEffect(()=>{
        getTasksFromDatabase()
    },[])

    return (
        <div className="main-site">
            <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', left: '10px', bottom: '10px'}}>Logged: {loggedUser.login}</span>
            
                <NewTaskBtn
                    isNewTaskFormOpened={isNewTaskFormOpened}
                    setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                    isNavMenuOpened={isNavMenuOpened}
                />
                <Hamburger 
                    setIsNavMenuOpened={setIsNavMenuOpened}
                    isNavMenuOpened={isNavMenuOpened}
                    isNewTaskFormOpened={isNewTaskFormOpened}
                />
                {isNewTaskFormOpened && 
                    <NewTaskForm 
                        setIsFormOpened={setIsNewTaskFormOpened}
                        usersList={usersList}
                        tasksList={tasksList}
                        setTasksList={setTasksList}
                        loggedUser={loggedUser}
                    />
                }
                <NavMenu isNavMenuOpened={isNavMenuOpened}/>
                <Swiper
                        style={{height:'100vh', top:'70px'}}
                        modules={[EffectFade]}
                        spaceBetween={-55}
                        breakpoints={{
                            360: {slidesPerView: 1},
                            380: {spaceBetween: -60},
                            400: {spaceBetween: -65},
                            420: {spaceBetween: -75},
                            440: {spaceBetween: -80},
                            460: {spaceBetween: -85},
                            480: {spaceBetween: -90},
                            500: {spaceBetween: -95},
                            520: {spaceBetween: -100, slidesPerView: 1},
                            640: {slidesPerView: 2},
                            1024: {slidesPerView: 3}
                        }}
                        // allowSlideNext={isSingleTaskOpened ? false: true}
                        // allowSlidePrev={isSingleTaskOpened ? false: true}
                        slidesPerView={1}
                        onSlideChange={() => {console.log('slide change')}}
                        onSwiper={(swiper) => {
                            setSlides(Array(swiper.wrapperEl.childElementCount).fill(0))
                        }}>
                    
                    <SwiperSlide>
                        {loadingTasks ? 
                            <div className="loader"
                                style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}
                            />
                        :
                            <TodoTasks
                                tasksList={tasksList}
                                setTasksList={setTasksList}
                            />
                        }
                    </SwiperSlide>
                    <SwiperSlide>
                    {loadingTasks ? 
                            <div 
                            className="loader"
                                style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}
                            />
                        :
                            <ActiveTasks 
                                tasksList={tasksList}
                                setTasksList={setTasksList}
                            />
                    }
                    </SwiperSlide>
                    <SwiperSlide>
                    {loadingTasks ? 
                            <div 
                            className="loader"
                                style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}
                            />
                        :
                            <DoneTasks 
                                tasksList={tasksList}
                                setTasksList={setTasksList}
                            />
                    }
                    </SwiperSlide>
                    {windowWidth < 1024 ? 
                        <SlideIndicator 
                            slides={slides} 
                        /> 
                        : 
                        ''
                    }
                </Swiper>
            
        </div>
    )
}

export default MainSite