import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"
import SingleTask from "./SingleTask"


const DoneTasks = ({ tasksList, setTasksList }:any) => {

    return (
        <div className="done-tasks list-wrap">
            <div className="wrapper">
                <h3 className="list-title">Done-Tasks</h3>
                <ul className="list">
                {
                    tasksList.map((task:any, id: any) => {
                        if (task.status == 'done')
                        return <SingleTask 
                            task={task} 
                            key={id} 
                            tasksList={tasksList}
                            setTasksList={setTasksList}
                        />
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default DoneTasks