import React from "react"
import {Swiper, SwiperSlide} from 'swiper/react';
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
import 'swiper/css';
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
        setTimeout(()=>getTasksFromDatabase(), 100)
    },[loadingNewTask, isTaskUpdated])

    return (
        <>
            {
                isMainSiteLoading ? 
                <div className="loading-screen">
                    <p>Logging in... Please wait...</p>
                </div> 
                : 
                <div className="main-site" style={isNavMenuOpened ? {overflow: 'hidden'} : undefined}>
                <span style={{position: 'absolute'}}>{loggedUser.login}</span>
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
                            setLoadingNewTask={setLoadingNewTask}
                            // taskStatus={taskStatus}
                        />}
                    <NavMenu isNavMenuOpened={isNavMenuOpened}/>
                    {windowWidth < 768 ?
                        <div className="task-lists">
                        
                        <Swiper
                                style={{border:'1px solid blue',position:'relative',height: '100vh', width: '100vw', zIndex:'11'}}
                                spaceBetween={0}
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}>
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
                    <div className="task-lists">
                        
                                <TodoTasks
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                                <ActiveTasks 
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                                <DoneTasks 
                                    tasksList={tasksList}
                                    isSingleTaskOpened={isSingleTaskOpened}
                                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                                    isTaskUpdated={isTaskUpdated}
                                    setIsTaskUpdated={setIsTaskUpdated}
                                    setLoadingNewTask={setLoadingNewTask}
                                />
                        
                    </div>    
                }
                </div>
            }       
        </>
    )
}

export default MainSite