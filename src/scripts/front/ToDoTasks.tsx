import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"

const TodoTasks = ( { tasksList }:any ) => {
    
    return (
        <div className="todo-tasks">
            <ul  style={{display: 'flex', flexDirection: 'column'}}>
            {
                tasksList.map((task:any, id: any) =>
                    <SingleTask 
                        task={task} 
                        key={id} 
                        tasksList={tasksList}
                        
                    />
                )
            }
            </ul>
        </div>
    )
}

export default TodoTasks