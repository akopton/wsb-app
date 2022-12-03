import { isDocument } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { BiDownArrow } from 'react-icons/bi'

const NewTaskBtn = ( {isNavMenuOpened,isSingleTaskOpened,isNewTaskFormOpened, setIsNewTaskFormOpened, isAccountSettingsPanelOpened, windowWidth, }:any ) => {

    // const isMobile = windowWidth < 768

    return (
        <div 
            className="add-task__button button--round"
            style={isNavMenuOpened ? 
                { position:'absolute', zIndex: '1'} 
                : isNewTaskFormOpened ? 
                {transform: 'rotate(45deg)', zIndex: '50', right: '15px', transition: 'ease .2s'} 
                : isSingleTaskOpened ? 
                {zIndex:'4'} 
                 :
                {zIndex:'10'} 
                }
            onClick={()=>setIsNewTaskFormOpened(!isNewTaskFormOpened)}
        >
        </div>
    )
}

const NewTaskForm = ( {setIsFormOpened, usersList, setLoadingNewTask, loggedUser }:any ) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [asignee, setAsignee] = useState<string>('')
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false)
    const [generatedId, setGeneratedId] = useState<number>()
    const [updatedId, setUpdatedId] = useState<number>()

    const getIdForGenerator = async () => {
        fetch('http://127.0.0.1:8888/get-id')
        .then((data) => data.json())
        .then((res) => {
            const {id} = res
            setGeneratedId(id)
            setUpdatedId(id+1)
        })
    }

    const updateIdForGenerator = async () => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({updatedId})
        }
        fetch('http://127.0.0.1:8888/update-id', settings)
            .then((data) => data)
    }

    useEffect(()=>{
        console.log(loggedUser)
        setTimeout(() => {
            getIdForGenerator() 
        }, 250)
    },[])

    const {login} = loggedUser
    const newTask = {
        innerId: `PROJECT-${generatedId}`,
        title: title,
        description: description,
        asignee: asignee || login,
        status: 'todo',
    }

    

    const addTaskToDatabase = async () => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }
        fetch('http://127.0.0.1:8888/tasks', settings)
        .then((data) => data)
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!title) return
        if(!description) return
        await addTaskToDatabase()
        await updateIdForGenerator()
        setIsFormOpened(false)
        setLoadingNewTask(true)
        // setUpdatedId()
    }

    const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    return (
        <>
            <form 
                className='new-task__form' 
                onSubmit={handleSubmit}
            >
                <input
                    className='form__title-input --margin'
                    placeholder='Title...'
                    name='title'
                    value={title}
                    onChange={handleTitle}
                />
                <textarea 
                    className='form__desc-input --margin'
                    placeholder='Description...'
                    name='description'
                    value={description}
                    onChange={handleDescription}
                />
                
                <div className='form__asignee-picker asignee-picker --margin'>
                    <span style={{ display: 'block'}} className='--margin'>Asigned person:</span>
                    <div className='asignee-picker__custom-list custom-list'>
                        <p 
                            className='custom-list__picked-asignee'
                            onClick={() => setIsUsersListOpened(!isUsersListOpened)}>
                            {asignee ? 
                                `${asignee}`
                            : 
                                'Pick from list...'
                            }
                            <BiDownArrow 
                                className='custom-list__arrow-icon' 
                                style={isUsersListOpened ? 
                                    {transform: 'rotate(180deg) translateY(50%)'} 
                                    : 
                                    {transform: 'translateY(-50%)'}
                                }
                            />
                        </p>
                        {isUsersListOpened && 
                            <ul className='asignee-list'>
                                {usersList.map((user:{login:string}, id:number) => 
                                    <li
                                        className='asignee-list__item'
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
                            </ul>
                        }
                    </div>
                </div>
                {/* <DatePicker /> */}
                <input 
                    className='form__submit-btn --margin'
                    type='submit'
                />
            </form>
            {/* <div className='blur'
            >
                
            </div> */}
        </>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
