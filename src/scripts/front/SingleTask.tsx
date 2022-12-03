import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import ActionsPicker from "./ActionsPicker"


const TaskDescription = ({taskDescription, isTaskOpened, setIsEditable, isEditable}:any) => {
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
                    className="task-content__desc"
                    style={{ height:'110px'}}
                >
                    <textarea 
                        className="task-content__desc"
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
                    className="task-content__desc"
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




const SingleTask = ({task, id, isTaskUpdated, setIsTaskUpdated, setIsSingleTaskOpened}:any) => {

    const {_id, title, description, status} = task
    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<any>(_id)
    const [taskTitle, setTaskTitle] = useState<string>(title)
    const [taskDescription, setTaskDescription] = useState<string>(description)
    const [taskStatus, setTaskStatus] = useState<string>(status)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [showTaskContent, setShowTaskContent] = useState<boolean>(false)


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
                {
                height: '230px', 
                zIndex:'6', 
                // background:'#2c2c2c', 
                color:'white', 
                transition: '.3s ease',
                } 
                : 
                {cursor:'pointer', transition: '.3s ease ', height:'70px'}}
            key={id}
            onClick={()=>{
                if (!isTaskOpened) {
                    setIsSingleTaskOpened(true)
                    setIsTaskOpened(true)
                    setTaskStatus(status)
                    console.log(updatedTask)
                    setTimeout(() => {
                        setShowTaskContent(true)
                    }, 50);
                }
                }}>
            <span className="single-task__id">{task.innerId}</span>
            {isTaskOpened && 
                <div className="single-task__close-btn" 
                    
                    onClick={()=>{
                        setIsTaskOpened(false)
                        setIsActionsWindowOpened(false)
                        setIsSingleTaskOpened(false)
                        setShowTaskContent(false)
                    }}
                    style={ isEditable ? 
                        {display:'none'}
                        :
                        {position: 'absolute', zIndex: '10', display:'block', cursor:'pointer', color: 'white'} 
                    }
                /> 
            }
            {isTaskOpened ? 
                <div className="single-task__title" style={{wordWrap: 'break-word', whiteSpace:'break-spaces', lineHeight:'70px'}}>
                    {task.title}
                </div> 
                :
                <div className="single-task__title" style={{textOverflow: 'ellipsis', lineHeight:'70px'}}>
                    {task.title}
                </div>
            }
            {showTaskContent && 
                <div className="task-content">
                    <TaskDescription task={task} taskDescription={taskDescription} isTaskOpened={isTaskOpened} isEditable={isEditable} setIsEditable={setIsEditable}/>
                    <span className="task-content__date">26.11.2022r.</span>
                    <span className="task-content__asignee" style={isTaskOpened ? {display: 'block', color:'white'} : {display: 'none'}}>{task.asignee}</span>
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
                        task={task}
                        setShowTaskContent={setShowTaskContent}
                    />
                </div>
            }
            </li>
        </> 
    )
}

export default SingleTask