import React, { useState } from "react"
import { DeleteUserWindow } from "./DeleteUserWindow"
import { NewPasswordForm } from "./NewPasswordForm"
import { updateUser } from "../methods/updateUser"
import { TUser } from "../interfaces/userInterface"
import { deleteUser } from "../methods/deleteUser"

export const SettingsSite = ({setIsSettingsOpened, loggedUser, setIsLoggedIn, setLoggedUser, defaultUser}:any) => {
    const {settings: {taskDaysLeft}} = loggedUser
    const [newDaysLeftCount, setNewDaysLeftCount] = useState<number>(taskDaysLeft)
    const [showDeleteWindow, setShowDeleteWindow] = useState<boolean>(false)
    const [showUpdateBtn, setShowUpdateBtn] = useState<boolean>(false)
    const [showPasswordChangeForm, setShowPasswordChangeForm] = useState<boolean>(false)

    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')


    const handlePasswords = (e: React.FormEvent<HTMLInputElement>) => {
        switch (e.currentTarget.id) {
            case 'currPsw':
                setCurrentPassword(e.currentTarget.value)
                break
            case 'newPsw':
                setNewPassword(e.currentTarget.value)
                break
            case 'confirmPsw':
                setConfirmNewPassword(e.currentTarget.value)
                break
            default:
        }
    }

    const handleNewDaysLeftCount = (e: React.FormEvent<HTMLInputElement>) => {
        setShowUpdateBtn(true)
        const newCount = parseInt(e.currentTarget.value)
        setNewDaysLeftCount(newCount)
    }

    const handleFormOpened = () => {
        setShowPasswordChangeForm((prevState) => !prevState)
        setShowUpdateBtn(true)
    }

    const handleDeleteAccount = async () => {
        const {_id} = loggedUser
        await deleteUser(_id)
        setIsLoggedIn(false)
        setLoggedUser(defaultUser)
    }

    const clearForm = () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
    }

    const handleUpdateSettings = async (e: React.FormEvent) => {
        e.preventDefault()
        const newUserDetails: TUser = loggedUser

        // update only days count with old password
        if (!newPassword && newDaysLeftCount !== taskDaysLeft) {
            newUserDetails.settings.taskDaysLeft = newDaysLeftCount
            try {
                await updateUser(newUserDetails)
                clearForm()
                alert('Ilość dni została zmieniona!')
            } catch (e) {
                console.log(e)
            }
            return
        }

        // update only new password with old days count
        if (newPassword && newDaysLeftCount === taskDaysLeft) {
            if (currentPassword === loggedUser.password) {
                if (newPassword === confirmNewPassword) {
                    newUserDetails.password = newPassword
                    try {
                        await updateUser(newUserDetails)
                        clearForm()
                        alert('Hasło zostało zmienione!')
                    } catch (e) {
                        console.log(e)
                    }
                    return
                } else {
                    alert('Nowe hasło i potwierdzenie hasła muszą być takie same!')
                    return
                }
            } else {
                alert('Złe hasło.')
                return
            }
        }

        // update all settings
        if (newPassword && newDaysLeftCount !== taskDaysLeft) {
            newUserDetails.settings.taskDaysLeft = newDaysLeftCount
            newUserDetails.password = newPassword
            try {
                await updateUser(newUserDetails)
                clearForm()
            } catch (e) {
                console.log(e)
            }
            return
        }
    }


    return (
        <div className="settings-site">
            <h2 className="site-title">Ustawienia konta</h2>
            <form onSubmit={handleUpdateSettings} className="settings-form">
                <label htmlFor="task-days-left" className="task-days-left">
                    Zmień ilość dni pozostałych na zadanie, aby o nim poinformować
                    <input id="task-days-left" name="task-days-left" type="number" min={'0'} value={newDaysLeftCount} onChange={handleNewDaysLeftCount} className="days-input settings-input form-input"/>
                </label>
                {
                    showPasswordChangeForm &&
                    <NewPasswordForm currentPassword={currentPassword} newPasword={newPassword} confirmNewPassword={confirmNewPassword} handlePasswords={handlePasswords}/>
                }
                {showUpdateBtn && <input type="submit" value="Zapisz ustawienia" onClick={handleUpdateSettings} className="submit-changes-btn btn form__btn"/>}
            </form>
                <button onClick={handleFormOpened} className="change-psw-btn settings-btn btn form__btn">Zmień hasło</button>
            <button onClick={()=>setShowDeleteWindow(true)} className="delete-acc-btn settings-btn btn form__btn">Usuń konto</button>
            <button onClick={()=>setIsSettingsOpened(false)} className="go-back-btn settings-btn btn form__btn">Wróć do strony głównej</button>
            {
                showDeleteWindow && 
                <DeleteUserWindow  setShowDeleteWindow={setShowDeleteWindow} handleDeleteAccount={handleDeleteAccount}/>
            }
        </div>
    ) 
}