import React from "react"
import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { BiDownArrow, BiUpArrow, BiRightArrow } from 'react-icons/bi'
import { TTask } from "../interfaces/taskInterface"
import { updateTask } from "../fetches/updateTask"

const ActionsPicker = ( 
    {lists, handleToggleOpen, updatedTask, setIsActionsWindowOpened, isActionsWindowOpened, task, setTasks, windowWidth}: any 
    ) => {

    const {status} = task
    const [isActionPicked, setIsActionPicked] = useState<boolean>(false)
    const [pickedAction, setPickedAction] = useState<{type: string, desc: string}>()
    const [statusToShow, setStatusToShow] = useState<{type: string, desc: string}>({type:'',desc:''})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [actions, setActions] = useState([
        {
            type: 'delete',
            desc: 'Delete task',
        }
    ])
    const handleActions = () => {
        for (const list of lists) {
            if (actions.filter(e => e.type === list.type).length > 0) return
            actions.push({type:list.type, desc:list.title})
        }
        setActions(actions)
    }
 
    useEffect(()=>{
        handleActions()
    },[updatedTask.data])

    useEffect(()=>{
        const statusToShow = actions.filter(action => action.type === updatedTask.data.status)
        setStatusToShow(statusToShow[0])
    },[pickedAction])

    return (
        <div className="actions-picker">
            <div className="picked-action__wrapper">
                <div 
                    className="picked-action"
                    onClick={()=>{
                            setIsActionsWindowOpened(!isActionsWindowOpened)
                        }
                    }
                    // style={isActionsWindowOpened ? 
                    //     {borderTop: 'none'}
                    //     :
                    //     {borderTop: 'none'}
                    // }
                >
                        
                        <span>{isLoading ? 'Loading' : `${statusToShow.desc}`}</span>
                </div>
                {
                    windowWidth > 768 &&
                    <div 
                        className="submit-action"
                    >
                        <BiDownArrow 
                            className="submit-action__btn"
                            style={isActionsWindowOpened ? 
                                {transform:'rotate(180deg)', transition:'.15s ease', color: 'rgb(57, 255, 238)'}
                                :
                                {transition:'.15s ease'}
                            }
                        />
                    </div>
                }
            </div>
            {updatedTask.data.status !== 'expired' &&
                <ul
                    className="actions-window" 
                    style={isActionsWindowOpened ? 
                        {
                            display: windowWidth > 768 ? 'block' : '',
                            height: 'fit-content',
                            bottom: windowWidth < 768 ? '0' : '', 
                            transition: 'bottom .3s ease', 
                            border: windowWidth > 768 ? '1px solid rgb(57, 255, 238)' : ''
                        } 
                        : 
                        {
                            display: windowWidth > 768 ? 'none' : '',
                            bottom: windowWidth < 768 ? `-${actions.length * 28}px` : '', 
                            transition: 'bottom .3s ease'
                        }
                    }
                >
                    {windowWidth < 768 ? <span style={{paddingBottom: '10px'}}>Wybierz status</span> : <></>}
                    {
                        actions.filter(e => e.type !== status && e.type !== 'expired' && e.type !== 'delete').map((action:any, id:any) => {
                            return <li className="action" id='status' data-type={action.type} key={id} onClick={async () => {
                                                    setPickedAction(action)
                                                    setIsActionPicked(true)
                                                    setIsActionsWindowOpened(false)
                                                    // handleUpdate(e)
                                                    setIsLoading(true)
                                                    await updateTask(updatedTask.data, action.type)
                                                            .then((data:any) => data.json())
                                                            .then((res:TTask[]) => {
                                                                setTasks(res)
                                                                setIsLoading(false)
                                                            })
                                                            .catch(() => setError('Something went wrong, try again later.'))
                                                }}>
                                        {action.desc}
                                    </li>
                        })
                    }
                </ul>
            }
            {
                error &&
                <div 
                    className="error"
                >
                    {error}
                </div>
            }
        </div>
    )
}

export default ActionsPicker