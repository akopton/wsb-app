import React from "react"
import { useContext, useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"

const TodoTasks = ( { tasksList, setIsTaskUpdated, setIsSingleTaskOpened, isSingleTaskOpened }:any ) => {
    
    return (
        <div className="todo-tasks list-wrap">
            <div className="wrapper">
                <span className="list-title">Todo-Tasks</span>
                <ul className="list" style={{position:'relative'}}>
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
        </div>
    )
}

export default TodoTasks