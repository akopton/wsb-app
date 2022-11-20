import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { BiDownArrow, BiUpArrow, BiRightArrow } from 'react-icons/bi'

const ActionsPicker = ( {deleteTask, setTaskStatus, setIsActionsWindowOpened, isActionsWindowOpened, updateTaskStatus, taskStatus}: any ) => {

    const [isActionPicked, setIsActionPicked] = useState<boolean>(false)
    const [pickedAction, setPickedAction] = useState<string>()
    const actions = [
        {
            type: 'delete',
            desc: 'Delete task',
        },
        {
            type: 'todo',
            desc: 'Set as todo',
        },
        {
            type: 'active',
            desc: 'Set as active',
        },
        {
            type: 'done',
            desc: 'Set as done',
        }
    ]

    return (
        <div className="single-task__actions-picker">
            <span 
                className="picked-action"
                onClick={()=>setIsActionsWindowOpened(!isActionsWindowOpened)}
            >
                {isActionPicked ? pickedAction : 'Pick an action...'}
            </span>
            {isActionsWindowOpened && 
                <div className="actions-window">
                    <ul>
                        {actions.map((action, id) => {
                            if (action.type == taskStatus) return
                            return <li className="action" key={id} onClick={() => {
                                                    // console.log(e.currentTarget)
                                                    setTaskStatus(action.type)
                                                    setPickedAction(action.desc)
                                                    setIsActionPicked(true)
                                                    setIsActionsWindowOpened(false)
                                                }}>
                                        {action.desc}
                                    </li>
                        })}
                    </ul>
                </div>
            }
            <div 
                className="submit-action"
                onClick={()=>{
                    if (!isActionPicked) setIsActionsWindowOpened(!isActionsWindowOpened)
                    if (isActionPicked) updateTaskStatus()
                }} 
                style={{cursor: 'pointer', height: '100%'}}>
                {isActionsWindowOpened ? 
                    <BiUpArrow style={{width: '100%', height:'100%'}}/> 
                    : isActionPicked ? 
                    <BiRightArrow style={{width: '100%', height:'100%'}} /> 
                    : 
                    <BiDownArrow style={{width: '100%', height:'100%'}}/>}
            </div>
        </div>
    )
}

export default ActionsPicker