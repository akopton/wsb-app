import React from "react"
import { useEffect, useState } from "react"
import Nav from "./NavMenu"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
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
                </div>
            }       
        </>
    )
}

export default MainSite