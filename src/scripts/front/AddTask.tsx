import React from 'react';
import { useEffect, useState } from 'react';

const NewTaskBtn = ( {setIsFormOpened}:any ) => {

    return (
        <div className="add-task__button button--round"
            onClick={()=>setIsFormOpened(true)}
        >
            <p>+</p>
        </div>
    )
}

const NewTaskForm = ( {setIsFormOpened, usersList}:any ) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [asignee, setAsignee] = useState<string>('')



    const addTaskToCollection = () => {
        // fetch post 
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!title) return
        if(!description) return
        console.log(title + '\n' + description)
        // addTaskToCollection()
        setIsFormOpened(false)
    }


    return (
        <>
            <form className='new-task__form' onSubmit={handleSubmit}>
                <input
                    className='title-input'
                    placeholder='Title...'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    className='desc-input'
                    placeholder='Description...'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                    <span className='picked-asignee'>{asignee ? <>Picked asignee: {asignee}</> : <>Pick asignee from list</>}</span>
                    <ul className='asignee-list'>
                        {usersList.map((user:{login:string}, id:number) => 
                            <li
                                key={id}
                                onClick={()=>setAsignee(user.login)}
                                style={{cursor: 'pointer'}} 
                            >
                                {user.login}
                            </li>
                        )}
                    </ul>
                </div>
                {/* <DatePicker /> */}
                <input 
                    type='submit'
                />
            </form>
            <div className='blur'>
                <div className='close-btn button--round' onClick={()=>setIsFormOpened(false)}></div>
            </div>
        </>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
