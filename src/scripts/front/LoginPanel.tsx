import React from "react";
import { useEffect, useState } from "react";

const LoginPanel = ( { defaultUser, setLoggedUser, setIsLoggedIn, usersList }: any) => {
    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [fetchedUser, setFetchedUser] = useState(defaultUser)

    const findUser = (input: string) => {
        usersList.forEach((user: any) => {
            if (input === user.login) {
                setFetchedUser(user)
            } else return
        })
    }

    const handleLogin = async () => {
        if (!inputLogin) return
        if (!inputPassword) return
        if (inputPassword !== fetchedUser.password) return
        setIsLoggedIn(true)
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