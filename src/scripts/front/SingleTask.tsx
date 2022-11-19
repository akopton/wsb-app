import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"

const SingleTask = ({tasksList, task, id}:any) => {

    const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false)

    return (
        <>
        <li 
            className={isTaskOpened ? "single-task opened" : 'single-task'} 
            key={id} 
            onClick={()=>{if (!isTaskOpened) setIsTaskOpened(true)}}>
            <div className="single-task__close-btn" 
                onClick={()=>setIsTaskOpened(false)}
                style={isTaskOpened ? 
                    {position: 'absolute', zIndex: '50', display:'block'} 
                    : 
                    {display: 'none'}
                }
            />
            <span className="single-task__title" style={isTaskOpened ? {boxSizing: 'border-box', paddingRight: '20px'} : {width: '100%'}}>{task.title}</span>
            <span className="single-task__desc">{task.description}</span>
            <span className="single-task__asignee" style={isTaskOpened ? {display: 'block'} : {display: 'none'}}>{task.asignee}</span>
            <span className="single-task__date">26.11.2022r. 15:00</span>
        </li>
        <div 
            onClick={()=>setIsTaskOpened(false)}
            style={isTaskOpened ? 
                {position: 'absolute', top:'0', left:'0', background: 'rgba(255, 255, 255, .51)', height: '100%', width: '100%', backdropFilter: 'blur(4px)',zIndex: '4'} 
                : 
                undefined
            }
        />
        </> 
    )
}

export default SingleTask