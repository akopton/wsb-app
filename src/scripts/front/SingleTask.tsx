import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import ActionsPicker from "./ActionsPicker"


const TaskDescription = ({task, taskDescription, isTaskOpened}:any) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [newDesc, setNewDesc] = useState<string>(taskDescription)
    const handleSubmit = (e: any) => {
        setIsEditable(false)
    }
    return (
        <div>
            {isEditable ?
                <div style={{
                    position:'absolute',
                    top: '0',
                    left: '0',
                    height: '100%',
                    width: '100%',
                    zIndex: '1000'
                }}>
                    <textarea 
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        defaultValue={task.description} 
                        onChange={(e)=>setNewDesc(e.target.value)}
                        >
                    </textarea>
                    <div style={{color: 'black', position:'absolute', top:'5px',right:'5px', zIndex:'10',cursor:'pointer', border: '1px solid red'}} onClick={(e)=>{handleSubmit(e)}}>Gotowe</div>
                </div>
                :
                <div 
                    onClick={()=>{
                        if (isTaskOpened) setIsEditable(true)
                    }}
                    style={{height: '50px'}}
                >
                    {newDesc}
                </div>
            }
        </div>
    )
}




const SingleTask = ({task, id, isTaskUpdated, setIsTaskUpdated, setIsSingleTaskOpened, isMobile}:any) => {

    const {_id, title, description, status} = task
    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<any>(_id)
    const [taskTitle, setTaskTitle] = useState<string>(title)
    const [taskDescription, setTaskDescription] = useState<string>(description)
    const [taskStatus, setTaskStatus] = useState<string>(status)
    const [isEditable, setIsEditable] = useState<boolean>()

    useEffect(()=>{
        setIsSingleTaskOpened(isTaskOpened)
    },[isTaskOpened])


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



    

    // {if (!isTaskOpened) setIsTaskOpened(true)}}
    return (
        <>
        <li 
            className='single-task'
            style={isTaskOpened ? 
                {position:'absolute', 
                top: '50%', left:'50%', 
                transform:'translate(-50%, -50%)' ,
                height: '100vh', width:'100vw', 
                zIndex:'6', 
                background:'#2c2c2c', color:'white', 
                transition: 'height .3s ease',
                display: 'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:'30px',
                border:'none'
                } 
                : 
                {cursor:'pointer', height: '150px', transition: 'height .3s ease'}}
            key={id}
            onClick={()=>{
                if (!isTaskOpened) {
                    setIsSingleTaskOpened(true)
                    setIsTaskOpened(true)
                }
                }}>
            <div className="single-task__close-btn" 
                
                onClick={()=>{
                    setIsTaskOpened(false)
                    setIsActionsWindowOpened(false)
                    setIsSingleTaskOpened(false)
                }}
                style={isTaskOpened ? 
                    {position: 'absolute', zIndex: '50', display:'block', cursor:'pointer', color: 'white'} 
                    : 
                    {display: 'none'}
                }
            />
            <div className="single-task__title" style={{justifySelf:''}}>{task.title}</div>
            <TaskDescription task={task} taskDescription={taskDescription} isTaskOpened={isTaskOpened}/>
            <span className="single-task__asignee" style={isTaskOpened ? {display: 'block', color:'white'} : {display: 'none'}}>{task.asignee}</span>
            <span className="single-task__date">26.11.2022r. <br/>15:00</span>
            {isTaskOpened && 
                <ActionsPicker 
                    setTaskStatus={setTaskStatus}
                    setIsActionsWindowOpened={setIsActionsWindowOpened}
                    isActionsWindowOpened={isActionsWindowOpened}
                    updateTaskStatus={updateTaskStatus}
                    taskStatus={taskStatus}
                    deleteTask={deleteTask}
                    setIsTaskOpened={setIsTaskOpened}
                    isTaskOpened={isTaskOpened}
                    setIsSingleTaskOpened={setIsSingleTaskOpened}
                />
            }
        </li>
        <div 
            className="single-task__blur"
            onClick={()=>{
                setIsTaskOpened(false)
                setIsActionsWindowOpened(false)
                setIsSingleTaskOpened(false)
            }}
            // style={isTaskOpened ? 
            //      
            //     : 
            //     isMobile ? {di}
            // }
            style={isMobile ? {display:'none'} : isTaskOpened ? {position: 'absolute', top:'-70px', left:'0', background: 'rgba(255, 255, 255, .51)', height: '100%', width: '100%', backdropFilter: 'blur(3px)',zIndex: '0'} : undefined}
        />
        </> 
    )
}

export default SingleTask