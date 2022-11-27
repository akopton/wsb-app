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

const SwiperIndicator = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [slides, setSlides] = useState<number[]>([])
    const swiper = useSwiper()
    swiper.on('transitionEnd', ()=>{
        setCurrentSlide(swiper.realIndex)
    })

    useEffect(()=>{
        setSlides(Array(swiper.wrapperEl.childElementCount).fill(0))

    },[])

    return (
        <div className="slide-indicator">
            {slides.map((slide, id) => {
                return (
                    currentSlide === id ? 
                    <div key={id} style={{background: 'rgb(57, 255, 238)', borderRadius:'50%', height: '10px', width: '10px'}}/>
                    :
                    <div key={id} style={{background: '#1c1c1c', borderRadius:'50%', height: '10px', width: '10px'}}/>
                )
            })}
        </div>
    )
}

const MainSite = ( { usersList, defaultUser, setIsLoggedIn, setLoggedUser, loggedUser, waitValue }: any) => {
    const [isMainSiteLoading, setIsMainSiteLoading] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [loadingNewTask, setLoadingNewTask] = useState<boolean>(false)
    const [tasksList, setTasksList] = useState<[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [isSingleTaskOpened, setIsSingleTaskOpened] = useState<boolean>(false)
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [index, setIndex] = useState<number>()
    const [space, setSpace] = useState<number>(-55)
    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
        setSpace(space-1)
    }

    useEffect(()=>{
        window.addEventListener('resize', handleWindowWidth)
    },[windowWidth])

    const isMobile = windowWidth < 768

    const getTasksFromDatabase = async () => {
        fetch('http://127.0.0.1:8888/get-tasks')
        .then((data?) => data.json())
        .then((res?) => {
            console.log('getting tasks...')
            setTasksList(res)
            setIsMainSiteLoading(false)
            setLoadingNewTask(false)
            setIsTaskUpdated(false)
        })
    }

    useEffect(()=>{
        console.log(isTaskUpdated)
        setTimeout(()=>getTasksFromDatabase(), 700)
    },[loadingNewTask, isTaskUpdated])

    useCallback(()=>{
        setIsSingleTaskOpened(isSingleTaskOpened)
    },[isSingleTaskOpened])

    return (
        <>
            {
                isMainSiteLoading ? 
                <div className="loading-screen">
                    <p>Logging in... Please wait...</p>
                </div> 
                : 
                <div className="main-site" style={{overflow:'hidden'}}>
                <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', left: '20px', top: '10px'}}>Logged: {loggedUser.login}</span>
                <div className="nav-background" style={isSingleTaskOpened ? {display:'none'} : {position: 'fixed', top:'0', left:'0', height:'65px', width: '100%', background: '#red', zIndex:'1'}}></div>

                    {windowWidth < 768 ?
                    <>
                            <NewTaskBtn
                                isNewTaskFormOpened={isNewTaskFormOpened}
                                setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                                isNavMenuOpened={isNavMenuOpened}
                                isSingleTaskOpened={isSingleTaskOpened}
                                windowWidth={windowWidth}
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
                                    // taskStatus={taskStatus}
                                />}
                            <NavMenu isNavMenuOpened={isNavMenuOpened}/>
                        <Swiper
                                draggable={true}
                                initialSlide={index}
                                style={{ maxHeight: '100%', top:'70px'}}
                                modules={[EffectFade]}
                                spaceBetween={-55}
                                slidesPerView={1}
                                // allowSlideNext={isSingleTaskOpened ? false : true}
                                // allowSlidePrev={isSingleTaskOpened ? false : true}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}>
                            
                            <SwiperSlide style={{maxHeight:'100%'}}>
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
                            <SwiperSlide style={{width: '310px'}}>
                                <DoneTasks 
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                            </SwiperSlide>
                            <SwiperIndicator/>
                        </Swiper>
                        </>
                    :
                    <div className="task-lists" >
                        <NewTaskBtn
                            isNewTaskFormOpened={isNewTaskFormOpened}
                            setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                            isNavMenuOpened={isNavMenuOpened}
                            isSingleTaskOpened={isSingleTaskOpened}
                            windowWidth={windowWidth}
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
                            // taskStatus={taskStatus}
                        />}
                        <NavMenu isNavMenuOpened={isNavMenuOpened}/>
                        <TodoTasks
                            tasksList={tasksList}
                            isSingleTaskOpened={isSingleTaskOpened}
                            setIsSingleTaskOpened={setIsSingleTaskOpened}
                            isTaskUpdated={isTaskUpdated}
                            setIsTaskUpdated={setIsTaskUpdated}
                            setLoadingNewTask={setLoadingNewTask}
                            isMobile={isMobile}
                        />
                        <ActiveTasks 
                            tasksList={tasksList}
                            isSingleTaskOpened={isSingleTaskOpened}
                            setIsSingleTaskOpened={setIsSingleTaskOpened}
                            isTaskUpdated={isTaskUpdated}
                            setIsTaskUpdated={setIsTaskUpdated}
                            setLoadingNewTask={setLoadingNewTask}
                            isMobile={isMobile}
                        />
                        <DoneTasks 
                            tasksList={tasksList}
                            isSingleTaskOpened={isSingleTaskOpened}
                            setIsSingleTaskOpened={setIsSingleTaskOpened}
                            isTaskUpdated={isTaskUpdated}
                            setIsTaskUpdated={setIsTaskUpdated}
                            setLoadingNewTask={setLoadingNewTask}
                            isMobile={isMobile}
                        />
                    </div>    
                }
                </div>
            }       
        </>
    )
}

export default MainSite