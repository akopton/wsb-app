import { useState, useReducer, useEffect } from "react"
import { TTask } from "./interfaces"
import SingleTask from "./SingleTask"


const TasksList = ({list, tasks, setTasks, lists, showUserTasks, loggedUser, searchValue}:any) => {

    return (
        <div className="todo-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">{list.title}</h3>
                <ul className="list">
                    {
                        
                        tasks.map((task:any, id:number) => {
                            if (task.status === list.type) {
                                return <SingleTask 
                                            lists={lists}
                                            task={task} 
                                            key={id} 
                                            setTasks={setTasks}
                                        />
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    )
}


export default TasksList