import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"

const TaskTitle = ({updatedTask, initialTaskState, isEditable, setIsEditable}:any) => {
    const {data: {title}} = updatedTask
    return (
        <div 
            className="single-task__title" 
            style={updatedTask.isOpened ?
                    {
                        overflowX:'scroll', 
                        display:'flex'
                    }
                : 
                    {
                        overflow:'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis'
                        
                    }
                }    
                onClick={e=>console.log(title)}
        >
            {/* {isEditable ? 
                <input onClick={()=>setIsEditable(false)} onChange={(e)=>console.log(e.target.value)} value={initialTaskState.data.title}/>
                :
                <span onClick={()=>setIsEditable(true)}>{updatedTask.data.title}</span>
            } */}
            {title}
        </div>
    )
}

export default TaskTitle