import { useEffect, useState } from "react"
import useConvertedDate from "../methods/useConvertedDate"
import { TTask } from "../interfaces/taskInterface"
import { updateTask } from "../methods/updateTask"

const SingleTask = ({ task, setTaskToOpen, setIsTaskOpened, searchValue, setTasks, windowWidth }:{ task:TTask, setTaskToOpen:any, setIsTaskOpened:any, searchValue:string, setTasks:any, windowWidth:number }) => {
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const convertedDate = useConvertedDate(task.date, searchValue)
    const {title} = task
    const handleTaskToOpen = (task: TTask) => {
        setIsTaskOpened(true)
        setTaskToOpen(task)
    }

    const handleExpiredTask = async () => {
    const todaysDate = new Date().getTime()
    
        if (todaysDate > task.date) {
            if (task.status !== 'expired' && task.status !== 'done') {
                await updateTask(task, 'expired')
                    .then((data:any) => data.json())
                    .then((res:TTask[]) => {
                        setTasks(res)
                    })
            }
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