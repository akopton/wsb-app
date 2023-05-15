const TaskDescription = ({updatedTask, setIsEditable, isEditable, handleUpdate, handleSubmit}:any) => {

    return (
        <>
            {isEditable ? 
                <textarea 
                    className="opened-task__desc"
                    id='description'
                    name="description"
                    value={updatedTask.data.description ? updatedTask.data.description : ''}
                    onBlur={() => handleSubmit(updatedTask.data)}
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
                >
                    {updatedTask.data.description}
                </div>
            }
        </>
    )
}

export default TaskDescription