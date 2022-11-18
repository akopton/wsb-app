import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"

const TodoTasks = ( { tasksList }:any ) => {
    const [openedTask, setOpenedTask] = useState<boolean>()
    
    return (
        <div className="todo-tasks">
            <ul  style={{display: 'flex', flexDirection: 'column'}}>
            {
                tasksList.map((task:any, id: any) =>
                    <SingleTask 
                        task={task} 
                        key={id} 
                        openedTask={openedTask} 
                        setOpenedTask={setOpenedTask} 
                        tasksList={tasksList}
                    />
                )
            }
            </ul>
        </div>
    )
}

export default TodoTasks