import React from "react"
import { useEffect, useState, useCallback, useMemo } from "react"

const SingleTask = ({task, id}:any) => {

    return (
        <li key={id} style={{display: 'flex', flexDirection: 'column'}}>
            <span>Task ID: {task._id}</span>
            <span>Title: {task.title}</span>
            <span>Description: {task.description}</span>
            <span>Asigned person: {task.asignee}</span>
        </li> 
    )
}

export default SingleTask