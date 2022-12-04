import { isDocument } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useReducer, useMemo, useEffect, useState, useCallback } from 'react';
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
    const [asignee, setAsignee] = useState<any>()
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false)
    const [updatedId, setUpdatedId] = useState<number>()
    const [addingNewTask, setAddingNewTask] = useState<boolean>(false)


    const getIdForGenerator = async () => {
        fetch('http://127.0.0.1:8888/get-id')
        .then((data) => data.json())
        .then((res) => {
            const {id} = res
            setUpdatedId(id+1)
            dispatch({
                type: 'generate',
                field: 'innerId',
                payload: `PROJECT-${id}`
            })
        })
    }

    const newTaskState = {
        innerId: '',
        title: '',
        description: '',
        asignee: loggedUser,
        status: 'todo',
    }

    const {login} = loggedUser
    const newTaskReducer = (state:any, action:any) => {
        switch (action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.payload
                }
            case 'pick':
                return {
                    ...state,
                    [action.field]: action.payload
                }
            case 'generate':
                return {
                    ...state,
                    [action.field]: action.payload
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(newTaskReducer, newTaskState)
    
    const handleInput = (e:any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const handleClick = (user:any, e:any) => {
        dispatch({
            type: 'pick',
            field: e.target.id,
            payload: user
        })
    }

    const addTaskToDatabase = async () => {
        setAddingNewTask(true)
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(state)
        }
        fetch('http://127.0.0.1:8888/tasks', settings)
        .then((data) => data)
        .then(()=>setAddingNewTask(false))
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

    const getUsersFromDatabase = async () => {
        fetch('http://127.0.0.1:8888/users')
        .then(data => data.json())
        .then(res => setUsersList(res))
    }

    useEffect(()=>{
        setTimeout(() => {
            getIdForGenerator()
        }, 250)
    },[])
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!state.title) return
        if(!state.description) return
        await addTaskToDatabase()
        await updateIdForGenerator()
        setIsFormOpened(false)
        setLoadingNewTask(true)
    }

    return (
        <>
        {!addingNewTask ?
            <form 
                className='new-task-form' 
                onSubmit={handleSubmit}
            >
                <input
                    className='title-input form-input --margin'
                    placeholder='Title...'
                    name='title'
                    value={state.title}
                    onChange={handleInput}
                />
                <textarea 
                    className='desc-input form-input --margin'
                    style={{height: '40vh'}}
                    placeholder='Description...'
                    name='description'
                    value={state.description}
                    onChange={handleInput}
                />
                
                <div className='asignee-picker asignee-picker --margin'>
                    <span style={{ display: 'block'}} className='--margin'>Asigned person:</span>
                    <div className='asignee-picker__custom-list custom-list'>
                        <p 
                            className='custom-list__picked-asignee'
                            onClick={() => {
                                setIsUsersListOpened(!isUsersListOpened)
                                getUsersFromDatabase()
                            }}
                            onChange={()=>console.log('zmiana')}
                        >
                            {asignee ? 
                                // `${asignee.firstName} ${asignee.lastName}`
                                `${state.asignee.firstName} ${state.asignee.lastName}`
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
                                        id="asignee"
                                        key={id}
                                        onClick={(e)=>{
                                            handleClick(user, e)
                                            const {login} = user
                                            setAsignee(login)
                                            setIsUsersListOpened(!isUsersListOpened)
                                        }}
                                        style={{cursor: 'pointer'}} 
                                    >
                                        {user.firstName + ' ' + user.lastName}
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
            :
            <div>
                Dodaje
            </div>    
    }
        </>
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
