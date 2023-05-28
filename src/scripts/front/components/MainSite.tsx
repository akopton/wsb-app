import {Swiper, SwiperSlide} from 'swiper/react';
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
import { getData } from '../methods/getData';
import { SettingsSite } from './SettingsSite';
import { TUser } from '../interfaces/userInterface';
import { AdminPanel } from './AdminPanel';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';



// {usersList: any, loggedUser:TUser, setIsLoggedIn: any, setLoggedUser: any, defaultUser: TUser, windowWidth: number}
const MainSite = ( { usersList, loggedUser, setIsLoggedIn, setLoggedUser, defaultUser, windowWidth }: any) => {
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(true)
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TTask[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [slides, setSlides] = useState<number[]>([])
    const [showUserTasks, setShowUserTasks] = useState<boolean>(false)
    const [isNewListWindowOpened, setIsNewListWindowOpened] = useState<boolean>(false)
    const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false)
    const [isAdminPanelOpened, setIsAdminPanelOpened] = useState<boolean>(false)

    const [taskToOpen, setTaskToOpen] = useState<TTask | undefined>(undefined)
    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState<string>('')
    const [filteredTasks, setFilteredTasks] = useState<TTask[]>([])
    
    const [taskDaysLeftToShow, setTaskDaysLeftToShow] = useState<number>()

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
            title: 'Przeterminowane'
        }
    ])

    useEffect(() => {
        setLoadingTasks(true)
        getData('http://127.0.0.1:8888/get-tasks')
        .then((data) => data.json())
        .then((res) => {
            console.log('getting tasks...')
            setTasks(res)
            setLoadingTasks(false)
        })
    }, [])

    useEffect(()=>{
        if (windowWidth > 1420) setIsNavMenuOpened(true)
        else setIsNavMenuOpened(false)
    },[windowWidth])

    return (
        <div className="main-site">
            {
                isPopupOpened && tasks ?
                <Popup 
                    tasks={tasks}
                    loggedUser={loggedUser}
                    setIsPopupOpened={setIsPopupOpened}
                    isPopupOpened={isPopupOpened}
                /> : null
            }
            <span style={{position: 'fixed', zIndex:'10', fontSize: '20px', padding: '10px', width:'100%',left: '0', bottom: '0', background:'#0f0f0f'}}>Zalogowany: {loggedUser.firstName + " " + loggedUser.lastName}</span>
                {!isSettingsOpened && !isAdminPanelOpened ? 
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
                        windowWidth={windowWidth}
                        setIsSettingsOpened={setIsSettingsOpened}
                        isSettingsOpened={isSettingsOpened}
                        setIsAdminPanelOpened={setIsAdminPanelOpened}
                    /> : null
                }
                {isSettingsOpened ? <SettingsSite setIsSettingsOpened={setIsSettingsOpened} loggedUser={loggedUser} setIsLoggedIn={setIsLoggedIn} setLoggedUser={setLoggedUser} defaultUser={defaultUser}/> :
                isAdminPanelOpened ? <AdminPanel setIsAdminPanelOpened={setIsAdminPanelOpened}/> :
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
                    scrollbar={{draggable: true}}
                    grabCursor={true}
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
                                            windowWidth={windowWidth}
                                            
                                        />
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                    <SlideIndicator 
                        slides={slides} 
                        windowWidth={windowWidth}
                    /> 
                </Swiper>}
                {
                    isTaskOpened &&
                    <OpenedTask 
                            setIsTaskOpened={setIsTaskOpened}
                            setTaskToOpen={setTaskToOpen}
                            isTaskOpened={isTaskOpened}
                            lists={lists}
                            task={taskToOpen} 
                            setTasks={setTasks}
                            windowWidth={windowWidth}
                    />
                }
        </div>
    )
}

export default MainSite