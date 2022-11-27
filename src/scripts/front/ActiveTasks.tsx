import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"



const ActiveTasks = ({ tasksList, taskStatus, setTaskStatus, setIsTaskUpdated, setLoadingNewTask, setIsSingleTaskOpened }:any) => {

    return (
        <div className="active-tasks list-wrap">
            <div className="wrapper">
                <span className="list-title">Active-Tasks</span>
                <ul className="list">
                {
                    tasksList.map((task:any, id: any) => {
                        if (task.status == 'active')
                        return <SingleTask 
                            task={task} 
                            key={id} 
                            setIsTaskUpdated={setIsTaskUpdated}
                            // isSingleTaskOpened={isSingleTaskOpened}
                            setIsSingleTaskOpened={setIsSingleTaskOpened}
                        />
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default ActiveTasks