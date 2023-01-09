import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"

const TaskTitle = ({title}:any) => {
    // const {data: {title}} = updatedTask
    return (
        <div 
            className="single-task__title" 
            style={
                    {
                        overflow:'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis'
                        
                    }
                }    
        >
            {title}
            {/* {updatedTask.title ? updatedTask.title : updatedTask.data.title} */}
        </div>
    )
}

export default TaskTitle