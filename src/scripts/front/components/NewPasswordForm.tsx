export const NewPasswordForm = ({handlePasswords}: {handlePasswords: (e: React.FormEvent<HTMLInputElement>)=>void}) => {
    return (
        <>
            <span className="form-title">Zmiana hasła</span>
            <input id="currPsw" type="password" placeholder="Stare hasło" onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
            <input id="newPsw" type="password" placeholder="Nowe hasło" onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
            <input id="confirmPsw" type="password" placeholder="Potwierdź nowe hasło" onChange={handlePasswords} className="change-psw-input settings-input form-input"/>
        </>
    )
}