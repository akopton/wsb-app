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
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false)


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

    const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    return (
        <>
            <form className='new-task__form' onSubmit={handleSubmit}>
                <input
                    className='title-input'
                    placeholder='Title...'
                    name='title'
                    value={title}
                    onChange={handleTitle}
                />
                <textarea 
                    className='desc-input'
                    placeholder='Description...'
                    name='description'
                    value={description}
                    onChange={handleDescription}
                />
                <span>Asigned person:</span><br/>
                <div className='asignee-picker'>
                    <span 
                        className='picked-asignee' 
                        onClick={() => setIsUsersListOpened(!isUsersListOpened)}>
                        {asignee ? 
                            `${asignee}`
                        : 
                            'Pick from list...'
                        }
                    </span>
                    {isUsersListOpened && 
                    <ul className='asignee-list'>
                        {usersList.map((user:{login:string}, id:number) => 
                            <li
                                key={id}
                                onClick={()=>{
                                    setAsignee(user.login)
                                    setIsUsersListOpened(!isUsersListOpened)
                                }}
                                style={{cursor: 'pointer'}} 
                            >
                                {user.login}
                            </li>
                        )}
                    </ul>}
                </div>
                {/* <DatePicker /> */}
                <input 
                    type='submit'
                />
            </form>
            <div className='blur'>
                <div 
                    className='close-btn button--round' 
                    onClick={()=>setIsFormOpened(false)}
                />
            </div>
        </>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
