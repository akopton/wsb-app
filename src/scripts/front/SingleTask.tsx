import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"
import ActionsPicker from "./ActionsPicker"
import TaskDescription from "./TaskDescription"
// import TaskTitle from "./TaskTitle"
import useConvertedDate from "./useConvertedDate"
import { TTask } from "../interfaces/taskInterface"

const SingleTask = ({ task, setTaskToOpen, setIsTaskOpened, searchValue }:{ task:TTask, setTaskToOpen:any, setIsTaskOpened:any, searchValue:string }) => {
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const convertedDate = useConvertedDate(task.date, searchValue)
    const {title} = task
    const handleTaskToOpen = (task: TTask) => {
        setIsTaskOpened(true)
        setTaskToOpen(task)
    }

    const handleExpiredTask = () => {
    const todaysDate = new Date().getTime()
    
        if (todaysDate > task.date) {
            setIsExpired(true)
        }
        else setIsExpired(false)
    }

    useEffect(()=>{
        handleExpiredTask()
    },[isExpired])

    return (
        <li
            className={isExpired ? 'single-task expired' : 'single-task'}
            onClick={() => handleTaskToOpen(task)}
        >
            <span className="single-task__id">{task.innerId}</span>
            <span className="single-task__title">{title}</span>
            <div className="single-task__bottom-wrap">
                    <span className="task-content__asignee">
                        {task.asignee.firstName} {task.asignee.lastName}
                    </span>
                    <span className="task-content__date">
                        {convertedDate}
                    </span>
            </div>
        </li>
    )
}

export default SingleTask