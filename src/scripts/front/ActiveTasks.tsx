import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"



const ActiveTasks = ({ tasksList, setTasksList }:any) => {

    return (
        <div className="active-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">Active-Tasks</h3>
                <ul className="list">
                {
                    tasksList.map((task:any, id: any) => {
                        if (task.status == 'active')
                        return <SingleTask 
                            task={task} 
                            key={id} 
                            setTasksList={setTasksList}
                            tasksList={tasksList}
                        />
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default ActiveTasks