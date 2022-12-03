import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { BiDownArrow, BiUpArrow, BiRightArrow } from 'react-icons/bi'

const ActionsPicker = ( {setShowTaskContent, task, deleteTask, setTaskStatus, setIsActionsWindowOpened, isActionsWindowOpened, updateTaskStatus, taskStatus, setIsTaskOpened, isTaskOpened, setIsSingleTaskOpened}: any ) => {

    const {status} = task
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
            <div 
                className="picked-action"
                onClick={()=>setIsActionsWindowOpened(!isActionsWindowOpened)}
                style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: '8px', borderTop:'none'}}
            >
                <span style={{lineHeight: '30px'}}>{isActionPicked ? pickedAction : 'Pick an action...'}</span>
                <div 
                    className="submit-action"
                    onClick={()=>{
                        if (isActionPicked) {
                            setIsActionsWindowOpened(!isActionsWindowOpened)
                            updateTaskStatus()
                            setIsTaskOpened(!isTaskOpened)
                            setIsActionsWindowOpened(false)
                            setShowTaskContent(false)
                        }
                    }} 
                >
                {isActionsWindowOpened ? 
                    <BiUpArrow /> 
                    : isActionPicked ? 
                    <BiRightArrow style={{color: 'rgb(57, 255, 238)'}}/> 
                    : 
                    <BiDownArrow />
                }
                </div>
            </div>
                
                    <ul className="actions-window" style={isActionsWindowOpened ? {height: '80px', transition: 'all .3s ease'} : {height: '0', padding: '0 5px', transition: 'all .3s ease', borderBottom:'none'}}>
                        {actions.map((action, id) => {
                            if (action.type == status) return
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
    )
}

export default ActionsPicker