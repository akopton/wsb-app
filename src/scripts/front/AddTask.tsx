import React from 'react';
import { useEffect, useState } from 'react';

const NewTaskBtn = ( {isFormOpened}:any ) => {

    return (
        <div className="add-task__button button"
            onClick={()=>isFormOpened(true)}
        >
            <p>+</p>
        </div>
    )
}

const NewTaskForm = ( {isFormOpened}:any ) => {
    const [title, setTitle] = useState<string>('')

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        isFormOpened(false)
    }


    return (
        <form className='new-task__form' onSubmit={handleSubmit}>
            <input />
            <input />
            <input 
                type='submit'
            />
        </form>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
