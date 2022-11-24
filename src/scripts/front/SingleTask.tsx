import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import ActionsPicker from "./ActionsPicker"


const TaskDescription = ({task, taskDescription, isTaskOpened, setIsEditable, isEditable}:any) => {
    // const [isEditable, setIsEditable] = useState<boolean>(false)
    const [newDesc, setNewDesc] = useState<string>(taskDescription)
    const [descLength, setDescLength] = useState<number>(0)
 
    const handleSubmit = (e: any) => {
        setIsEditable(false)
    }

    const getCroppedDescription = () => {
        const dots = '. . .'
        const newNewDesc = newDesc.split(' ')
        if (newNewDesc.length > 35) {
            return newNewDesc.slice(0, 34).concat(dots).join(' ')
        }
    }

    const croppedDescription =  getCroppedDescription()

    return (
        <div>
            {isEditable ?
                <div 
                    className="single-task__desc"
                    style={{ height:'110px'}}
                >
                    <textarea 
                        className="single-task__desc"
                        value={newDesc} 
                        onChange={(e)=>{
                            setNewDesc(e.target.value)
                            setDescLength(newDesc.split(" ").length)
                        }}
                        rows={5}
                        autoFocus={isEditable ? true : false}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        >
                    </textarea>
                    <div 
                        style={{color: 'black', position:'absolute', top:'5px',right:'5px', zIndex:'10',cursor:'pointer', border: '1px solid red'}} 
                        onClick={(e)=>{handleSubmit(e)}}
                    >
                        <span>Gotowe</span>
                    </div>
                </div>
                :
                <div 
                    className="single-task__desc"
                    onClick={()=>{
                        if (isTaskOpened) setIsEditable(true)
                    }}
                    style={{height:'110px'}}
                >
                    {descLength < 35 ? newDesc : croppedDescription}
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
    const [isEditable, setIsEditable] = useState<boolean>(false)

    useEffect(()=>{
        setIsSingleTaskOpened(isTaskOpened)
    },[isTaskOpened])


    const updatedTask = {
        id: _id || taskId,
        title: title || taskTitle,
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
            setIsActionsWindowOpened(false)
            return data
        })
    }

    return (
        <>
        <li 
            className='single-task'
            style={isTaskOpened ? 
                {position:'relative', 
                bottom:'0', left:'0',
                // top: `${window.scrollX}`, left:`${window.scrollY}`, 
                // transform:'translate(-50%, -50%)',
                height: '300px', width:'100%', 
                zIndex:'6', 
                background:'#2c2c2c', color:'white', 
                transition: 'height .3s ease',
                display: 'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:'30px',
                // border:'none',
                // borderTop:'1px solid rgb(57, 255, 238)',
                // borderRadius: '0'
                } 
                : 
                {cursor:'pointer', height: '80px', transition: 'height .3s ease'}}
            key={id}
            onClick={()=>{
                if (!isTaskOpened) {
                    setIsSingleTaskOpened(true)
                setIsTaskOpened(true)
                setTaskStatus(status)
                console.log(updatedTask)
                
                }
                }}>
            {isTaskOpened && 
                <div className="single-task__close-btn" 
                    
                    onClick={()=>{
                        setIsTaskOpened(false)
                        setIsActionsWindowOpened(false)
                        setIsSingleTaskOpened(false)
                    }}
                    style={ isEditable ? 
                        {display:'none'}
                        :
                        {position: 'absolute', zIndex: '50', display:'block', cursor:'pointer', color: 'white'} 
                    }
                /> 
            }
            {isTaskOpened ? <div className="single-task__title" style={{wordWrap: 'break-word', whiteSpace:'break-spaces'}}>{task.title}</div> : <div className="single-task__title" style={{textOverflow: 'ellipsis'}}>{task.title}</div>}
            
            {isTaskOpened && <TaskDescription task={task} taskDescription={taskDescription} isTaskOpened={isTaskOpened} isEditable={isEditable} setIsEditable={setIsEditable}/>}
            <span className="single-task__asignee" style={isTaskOpened ? {display: 'block', color:'white'} : {display: 'none'}}>{task.asignee}</span>
            <span>{task.innerId}</span>
            {/* <span className="single-task__date">26.11.2022r. 15:00</span> */}
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
        {/* <div 
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
        /> */}
        </> 
    )
}

export default SingleTask