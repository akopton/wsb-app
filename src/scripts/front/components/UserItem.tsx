import { useEffect, useState } from "react"
import { TUser } from "../interfaces/userInterface"
import { TTask } from "../interfaces/taskInterface"
import { getData } from "../methods/getData"

export const UserItem = ({user, tasks}: {user: TUser, tasks:TTask[]}) => {
    const [areDetailsShown, setAreDetailsShown] = useState<boolean>(false)


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
            <div className="buttons-wrapper">
                <button className="btn form__btn">Nadaj uprawnienia</button>
                <button className="btn form__btn">Usuń użytkownika</button>
            </div>
        </div>
    )
}