import { TTask, TUser } from "./interfaces"
import { useEffect, useState } from "react"

const Popup = ({tasks, setIsPopupOpened, loggedUser}: {tasks:TTask[], setIsPopupOpened:any, loggedUser:TUser}) => {
    const [tasksByDate, setTasksByDate] = useState<TTask[]>([])

    const handleTasksByDate = () => {
        const todaysDate = new Date().getTime()
        const tasksByDate = tasks.filter((task:TTask) => {
            const diffInTime = task.date - todaysDate
            const diffInDays = diffInTime / (1000 * 3600 * 24)
            return diffInDays <= 7 ? task : null
        })
        
        setTasksByDate(tasksByDate)
    }

    useEffect(()=>{
        handleTasksByDate()
    },[])

    return (
        <div className="popup__wrapper">
                    <div className="popup">
                        <div className='popup__close-btn' onClick={()=>setIsPopupOpened(false)}></div>
                        <div>
                            <ul>
                                {
                                    tasks &&
                                    tasksByDate.filter((task:any) => task.asignee._id === loggedUser._id).map((task:any) => {
                                        return (
                                            <li style={{display: 'flex', flexDirection:'column'}}>
                                                <span>{task.title}</span>
                                                <span>{task.asignee.login}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
    )
}

export default Popup