import React from "react"
import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { BiDownArrow, BiUpArrow, BiRightArrow } from 'react-icons/bi'

const ActionsPicker = ( {lists, handleUpdate, handleDelete, handleToggleOpen, updatedTask, setIsActionsWindowOpened, isActionsWindowOpened, updateTaskStatus, setShowTaskContent, task, setIsTaskOpened, isTaskOpened}: any ) => {

    const {status, isOpened} = task
    const [isActionPicked, setIsActionPicked] = useState<boolean>(false)
    const [pickedAction, setPickedAction] = useState<string>()
    const [actions, setActions] = useState([
        {
            type: 'delete',
            desc: 'Delete task',
        }
    ])
    const handleActions = () => {
        for (const list of lists) {
            if (actions.filter(e => e.type === list.type).length > 0) return
            actions.push({type:list.type, desc:`Set as ${list.type}`})
        }
        setActions(actions)
    }
 
    useEffect(()=>{
        handleActions()
    },[])

    return (
        <div className="actions-picker">
            <div 
                className="picked-action"
                onClick={()=>{
                        setIsActionsWindowOpened(!isActionsWindowOpened)
                    }
                }
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
                        if (isActionsWindowOpened) return
                        if (pickedAction) {
                            updateTaskStatus()
                            setIsTaskOpened(!isTaskOpened)
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
                            {transition:'.3s ease'}
                        }
                    />
                </div>
            </div>
            <ul
                className="actions-window" 
                style={isActionsWindowOpened ? 
                    {height: '100px', transition: 'height .3s ease'} 
                    : 
                    {height: '0', padding: '0 5px', transition: 'height .3s ease'}}
            >
                {actions.filter(e => e.type !== status).map((action:any, id:any) => {
                    return <li className="action" id='status' data-type={action.type} key={id} onClick={(e) => {
                                            if (action.type === 'delete') handleDelete()
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