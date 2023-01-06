import { useState, useReducer } from "react"
import SingleTask from "./SingleTask"


const TasksList = ({list, tasks, setTasks, lists, areTasksFiltered, loggedUser}:any) => {

    return (
        <div className="todo-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">{list.title}</h3>
                <ul className="list">
                    {
                        areTasksFiltered ? 
                        tasks.filter((task:any) => task.asignee._id === loggedUser._id).map((task:any, id:number) => {
                            if (task.status == list.type) {
                                return <SingleTask 
                                            lists={lists}
                                            task={task} 
                                            key={id} 
                                            setTasks={setTasks}
                                            areTasksFiltered={areTasksFiltered}
                                            loggedUser={loggedUser}
                                        />
                            }
                        })
                        :
                        tasks.map((task:any, id:number) => {
                            if (task.status == list.type) {
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