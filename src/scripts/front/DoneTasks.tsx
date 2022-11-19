import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"


const DoneTasks = ({ tasksList, taskStatus, setTaskStatus, setIsTaskUpdated, setLoadingNewTask }:any) => {

    return (
        <div className="done-tasks list">
            <span>Done-Tasks</span>
            <ul  style={{display: 'flex', flexDirection: 'column'}}>
            {
                tasksList.map((task:any, id: any) => {
                    if (task.status == 'done')
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

export default DoneTasks