import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"

const TaskDescription = ({updatedTask, setIsEditable, isEditable, handleUpdate, handleSubmit}:any) => {

    return (
        <>
            {isEditable ? 
                <textarea 
                    className="opened-task__desc"
                    id='description'
                    name="description"
                    value={updatedTask.data.description ? updatedTask.data.description : ''}
                    onBlur={handleSubmit}
                    onChange={handleUpdate}
                        rows={5}
                        autoFocus={isEditable ? true : false}
                        onFocus={(e) => {
                                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                                e.currentTarget.scrollTop = e.currentTarget.scrollHeight
                            }
                        }
                    >
                </textarea>
                :
                <div
                    className="opened-task__desc"
                    onClick={()=>setIsEditable(true)}
                >
                    {updatedTask.data.description}
                    {/* {updatedTask.data.description} */}
                </div>
            }
        </>
    )
}

export default TaskDescription