import { useEffect, useState } from "react";
const LoginPanel = ( { isLoggedIn, setLoggedUser, setIsLoggedIn, usersList } ) => {

    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [fetchedUser, setFetchedUser] = useState({})

    const findUser = () => {
        usersList.forEach(user => {
            if (user.login == inputLogin) {
                setFetchedUser(user)
            } else return
        })
    }

    const handleLogin = async () => {
        if (fetchedUser.password === inputPassword && fetchedUser.login === inputLogin) setIsLoggedIn(true)
        else return
    }

    return (
        <div className="login-panel">
            <input
                className="login-panel__login-input --input"
                type='text'
                placeholder='login'
                onChange={(e) => {
                            setInputLogin(e.target.value)
                        }} 
                onBlur={(e) => {
                            findUser(e.target.value)
                        }}
            ></input>
            <input 
                className="login-panel__password-input --input"
                type='password'
                placeholder='password'
                onChange={(e) => {
                            setInputPassword(e.target.value)
                        }}
            />
            <input 
                className="login-panel__login-button"
                type="submit"
                value="siem mordo"
                onClick={() => {
                            handleLogin().then(()=>setLoggedUser(fetchedUser))
                        }}
            />

        </div>
    )
}

export default LoginPanel;