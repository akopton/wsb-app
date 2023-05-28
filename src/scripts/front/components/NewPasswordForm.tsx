export const NewPasswordForm = ({handlePasswords, currentPassword, newPasword, confirmNewPassword}: {handlePasswords: (e: React.FormEvent<HTMLInputElement>)=>void, currentPassword:string, newPasword:string, confirmNewPassword:string}) => {
    return (
        <>
            <span className="form-title">Zmiana hasła</span>
            <input id="currPsw" type="password" placeholder="Stare hasło" value={currentPassword} onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
            <input id="newPsw" type="password" placeholder="Nowe hasło" value={newPasword} onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
            <input id="confirmPsw" type="password" placeholder="Potwierdź nowe hasło" value={confirmNewPassword} onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
        </>
    )
}
