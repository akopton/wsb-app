import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"
import ActionsPicker from "./ActionsPicker"
import TaskDescription from "./TaskDescription"
// import TaskTitle from "./TaskTitle"
import useConvertedDate from "./useConvertedDate"

const OpenedTask = ({task, id, setTasks, lists, isPopupOpened, setTaskToOpen, setIsTaskOpened}:any) => {

    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isActionsWindowOpened, setIsActionsWindowOpened] = useState<boolean>(false)
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const convertedDate = useConvertedDate(task.date)
    const fullName = `${task.asignee.firstName} ${task.asignee.lastName}`

    const initialTaskState = {
        data: {
            ...task
        },
        isOpened: false
    }
    
    const taskUpdateReducer = (state:any, action:any) => {
        switch (action.type) {
            case 'update':
                const {data} = state
                return {
                    ...state,
                    data: {
                        ...data,
                        [action.field]: action.payload
                    }
                }
                case 'toggleOpen':
                    return {
                        ...state,
                        [action.field]: action.payload
                    }
                    default:
                        return state
                    }
                }
                
    const [updatedTask, dispatch] = useReducer(taskUpdateReducer, initialTaskState)

    const handleUpdate = (e:any) => {
        dispatch({
            type:'update', 
            field: e.target.id,
            payload: e.target.value ? e.target.value : e.target.getAttribute('data-type')
        })
    }

    const handleToggleOpen = (value:boolean) => {
        dispatch({
            type:'toggleOpen',
            field: 'isOpened',
            payload: value
        })
    }

    const handleSubmit = async () => {
        setIsEditable(false)
        if (updatedTask.data.description == initialTaskState.data.description) return
        await updateTask()
    }

    // const handleDelete = () => {
    //     const settings = {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(task)
    //     }
    //     fetch('http://127.0.0.1:8888/delete-task', settings)
    //     .then(data => data.json())
    //     .then(res => {
    //         console.log(res)
    //         setTasks(res)
    //     })
    // }
    
    const updateTask = async () => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask.data)
        }
       fetch('http://127.0.0.1:8888/update-task', settings)
        .then(data => data.json())
        .then(res => {
            setTasks(res)
        })
    }

    // const handleExpiredTask = () => {
    //     const todaysDate = new Date().getTime()
        
    //     if (todaysDate > task.date) {
    //         setIsExpired(true)
    //     }
    //     else setIsExpired(false)
    // }

    // useEffect(()=>{
    //     handleExpiredTask()
    // },[isExpired])

    return (
        <div 
            className='opened-task'
            key={id}
            onClick={(e)=>{
                setTaskToOpen(task)
                if (isPopupOpened) return
                // if (!updatedTask.isOpened) {
                    // handleToggleOpen(true)
                // }
                }}
        >
            <div className="opened-task__top-wrap">
                <span className="opened-task__id">{task.innerId}</span>
                {
                    !isEditable ? 
                        <div 
                            className="opened-task__close-btn" 
                            onClick={()=> {
                                if (isEditable) return
                                setIsTaskOpened(false)
                            }}
                        />
                    :
                        <div
                            className="opened-task__submit-changes"
                            onClick={()=>setIsEditable(false)}
                        >
                            Submit
                        </div>
                }
            </div>
            <div className="opened-task__content">
                <span className="opened-task__title">{task.title}</span>
                <>
                    Opis
                    <TaskDescription 
                        updatedTask={updatedTask}
                        setIsEditable={setIsEditable}
                        isEditable={isEditable}
                        handleUpdate={handleUpdate}
                        handleSubmit={handleSubmit}
                    />
                </>
                <div className="asigned-person">
                    <span>Asigned person:</span>
                    <span>{fullName}</span>
                </div>
                <span>{convertedDate}</span>
            </div>
        </div>
    )
}

export default OpenedTask