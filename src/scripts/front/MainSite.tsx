import React from "react"
import { useEffect, useState } from "react"
import ActiveTasks from "./ActiveTasks"
import AddTask from "./AddTask"
import DoneTasks from "./DoneTasks"
import TodoTasks from "./ToDoTasks"

const MainSite = ( { defaultUser, setIsLoggedIn, setLoggedUser, loggedUser, waitValue }: any) => {
    const [hidden, setHidden] = useState(true)

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
                    <div className="main-site__account-button">

                    </div>
                    <AddTask />
                    <TodoTasks />
                    <ActiveTasks />
                    <DoneTasks />
                </div>
            }       
        </>
    )
}

export default MainSite