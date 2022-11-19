import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"



const ActiveTasks = ({ tasksList, taskStatus, setTaskStatus, setIsTaskUpdated, setLoadingNewTask }:any) => {

    return (
        <div className="active-tasks list">
            <span>Active-Tasks</span>
            <ul  style={{display: 'flex', flexDirection: 'column'}}>
            {
                tasksList.map((task:any, id: any) => {
                    if (task.status == 'active')
                    return <SingleTask 
                        task={task} 
                        key={id} 
                        tasksList={tasksList}
                        setTaskStatus={setTaskStatus}
                        taskStatus={taskStatus}
                        setIsTaskUpdated={setIsTaskUpdated}
                        setLoadingNewTask={setLoadingNewTask}
                    />
                })
            }
            </ul>
        </div>
    )
}

export default ActiveTasks