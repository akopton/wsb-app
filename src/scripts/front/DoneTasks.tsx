import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"


const DoneTasks = ({ tasksList, taskStatus, setTaskStatus, setIsTaskUpdated, setLoadingNewTask, setIsSingleTaskOpened }:any) => {

    return (
        <div className="done-tasks list-wrap">
            <span>Done-Tasks</span>
            <ul className="list">
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
                        setIsSingleTaskOpened={setIsSingleTaskOpened}
                    />
                })
            }
            </ul>
        </div>
    )
}

export default DoneTasks