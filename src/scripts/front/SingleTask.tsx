import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import ActionsPicker from "./ActionsPicker"

const SingleTask = ({task, id, isTaskUpdated, setIsTaskUpdated}:any) => {

    const {_id, title, description, status} = task
    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<any>(_id)
    const [taskTitle, setTaskTitle] = useState<string>(title)
    const [taskDescription, setTaskDescription] = useState<string>(description)
    const [taskStatus, setTaskStatus] = useState<string>(status)
    const [isEditable, setIsEditable] = useState<boolean>()
    const updatedTask = {
        id: id || taskId,
        title: taskTitle,
        description: description || taskDescription,
        status: taskStatus
    }
    const [isActionsWindowOpened, setIsActionsWindowOpened] = useState<boolean>()
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    }

    const deleteTask = () => {
        fetch('http://127.0.0.1:8888/delete-task', settings)
        .then((data)=>{
            setIsTaskUpdated(true)
            return data
        })
    }

    const updateTaskStatus = async () => {
        setIsTaskUpdated(!isTaskUpdated)
       fetch('http://127.0.0.1:8888/update-task', settings)
        .then((data)=>{
            setIsTaskUpdated(true)
            return data
        })
    }

    const handleEdit = () => {
        setIsEditable(true)
    }



    const TaskDescription = () => {
        return <span className="single-task__desc" onDoubleClick={handleEdit} contentEditable={isEditable ? true : false}>{task.description}</span>
    }
    // {if (!isTaskOpened) setIsTaskOpened(true)}}
    return (
        <>
        <li 
            className={isTaskOpened ? "single-task opened" : 'single-task'}
            style={isTaskOpened ? {top: `${(window.innerHeight/2) + 'px'}`, left:`${(window.innerWidth/2) + 'px'}`, transition: 'top 1s ease'} : {cursor:'pointer'}}
            key={id} 
            onClick={(e)=>{
                if (!isTaskOpened)
                    setIsTaskOpened(true)
                setIsEditable(false)
                }}>
            <div className="single-task__close-btn" 
                
                onClick={()=>{
                    setIsTaskOpened(false)
                    setIsActionsWindowOpened(false)
                }}
                style={isTaskOpened ? 
                    {position: 'absolute', zIndex: '50', display:'block'} 
                    : 
                    {display: 'none'}
                }
            />
            <span className="single-task__title" style={isTaskOpened ? {boxSizing: 'border-box', paddingRight: '20px'} : {width: '100%'}}>{task.title}</span>
            <TaskDescription/>
            <span className="single-task__asignee" style={isTaskOpened ? {display: 'block'} : {display: 'none'}}>{task.asignee}</span>
            <span className="single-task__date">26.11.2022r. 15:00</span>
            {isTaskOpened && 
                <ActionsPicker 
                    setTaskStatus={setTaskStatus}
                    setIsActionsWindowOpened={setIsActionsWindowOpened}
                    isActionsWindowOpened={isActionsWindowOpened}
                    updateTaskStatus={updateTaskStatus}
                    taskStatus={taskStatus}
                    deleteTask={deleteTask}
                />
            }
        </li>
        <div 
            onClick={()=>{
                setIsTaskOpened(false)
                setIsActionsWindowOpened(false)
            }}
            style={isTaskOpened ? 
                {position: 'absolute', top:'0', left:'0', background: 'rgba(255, 255, 255, .51)', height: '100%', width: '100%', backdropFilter: 'blur(3px)',zIndex: '10'} 
                : 
                undefined
            }
        />
        </> 
    )
}

export default SingleTask