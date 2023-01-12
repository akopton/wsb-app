import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { useEffect, useState } from "react"
import SlideIndicator from "./SlideIndicator";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper';
import TasksList from "./TasksList";
import { TTask } from '../interfaces/taskInterface';
import Popup from './Popup';
import MainNav from './MainNav';
import OpenedTask from './OpenedTask';
import { getTasksFromDatabase } from '../fetches/getTasks';




const MainSite = ( { usersList, loggedUser, setIsLoggedIn, setLoggedUser, defaultUser }: any) => {
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(true)
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TTask[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [slides, setSlides] = useState<number[]>([])
    const [showUserTasks, setShowUserTasks] = useState<boolean>(false)

    const [taskToOpen, setTaskToOpen] = useState<TTask | undefined>(undefined)
    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState<string>('')
    const [filteredTasks, setFilteredTasks] = useState<TTask[]>([])

    const [lists, setLists] = useState<{}[]>([
        {
            type: 'todo',
            title: 'Do zrobienia'
        },
        {
            type: 'active',
            title: 'W trakcie'
        },
        {
            type: 'done',
            title: 'Zrobione'
        },
        {
            type: 'expired',
            title: 'Po terminie'
        }
    ])

    const handleNewTasksList = () => {
        setLists([...lists, {
            type:'lol',
            title: 'Lol Tasks'
        }])
        setSlides([...slides, 0])
    }
    
    useEffect(()=>{
        getTasksFromDatabase()
        .then((data) => data.json())
        .then((res) => {
            console.log('getting tasks...')
            setTasks(res)
            setLoadingTasks(false)
        })
    },[])

    return (
        <div className="main-site">
            {
                isPopupOpened &&
                <Popup 
                    tasks={tasks}
                    loggedUser={loggedUser}
                    setIsPopupOpened={setIsPopupOpened}
                    isPopupOpened={isPopupOpened}
                />
            }
            <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', left: '10px', bottom: '10px'}}>Logged: {loggedUser.login}</span>
                <MainNav 
                    isNewTaskFormOpened={isNewTaskFormOpened}
                    setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                    isNavMenuOpened={isNavMenuOpened}
                    setIsNavMenuOpened={setIsNavMenuOpened}
                    usersList={usersList}
                    tasks={tasks}
                    setTasks={setTasks}
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                    defaultUser={defaultUser}
                    setIsLoggedIn={setIsLoggedIn}
                    setShowUserTasks={setShowUserTasks}
                    // handleSearch={handleSearch}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                    setFilteredTasks={setFilteredTasks}
                    filteredTasks={filteredTasks}
                />
                <Swiper
                    style={{height:'100vh', display:'flex'}}
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
                    onSlideChange={() => {console.log('slide change')}}
                    onSwiper={(swiper) => {
                        setSlides(Array(swiper.wrapperEl.childElementCount).fill(0))
                    }}
                >
                    {
                        lists.map((list, id) => {
                            return (
                                <SwiperSlide key={id}>
                                    {loadingTasks ? 
                                        <div 
                                            className="loader"
                                            style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}
                                        />
                                    :
                                        <TasksList
                                            setIsTaskOpened={setIsTaskOpened}
                                            setTaskToOpen={setTaskToOpen}
                                            list={list}
                                            lists={lists}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            showUserTasks={showUserTasks}
                                            loggedUser={loggedUser}
                                            // searchResults={searchResults}
                                            searchValue={searchValue}
                                            filteredTasks={filteredTasks}
                                            
                                        />
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                    <SwiperSlide>
                        <div className="todo-tasks list-wrap">
                            <div className="wrapper">
                                <div 
                                    className='add-new-list-btn'
                                    onClick={handleNewTasksList} 
                                    style={{
                                        position: 'absolute', 
                                        top: '35%', 
                                        left: '50%', 
                                        transform: 'translate(-50%,-50%)', 
                                        fontSize: '100px', 
                                        cursor:'pointer', 
                                        height: '100px', 
                                        width:'100px', 
                                        borderRadius:'50%', 
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SlideIndicator 
                        slides={slides} 
                    /> 
                </Swiper>
                {
                    isTaskOpened &&
                    <OpenedTask 
                            setIsTaskOpened={setIsTaskOpened}
                            setTaskToOpen={setTaskToOpen}
                            isTaskOpened={isTaskOpened}
                            lists={lists}
                            task={taskToOpen} 
                            setTasks={setTasks}
                    />
                }
        </div>
    )
}

export default MainSite