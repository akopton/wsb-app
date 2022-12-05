import React from "react"
import { useContext, useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"

const TodoTasks = ( { setTasksList, tasksList }:any ) => {
    
    return (
        <div className="todo-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">Todo-Tasks</h3>
                <ul className="list">
                {
                    tasksList.map((task:any, id: any) => {
                        if (task.status == 'todo')
                        return <SingleTask 
                            task={task} 
                            key={id} 
                            setTasksList={setTasksList}
                        />
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default TodoTasks