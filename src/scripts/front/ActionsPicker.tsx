import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { BiDownArrow, BiUpArrow, BiRightArrow } from 'react-icons/bi'

const ActionsPicker = ( {handleUpdate, handleToggleOpen, updatedTask, setIsActionsWindowOpened, isActionsWindowOpened, updateTaskStatus, setShowTaskContent, task, setIsTaskOpened, isTaskOpened}: any ) => {

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
        <div className="actions-picker">
            <div 
                className="picked-action"
                onClick={()=>setIsActionsWindowOpened(!isActionsWindowOpened)}
                style={isActionsWindowOpened ? 
                    {borderTop: 'none'}
                    :
                    {borderTop: 'none'}
                }
            >
                <span 
                    style={{lineHeight: '30px'}}
                >
                    {isActionPicked ? pickedAction : 'Pick an action...'}
                </span>
                <div 
                    className="submit-action"
                    onClick={()=>{
                        if (pickedAction) {
                            setIsActionsWindowOpened(!isActionsWindowOpened)
                            updateTaskStatus()
                            setIsTaskOpened(!isTaskOpened)
                            setIsActionsWindowOpened(false)
                            handleToggleOpen(!updatedTask.isOpened)
                        }
                    }} 
                >
                    <BiDownArrow 
                        style={isActionsWindowOpened ? 
                            {transform:'rotate(180deg)', transition:'.3s ease'}
                            : pickedAction ? 
                            {transform:'rotate(270deg)', transition:'.3s ease', color: 'rgb(57, 255, 238)'}
                            :
                            {transition:'.3s ease', color:'white'}
                        }
                    />
                </div>
            </div>
            <ul
                className="actions-window" 
                style={isActionsWindowOpened ? 
                    {height: '90px', transition: 'height .3s ease'} 
                    : 
                    {height: '0', padding: '0 5px', transition: 'height .3s ease'}}
            >
                {actions.map((action, id) => {
                    if (action.type == status) return
                    return <li className="action" id='status' data-type={action.type} key={id} onClick={(e) => {
                                            handleUpdate(e)
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