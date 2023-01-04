import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import NewTask from "./AddTask"
import SlideIndicator from "./SlideIndicator";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import SingleTask from "./SingleTask";
import { EffectFade } from 'swiper';
import TasksList from "./TasksList";
const { NewTaskBtn, NewTaskForm} = NewTask
const { Hamburger, NavMenu } = Nav




const MainSite = ( { usersList, loggedUser, TUser }: any) => {
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [tasks, setTasks] = useState<[]>([])
    const [isNavMenuOpened, setIsNavMenuOpened] = useState<boolean>(false)
    const [slides, setSlides] = useState<number[]>([])
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [lists, setLists] = useState<{}[]>([
        {
            type: 'todo',
            title: 'Todo Tasks'
        },
        {
            type: 'active',
            title: 'Active Tasks'
        },
        {
            type: 'done',
            title: 'Done Tasks'
        }, 
    ])

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
            setTasks(res)
            setLoadingTasks(false)
        })
    }

    useEffect(()=>{
        getTasksFromDatabase()
    },[])



    const handleNewTasksList = () => {
        setLists([...lists, {
            type:'lol',
            title: 'Lol Tasks'
        }])
        setSlides([...slides, 0])
    }



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
                        tasks={tasks}
                        setTasks={setTasks}
                        loggedUser={loggedUser}
                    />
                }
                <NavMenu isNavMenuOpened={isNavMenuOpened}/>
                <Swiper
                    style={{height:'100vh', top:'70px', display:'flex'}}
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
                                            list={list}
                                            lists={lists}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                        />
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                    <SwiperSlide>
                        <div className="todo-tasks list-wrap">
                            <div className="wrapper">
                                <div onClick={handleNewTasksList} style={{position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '100px'}}>+</div>
                            </div>
                        </div>
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