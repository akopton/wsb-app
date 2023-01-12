import { useState, useReducer, useEffect } from "react"
import { TTask } from "../interfaces/taskInterface"
import SingleTask from "./SingleTask"


const TasksList = ({list, tasks, showUserTasks, loggedUser, searchValue, setTaskToOpen, setIsTaskOpened, setTasks}:any) => {

    const removePolishLetters = (str:string) => {
        return str.toLowerCase().replace(/ą/g, 'a')
          .replace(/ć/g, 'c')
          .replace(/ę/g, 'e')
          .replace(/ł/g, 'l')
          .replace(/ń/g, 'n')
          .replace(/ó/g, 'o')
          .replace(/ś/g, 's')
          .replace(/ź/g, 'z')
          .replace(/ż/g, 'z')
      }

    const searchByInputValue = (task:TTask, searchValue:string) => {
        let {title, innerId, asignee:{firstName, lastName}} = task
        let fullName = `${firstName} ${lastName}`
        fullName = removePolishLetters(fullName)
        title = removePolishLetters(title)
        searchValue = removePolishLetters(searchValue)
        innerId = removePolishLetters(innerId)
        return title.includes(searchValue) ? title.includes(searchValue) 
                : innerId.includes(searchValue) ? innerId.includes(searchValue)
                : fullName.includes(searchValue)
    }

    return (
        <div className="todo-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">{list.title}</h3>
                <ul className="list">
                    {
                        searchValue ? 
                        tasks.filter((task:any) => searchByInputValue(task, searchValue)).map((task:any, id:number) => {
                            if (task.status === list.type) {
                                return <SingleTask 
                                            setTaskToOpen={setTaskToOpen}
                                            setIsTaskOpened={setIsTaskOpened}
                                            task={task} 
                                            key={id}
                                            searchValue={searchValue}
                                            setTasks={setTasks}
                                        />
                            }
                        })
                        :
                        showUserTasks ? 
                        tasks.filter((task:any) => task.asignee._id === loggedUser._id).map((task:any, id:number) => {
                            if (task.status === list.type) {
                                return <SingleTask 
                                            setTaskToOpen={setTaskToOpen}
                                            setIsTaskOpened={setIsTaskOpened}
                                            task={task} 
                                            key={id}
                                            searchValue={searchValue}
                                            setTasks={setTasks}
                                        />
                            }
                        })
                        :
                        tasks.map((task:any, id:number) => {
                            if (task.status === list.type) {
                                return <SingleTask 
                                            setTaskToOpen={setTaskToOpen}
                                            setIsTaskOpened={setIsTaskOpened}
                                            task={task} 
                                            key={id}
                                            searchValue={searchValue}
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