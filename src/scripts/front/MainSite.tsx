import React, { useCallback } from "react"
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import SingleTask from "./SingleTask";
import { EffectFade } from 'swiper';
const { NewTaskBtn, NewTaskForm} = NewTask
const { Hamburger, NavMenu } = Nav


const SwiperIndicator = ({slides} : any) => {
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

const MainSite = ( { usersList, loggedUser, TUser }: any) => {
    const [isMainSiteLoading, setIsMainSiteLoading] = useState<boolean>(false)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [loadingNewTask, setLoadingNewTask] = useState<boolean>(false)
    const [tasksList, setTasksList] = useState<[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [isSingleTaskOpened, setIsSingleTaskOpened] = useState<boolean>(false)
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false)
    const [slides, setSlides] = useState<number[]>([])
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    

    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleWindowWidth)
    },[window.innerWidth])


    const getTasksFromDatabase = async () => {
        fetch('http://127.0.0.1:8888/get-tasks')
        .then((data?) => data.json())
        .then((res?) => {
            console.log('getting tasks...')
            setTasksList(res)
            setIsMainSiteLoading(true)
            setLoadingNewTask(false)
            setIsTaskUpdated(false)
        })
        .catch((e) => console.log(e))
        .finally(()=> setIsMainSiteLoading(false))
    }

    useEffect(()=>{
        console.log(isTaskUpdated)
        setTimeout(()=>getTasksFromDatabase(), 700)
    },[loadingNewTask, isTaskUpdated])

    return (
        <>
            {
                isMainSiteLoading ? 
                <div className="loading-screen">
                    <p style={{color:'white'}}>Logging in... Please wait...</p>
                </div> 
                : 
                <div className="main-site" style={{overflow:'hidden'}}>
                    <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', left: '10px', bottom: '10px'}}>Logged: {loggedUser.login}</span>
                    
                        <NewTaskBtn
                            isNewTaskFormOpened={isNewTaskFormOpened}
                            setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                            isNavMenuOpened={isNavMenuOpened}
                            isSingleTaskOpened={isSingleTaskOpened}
                        />
                        <Hamburger 
                            setIsNavMenuOpened={setIsNavMenuOpened}
                            isNavMenuOpened={isNavMenuOpened}
                            isNewTaskFormOpened={isNewTaskFormOpened}
                            isSingleTaskOpened={isSingleTaskOpened}
                        />
                        {isNewTaskFormOpened && 
                            <NewTaskForm 
                                setIsFormOpened={setIsNewTaskFormOpened}
                                usersList={usersList}
                                tasksList={tasksList}
                                setTasksList={setTasksList}
                                setLoadingNewTask={setLoadingNewTask}
                                loggedUser={loggedUser}
                                TUser
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
                                    console.log(swiper)
                                    setSlides(Array(swiper.wrapperEl.childElementCount).fill(0))
                                }}>
                            
                            <SwiperSlide>
                                <TodoTasks
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <ActiveTasks 
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <DoneTasks 
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                            </SwiperSlide>
                            {windowWidth < 1024 ? 
                                <SwiperIndicator 
                                    slides={slides} 
                                    isSingleTaskOpened={isSingleTaskOpened}
                                /> 
                                : 
                                ''
                            }
                        </Swiper>
                    
                </div>
            }       
        </>
    )
}

export default MainSite