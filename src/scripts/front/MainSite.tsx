import React from "react"
import { useEffect, useState } from "react"
import AccountSettings from "./AccountSettings"
import ActiveTasks from "./ActiveTasks"
import NewTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"
const { NewTaskBtn, NewTaskForm} = NewTask
const { AccountSettingsPanel, AccountSettingsBtn } = AccountSettings

const MainSite = ( { usersList, defaultUser, setIsLoggedIn, setLoggedUser, loggedUser, waitValue }: any) => {
    const [isMainSiteLoading, setIsMainSiteLoading] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [isAccountSettingsPanelOpened, setIsAccountSettingsPanelOpened] = useState<boolean>(false)
    const [tasksList, setTasksList] = useState<[]>([])

    const getTasksFromDatabase = async () => {
        fetch('http://127.0.0.1:8888/get-tasks')
        .then((data?) => data.json())
        .then((res?) => {
            console.log('getting tasks...')
            setTasksList(res)
            setIsMainSiteLoading(false)
        })
    }


    const deleteAllTasks = () => {
        fetch('http://127.0.0.1:8888/delete-all', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({})
        }).then((data) => data)
        setTasksList([])
    }

    useEffect(()=>{
        setIsMainSiteLoading(true)
        setTimeout(()=>getTasksFromDatabase(), 180)
    },[tasksList.length])

    return (
        <>
            {
                isMainSiteLoading && !tasksList.length ? 
                <div className="loading-screen">
                    <p>Logging in... Please wait...</p>
                </div> 
                : 
                <div className="main-site">
                    <div className="control-buttons">
                        <NewTaskBtn
                            setIsFormOpened={setIsNewTaskFormOpened}
                        />
                        <AccountSettingsBtn />
                    </div>
                    {isNewTaskFormOpened && 
                        <NewTaskForm 
                            setIsFormOpened={setIsNewTaskFormOpened}
                            usersList={usersList}
                            tasksList={tasksList}
                            setTasksList={setTasksList}
                        />}
                    {isAccountSettingsPanelOpened &&
                        <AccountSettingsPanel 
                            setIsPanelOpened={setIsAccountSettingsPanelOpened}
                        />}
                    <div className="task-lists">
                        <TodoTasks
                            tasksList={tasksList}
                        />
                        <ActiveTasks />
                        <DoneTasks />
                        <button onClick={()=>deleteAllTasks()}>delete all</button>
                    </div>
                </div>
            }       
        </>
    )
}

export default MainSite