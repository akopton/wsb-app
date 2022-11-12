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
    const [hidden, setHidden] = useState<boolean>(true)
    const [isNewTaskFormOpened, setIsNewTaskFormOpened] = useState<boolean>(false)
    const [isAccountSettingsPanelOpened, setIsAccountSettingsPanelOpened] = useState<boolean>(false)


    const show = () => {
        setHidden(false)
    }

    useEffect(()=>{
        setTimeout(()=>{
            show()
        }, waitValue)
    },[])



    return (
        <>
            {
                hidden ? 
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
                        />}
                    {isAccountSettingsPanelOpened &&
                        <AccountSettingsPanel 
                            setIsPanelOpened={setIsAccountSettingsPanelOpened}
                        />}
                    <div className="task-lists">
                        <TodoTasks />
                        <ActiveTasks />
                        <DoneTasks />
                    </div>
                </div>
            }       
        </>
    )
}

export default MainSite