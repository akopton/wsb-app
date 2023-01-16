import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"
import ActionsPicker from "./ActionsPicker"
import TaskDescription from "./TaskDescription"
// import TaskTitle from "./TaskTitle"
import useConvertedDate from "./useConvertedDate"
import { TTask } from "../interfaces/taskInterface"
import { updateTask } from "../fetches/updateTask"

const OpenedTask = ({task, id, setTasks, lists, isPopupOpened, setTaskToOpen, setIsTaskOpened, isTaskOpened, windowWidth}:any) => {

    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isActionsWindowOpened, setIsActionsWindowOpened] = useState<boolean>(false)
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const convertedDate = useConvertedDate(task.date)
    const fullName = `${task.asignee.firstName} ${task.asignee.lastName}`
    const [showContent, setShowContent] = useState<boolean>(false)
    

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

    const handleSubmit = async (data:TTask) => {
        setIsEditable(false)
        if (updatedTask.data.description == initialTaskState.data.description) return
        await updateTask(data)
                .then(data => data.json())
                .then(res => {
                    setTasks(res)
                })
    }

    useEffect(()=>{
        handleToggleOpen(isTaskOpened)
        setTimeout(() => {
            setShowContent(true)
        }, 350);
    },[isTaskOpened])

    return (
        <>
            <div
                className='opened-task'
                style={
                    !updatedTask.isOpened ?
                    {
                        height: '0',
                        minHeight: '0',
                        width: '0',
                        minWidth: '0',
                        transition: 'all .3s ease'
                    }
                    : windowWidth < 768 ?
                    {
                        height: '100%',
                        minHeight: '100%',
                        width: '100%',
                        minWidth: '100%',
                        transition: 'all .3s ease',
                        overflow: 'hidden',
                    }
                    :
                    {
                        height: '60%',
                        minHeight: '60%',
                        width: '80%',
                        minWidth: '80%',
                        transition: 'all .3s ease'
                    }
                }
                key={id}
                onClick={(e)=>{
                    setTaskToOpen(task)
                    if (isPopupOpened) return
                    // if (!updatedTask.isOpened) {
                        // handleToggleOpen(true)
                    // }
                    }}
            >
                {
                    showContent &&
                    <>
                        <div className="opened-task__top-wrap">
                            <span className="opened-task__id">{task.innerId}</span>
                            {
                                !isEditable ? 
                                    <div 
                                        className="opened-task__close-btn" 
                                        onClick={()=> {
                                            setTimeout(()=>{
                                                setIsTaskOpened(false)
                                            },100)
                                            setShowContent(false)
                                            handleToggleOpen(false)
                                        }}
                                        />
                                        :
                                        <div
                                            className="opened-task__submit-changes"
                                            onClick={() => {
                                                handleSubmit(updatedTask.data)
                                                setIsEditable(false)
                                            }}
                                        >
                                        Submit
                                    </div>
                            }
                        </div>
                        <div className="opened-task__content">
                            <span className="opened-task__title">{task.title}</span>
                            <ActionsPicker
                                isExpired={isExpired}
                                lists={lists}
                                updateTask={updateTask}
                                setIsActionsWindowOpened={setIsActionsWindowOpened}
                                isActionsWindowOpened={isActionsWindowOpened}
                                task={task}
                                handleToggleOpen={handleToggleOpen}
                                updatedTask={updatedTask}
                                handleUpdate={handleUpdate}
                                // handleDelete={handleDelete}
                                handleSubmit={handleSubmit}
                                setTasks={setTasks}
                                windowWidth={windowWidth}
                            />
                            <>
                                <span style={{marginBottom: '-10px'}}>Opis</span>
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
                    </>
                }
            </div>
            {
                updatedTask.isOpened &&
                <div className="blur"/>
            }
        </>
    )
}

export default OpenedTask