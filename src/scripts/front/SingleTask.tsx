import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"
import ActionsPicker from "./ActionsPicker"
import TaskDescription from "./TaskDescription"
import TaskTitle from "./TaskTitle"

const SingleTask = ({task, id, setTasks, lists}:any) => {

    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isActionsWindowOpened, setIsActionsWindowOpened] = useState<boolean>()

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

    const handleSubmit = () => {
        setIsEditable(false)
        if (updatedTask.data.description == initialTaskState.data.description) return
        updateTaskStatus()
    }
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask.data)
    }

    const updateTaskStatus = async () => {
       fetch('http://127.0.0.1:8888/update-task', settings)
        .then(data => data.json())
        .then(res => setTasks(res))
    }

    return (
        <li 
            className='single-task'
            style={updatedTask.isOpened ? 
                    {
                        height: '240px',
                        minHeight:'240px',
                        width: '100%',
                        background:'#1f1f1f', 
                        color:'white', 
                        transition: 'all .3s ease',
                    } 
                : 
                    {
                        cursor:'pointer', 
                        transition: 'all .3s ease', 
                        minHeight:'70px',
                        height: '70px'
                    }
                }
            key={id}
            onClick={()=>{
                if (!updatedTask.isOpened) {
                    handleToggleOpen(true)
                }
                }}
        >
            <div className="single-task__top-wrap">
                <span className="single-task__id">{updatedTask.data.innerId}</span>
                {updatedTask.isOpened && 
                    <>
                        {isEditable ? 

                            <div 
                                className="single-task__submit-change-btn"
                                onClick={handleSubmit}
                            >
                                <span>Gotowe</span>
                            </div>
                            :
                            <div 
                                className="single-task__close-btn" 
                                onClick={()=>{
                                    setIsTaskOpened(false)
                                    handleToggleOpen(false)
                                    setIsActionsWindowOpened(false)
                                }}
                            />
                        }
                    </>
                }
            </div>
            <TaskTitle 
                updatedTask={updatedTask} 
                initialTaskState={initialTaskState}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
            />
            {updatedTask.isOpened && 
                <TaskDescription 
                    handleSubmit={handleSubmit}
                    task={task} 
                    isTaskOpened={updatedTask.isOpened} 
                    isEditable={isEditable} 
                    setIsEditable={setIsEditable}
                    updatedTask={updatedTask} 
                    handleUpdate={handleUpdate}
                    initialTaskState={initialTaskState}
                    handleToggleOpen={handleToggleOpen}
                    updateTaskStatus={updateTaskStatus}
                />
            }
            {updatedTask.isOpened &&
                <div className="single-task__bottom-wrap">
                    <div className="left-side">
                        <span className="task-content__asignee">
                            {updatedTask.data.asignee.login}
                        </span>
                        <span className="task-content__date">
                            {task.date.slice(0,10)}
                        </span>
                    </div>
                    <ActionsPicker
                        lists={lists}
                        updateTaskStatus={updateTaskStatus}
                        setIsActionsWindowOpened={setIsActionsWindowOpened}
                        isActionsWindowOpened={isActionsWindowOpened}
                        setIsTaskOpened={setIsTaskOpened}
                        isTaskOpened={isTaskOpened}
                        task={task}
                        handleToggleOpen={handleToggleOpen}
                        updatedTask={updatedTask}
                        handleUpdate={handleUpdate}
                    />
                </div>
            }
        </li>
    )
}

export default SingleTask