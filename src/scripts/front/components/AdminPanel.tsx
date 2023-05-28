import { useEffect, useState } from "react"
import { getData } from "../methods/getData"
import { TUser } from "../interfaces/userInterface"
import { TTask } from "../interfaces/taskInterface"
import { UserItem } from "./UserItem"
import { deleteUser } from "../methods/deleteUser"
import { updateUser } from "../methods/updateUser"
import { updateProjectName } from "../methods/updateProjectName"
import { DeleteUserWindow } from "./DeleteUserWindow"

export const AdminPanel = ({setIsAdminPanelOpened}:any) => {
    const [users, setUsers] = useState<TUser[]>([])
    const [tasks, setTasks] = useState<TTask[]>([])
    const [projectName, setProjectName] = useState<string>("")
    const [userDetails, setUserDetails] = useState<TUser>()

    const getUsersFromDatabase = async () => {
        await getData('http://127.0.0.1:8888/users')
            .then((res) => res.json())
            .then((data:TUser[]) => {
                setUsers(data)
            })
    }

    const getTasksFromDatabase = async () => {
        await getData('http://127.0.0.1:8888/get-tasks')
            .then((res) => res.json())
            .then((data:TTask[]) => {
                setTasks(data)
            })
    }

    const getProjectNameFromDatabase = async () => {
        await getData('http://127.0.0.1:8888/get-project-name')
            .then((res) => res.json())
            .then((data) => {
                setProjectName(data[0].name)
            })
    }
    
    const handleProjectName = (e: React.FormEvent<HTMLInputElement>) => {
        setProjectName(e.currentTarget.value)
    }
    const changeProjectName = async (e: React.FormEvent) => {
        e.preventDefault()
        await updateProjectName(projectName)
        alert('Nazwa projektu zmieniona pomyślnie.')
    }

    const showUserDetails = (user: TUser) => {
        setUserDetails(user)
    }

    useEffect(()=>{
        getUsersFromDatabase()
            .then(() => getTasksFromDatabase())
            .then(() => getProjectNameFromDatabase())
    },[])

    return (
        <div className="admin-panel">
            <div className="users-content__wrapper">
                <p className="users-content__title">Zarejestrowani użytkownicy</p>
                <div className="users-content">
                    <ul className="users-list">
                        {users.map(user => {
                            return (
                                <li key={user._id} className={ userDetails && userDetails._id === user._id ? "user-item active" : "user-item"} onClick={()=>showUserDetails(user)}>
                                    {user.firstName + " " + user.lastName}
                                </li>
                            )
                        })}
                    </ul>
                    {
                        userDetails &&
                        <UserItem user={userDetails} tasks={tasks} setUsers={setUsers}/>
                    }
                </div>
            </div>
            <form onSubmit={changeProjectName} className="project-name">
                <label htmlFor="project-name" className="project-name__label">
                    Zmień nazwę projektu
                    <input type="text" id='project-name' name="project-name" className="project-name__input form-input" value={projectName} onChange={handleProjectName}/>
                    <input type="submit" value="Zapisz" className="save-name-btn btn form__btn" onClick={changeProjectName}/>
                </label>
            </form>
            <button className="btn form__btn" onClick={()=>setIsAdminPanelOpened(false)}>Wróć do strony głównej</button>
        </div>
    )
}


