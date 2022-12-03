import { isDocument } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { BiDownArrow } from 'react-icons/bi'
import { TUser } from './interfaces';

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

const NewTaskForm = ( {setIsFormOpened, setLoadingNewTask, loggedUser }:any ) => {
    const [usersList, setUsersList] = useState<[]>([])
    const [isUsersListLoading, setIsUsersListLoading] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [asignee, setAsignee] = useState<TUser>()
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

    const getUsersFromDatabase = async () => {
        if (usersList.length) return
        setIsUsersListLoading(true)
        fetch('http://127.0.0.1:8888/users')
        .then(data => data.json())
        .then(res => setUsersList(res))
        .catch(e => console.log(e))
        .finally(()=>setIsUsersListLoading(false))
    }

    return (
        <>
            <form 
                className='new-task-form' 
                onSubmit={handleSubmit}
            >
                <input
                    className='title-input form-input --margin'
                    placeholder='Title...'
                    name='title'
                    value={title}
                    onChange={handleTitle}
                />
                <textarea 
                    className='desc-input form-input --margin'
                    style={{height: '40vh'}}
                    placeholder='Description...'
                    name='description'
                    value={description}
                    onChange={handleDescription}
                />
                
                <div className='asignee-picker asignee-picker --margin'>
                    <span style={{ display: 'block'}} className='--margin'>Asigned person:</span>
                    <div className='asignee-picker__custom-list custom-list'>
                        <p 
                            className='custom-list__picked-asignee'
                            onClick={() => {
                                getUsersFromDatabase()
                                setIsUsersListOpened(!isUsersListOpened)
                            }}>
                            {asignee ? 
                                `${asignee.firstName} ${asignee.lastName}`
                            : 
                                'Pick from list...'
                            }
                            <BiDownArrow 
                                className='custom-list__arrow-icon' 
                                style={isUsersListOpened ? 
                                    {transform: 'rotate(180deg)'} 
                                    : 
                                    {}
                                }
                            />
                        </p>
                        {isUsersListOpened && 
                            <ul className='asignee-list'>
                                {usersList.map((user:any, id:number) => 
                                    <li
                                        className='asignee-list__item'
                                        key={id}
                                        onClick={()=>{
                                            setAsignee(user)
                                            setIsUsersListOpened(!isUsersListOpened)
                                        }}
                                        style={{cursor: 'pointer'}} 
                                    >
                                        {isUsersListLoading ? <div className='loader'></div> : <span>{`${user.firstName} ${user.lastName}`}</span>}
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
                {/* <DatePicker /> */}
                <input 
                    className='submit-btn form__btn btn --margin'
                    type='submit'
                />
                {isUsersListOpened && 
                    <div 
                        className='blur'
                        onClick={()=>setIsUsersListOpened(false)}    
                    />
                }
            </form>
        </>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
