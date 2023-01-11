import { isDocument } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useReducer, useMemo, useEffect, useState, useCallback, forwardRef } from 'react';
import { BiDownArrow } from 'react-icons/bi'
import { TUser } from '../interfaces/userInterface';
import { BiCalendar } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTaskToDatabase } from '../fetches/addTask';
import { updateIdForGenerator } from '../fetches/updateId';
import { getIdForGenerator } from '../fetches/getId';
import { getUsersFromDatabase } from '../fetches/getUsers';

const DateCustomInput = forwardRef(({ value, onClick, isCalendarOpen }:any, ref:any) => (
    <div className="date-custom-input" onClick={onClick} ref={ref}>
      {value}
      <BiCalendar className='calendar-icon' style={isCalendarOpen ? {color: 'rgb(57, 255, 238)'} : {}}/>
    </div>
  ));

const NewTaskBtn = ( {isNavMenuOpened,isSingleTaskOpened,isNewTaskFormOpened, setIsNewTaskFormOpened}:any ) => {

    return (
        <div 
            className="add-task__button button--round"
            style={isNavMenuOpened ? 
                    {} 
                    : isNewTaskFormOpened ? 
                    {transform: 'rotate(45deg)', zIndex: '50', transition: 'ease .2s'}
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

const NewTaskForm = ( {setIsFormOpened, loggedUser, setTasks}:any ) => {
    const [usersList, setUsersList] = useState<[]>([])
    const [asignee, setAsignee] = useState<any>()
    const [isUsersListOpened, setIsUsersListOpened] = useState<boolean>(false)
    const [updatedId, setUpdatedId] = useState<number>()
    const [addingNewTask, setAddingNewTask] = useState<boolean>(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    
    

    const initialState = {
        innerId: '',
        title: '',
        description: '',
        asignee: loggedUser,
        date: new Date().getTime(),
        status: 'todo',
    }

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

    const [newTask, dispatch] = useReducer(newTaskReducer, initialState)
    
    const handleInput = (e:any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const handleClick = (value:any, id:any) => {
        dispatch({
            type: 'pick',
            field: id,
            payload: value
        })
    }

    

    const getDataForNewTask = async () => {
        await getIdForGenerator()
                .then(data => data.json())
                .then(res => {
                    const {id} = res
                    setUpdatedId(id+1)
                    dispatch({
                        type: 'generate',
                        field: 'innerId',
                        payload: `PROJECT-${id}`
                    })
                    console.log(`wygenerowano id ${id}`)
                })
        await getUsersFromDatabase()
                .then(data => data.json())
                .then(res => setUsersList(res))
    }

    useEffect(() => {
        getDataForNewTask()
    },[])
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!newTask.title) return
        if(!newTask.description) return
        await addTaskToDatabase(newTask)
                .then(data => data.json())
                .then(res => setTasks(res))

        await updateIdForGenerator(updatedId)
                .then((data) => data)

        setIsFormOpened(false)
    }

    return (
            <form 
                className='new-task-form' 
                onSubmit={handleSubmit}
            >
                <div className='data-wrapper'>
                    <div className='inputs-wrapper'>
                        <input
                            className='title-input form-input'
                            placeholder='Title...'
                            name='title'
                            value={newTask.title}
                            onChange={handleInput}
                        />
                        <textarea 
                            className='desc-input form-input'
                            placeholder='Description...'
                            name='description'
                            value={newTask.description}
                            onChange={handleInput}
                        />
                    </div>
                    
                    <div className='pickers-wrapper'>
                        <div className='asignee-picker' style={isCalendarOpen ? {zIndex:'-2'} : {zIndex:'50'}}>
                            <span className='picker-title'>Asigned person:</span>
                            <div 
                                className='asignee-picker__custom-list custom-list'
                            >
                                <div 
                                    className='custom-list__picked-asignee'
                                    
                                    onClick={() => {
                                        setIsUsersListOpened(!isUsersListOpened)
                                    }}
                                >
                                    <span style={{width:'205px', overflow:'scroll'}}>
                                    {asignee ? 
                                        `${newTask.asignee.firstName} ${newTask.asignee.lastName}`
                                        : 
                                        'Pick from list...'
                                    }
                                    </span>
                                    <BiDownArrow 
                                        className='custom-list__arrow-icon' 
                                        style={isUsersListOpened ? 
                                            {transform: 'rotate(180deg)', color: 'rgb(57, 255, 238)'} 
                                            : 
                                            {}
                                        }
                                    />
                                </div>
                                <ul 
                                    className='asignee-list' 
                                    style={isUsersListOpened ? 
                                        {maxHeight:'200px', transition:'all .3s ease', padding:'10px'} 
                                        : 
                                        {maxHeight: '0', padding: '0 10px', transition:'all .3s ease'}}
                                >
                                    {usersList.map((user:any, id:number) => 
                                        <li
                                            className='asignee-list__item'
                                            id="asignee"
                                            key={id}
                                            onClick={(e)=>{
                                                handleClick(user, e.currentTarget.id)
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
                            </div>
                        </div>
                        <div className='date-picker-wrapper'>
                            <span className='picker-title' style={{fontSize: '24px'}}>Pick ending date:</span>
                            <DatePicker 
                                dateFormat='dd MMMM yyyy'
                                selected={newTask.date}
                                onCalendarOpen={() => setIsCalendarOpen(true)}
                                onCalendarClose={() => setIsCalendarOpen(false)}
                                onChange={(date:Date, e:any) => {
                                    e.preventDefault()
                                    const newDate = date.getTime()
                                    handleClick(newDate, 'date')
                                }} 
                                customInput={<DateCustomInput isCalendarOpen={isCalendarOpen}/>}
                            />
                        </div>
                    </div>
                </div>
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
    )
}

const NewTask = {
    NewTaskBtn: NewTaskBtn,
    NewTaskForm: NewTaskForm
}

export default NewTask
