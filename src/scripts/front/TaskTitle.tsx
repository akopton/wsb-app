import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"

const TaskTitle = ({updatedTask, task}:any) => {
    // const {data: {title}} = updatedTask
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
        >
            {task.title}
            {/* {updatedTask.title ? updatedTask.title : updatedTask.data.title} */}
        </div>
    )
}

export default TaskTitle