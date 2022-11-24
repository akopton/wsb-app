import React from "react"
import { useContext, useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"

const TodoTasks = ( { tasksList, setIsTaskUpdated, setLoadingNewTask, taskMethods, setIsSingleTaskOpened, isSingleTaskOpened }:any ) => {
    
    return (
        <div className="todo-tasks list-wrap">
            <span>Todo-Tasks</span>
            <ul className="list" >
            {
                tasksList.map((task:any, id: any) => {
                    if (task.status == 'todo')
                    return <SingleTask 
                        task={task} 
                        key={id} 
                        setIsTaskUpdated={setIsTaskUpdated}
                        isSingleTaskOpened={isSingleTaskOpened}
                        setIsSingleTaskOpened={setIsSingleTaskOpened}
                    />
                })
            }
            </ul>
        </div>
    )
}

export default TodoTasks