import { useEffect, useState } from "react"
import { TUser } from "../interfaces/userInterface"
import { TTask } from "../interfaces/taskInterface"
import { getData } from "../methods/getData"
import { deleteUser } from "../methods/deleteUser"
import { updateUser } from "../methods/updateUser"
import { DeleteUserWindow } from "./DeleteUserWindow"

export const UserItem = ({user, tasks, setUsers}: {user: TUser, tasks:TTask[], setUsers:any}) => {
    const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false)
    const [showDeleteWindow, setShowDeleteWindow] = useState<boolean>(false)

    const getTasksCountForUser = (user: TUser, status: string) => {
        switch (status) {
            case 'all':
                return tasks.filter(task => task.asignee._id === user._id && task.status !== 'deleted').length
            case 'todo':
                return tasks.filter(task => task.asignee._id === user._id && task.status !== 'deleted' && task.status === status).length
            case 'active':
                return tasks.filter(task => task.asignee._id === user._id && task.status !== 'deleted' && task.status === status).length
            case 'done':
                return tasks.filter(task => task.asignee._id === user._id && task.status !== 'deleted' && task.status === status).length
            case 'expired':
                return tasks.filter(task => task.asignee._id === user._id && task.status !== 'deleted' && task.status === status).length
        }
    }


    const deleteUserFromDatabase = async (user: TUser) => {
        if (user && user._id) {
            const result = await deleteUser(user._id)
            const newData:TUser[] = await result.json()
            setUsers(newData)
            setShowDeleteWindow(false)
        }
    }

    const setUserRole = async (user: TUser) => {
        const result = await updateUser(user)
        const newData:TUser[] = await result.json()
        setUsers(newData)
    }

    const handleUserRole = (user: TUser, role: string) => {
        user.role = role
        setShowRoleSelection(false)
        setUserRole(user)
    }

    return (
        <div 
            key={user._id}
            id={user.login}
            className="selected-user"
        >
            <ul className="details-list">
                <li className="details-list__item">Zadania użytkownika: {getTasksCountForUser(user, 'all')}</li>
                <li className="details-list__item">Do zrobienia: {getTasksCountForUser(user, 'todo')}</li>
                <li className="details-list__item">W trakcie: {getTasksCountForUser(user, 'active')}</li>
                <li className="details-list__item">Zrobione: {getTasksCountForUser(user, 'done')}</li>
                <li className="details-list__item">Przeterminowane: {getTasksCountForUser(user, 'expired')}</li>
            </ul>
            <div className="user-role">Uprawnienia: {user.role === 'user' ? 'użytkownik' : 'administrator'}</div>
            <div className="buttons-wrapper">
                <button className="btn form__btn" onClick={()=>setShowRoleSelection(true)}>Nadaj uprawnienia</button>
                <button className="btn form__btn" onClick={()=>setShowDeleteWindow(true)}>Usuń użytkownika</button>
            </div>
            {
                showRoleSelection &&
                <div className="role-selection">
                    <button className="btn form__btn" onClick={() => handleUserRole(user, 'user')}>Użytkownik</button>
                    <button className="btn form__btn" onClick={() => handleUserRole(user, 'admin')}>Administrator</button>
                </div>
            }
            {
                showDeleteWindow &&
                <DeleteUserWindow setShowDeleteWindow={setShowDeleteWindow} handleDeleteAccount={()=>deleteUserFromDatabase(user)}/>
            }
        </div>
    )
}