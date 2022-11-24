import React, { useCallback } from "react"
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
import 'swiper/css';
import 'swiper/css/scrollbar';
import SingleTask from "./SingleTask";

const { NewTaskBtn, NewTaskForm} = NewTask
const { Hamburger, NavMenu } = Nav

const MainSite = ( { usersList, defaultUser, setIsLoggedIn, setLoggedUser, loggedUser, waitValue }: any) => {
    const [isMainSiteLoading, setIsMainSiteLoading] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [loadingNewTask, setLoadingNewTask] = useState<boolean>(false)
    const [tasksList, setTasksList] = useState<[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [isSingleTaskOpened, setIsSingleTaskOpened] = useState<boolean>(false)
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
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
                <div className="main-site" style={isNavMenuOpened ? {overflow: 'hidden'} : isNewTaskFormOpened ? {overflow:'hidden'} : isSingleTaskOpened ? {overflow:'hidden'} : undefined}>
                <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', left: '20px', top: '10px'}}>Logged: {loggedUser.login}</span>
                <div className="nav-background" style={isSingleTaskOpened ? {display:'none'} : {position: 'fixed', top:'0', left:'0', height:'65px', width: '100%', background: '#red', zIndex:'1'}}></div>

                    {windowWidth < 768 ?
                        <div className="main-site" >
                        <Swiper
                                style={{overflow:'scroll'}}
                                spaceBetween={0}
                                slidesPerView={1}
                                // allowSlideNext={isSingleTaskOpened ? false : true}
                                // allowSlidePrev={isSingleTaskOpened ? false : true}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}>
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
                        </Swiper>
                    </div>
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