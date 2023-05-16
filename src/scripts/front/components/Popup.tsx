import { TTask } from "../interfaces/taskInterface"
import { TUser } from "../interfaces/userInterface"
import { useEffect, useState } from "react"

const Popup = ({tasks, setIsPopupOpened, loggedUser, isPopupOpened}: {tasks:TTask[], setIsPopupOpened:any, loggedUser:TUser, isPopupOpened:any}) => {
    const [tasksByDate, setTasksByDate] = useState<TTask[]>([])

    const handleTasksByDate = () => {
        const todaysDate = new Date().getTime()
        const tasksByDate = tasks.filter((task:TTask) => {
            const diffInTime = task.date - todaysDate
            const diffInDays = diffInTime / (1000 * 3600 * 24)
            return diffInDays <= 7
        })
        
        setTasksByDate(tasksByDate)
    }

    const handleDaysLeft = (date:number) => {
        const todaysDate = new Date().getTime()
        const diffInTime = date - todaysDate
        const diffInDays = diffInTime / (1000 * 3600 * 24)
        return Math.round(diffInDays)
    }

    useEffect(()=>{
        handleTasksByDate()
    },[tasks])

    return (
        <div className="popup__wrapper">
                    <div className="popup">
                        <div className="popup__top-wrap">
                            <span className="title">Your tasks that will expire soon.</span>
                            <div className='close-btn' onClick={()=>setIsPopupOpened(false)}></div>
                        </div>
                        <div className="popup__tasks-list">
                            {
                                tasks &&
                                tasksByDate.filter((task:TTask) => task.asignee._id === loggedUser._id && task.status !== 'delete').map((task:any, id:number) => {
                                    return (
                                        <div key={id} className="task single-task" style={{height: '90px'}}>
                                            <span>{task.innerId}</span>
                                            <span className="single-task__title">{task.title}</span>
                                            <span>Days left: {handleDaysLeft(task.date)}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
    )
}

export default Popup