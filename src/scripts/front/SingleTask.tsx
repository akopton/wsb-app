import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"

const SingleTask = ({tasksList, task, id, setOpenedTask, openedTask}:any) => {
    

    return (
        <li className={openedTask ? "single-task opened" : "single-task"} key={id}
        >
            {/* <span>Task ID: {task._id}</span> */}
            <span className="single-task__title">{task.title}</span>
            <span className="single-task__desc">{task.description}</span>
            <span className="single-task__date">26.11.2022r. 15:00</span>
        </li> 
    )
}

export default SingleTask