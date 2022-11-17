import React from "react";
import { useEffect, useState } from "react";

const LoginPanel = ( { defaultUser, setLoggedUser, setIsLoggedIn, usersList }: any) => {
    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [fetchedUser, setFetchedUser] = useState(defaultUser)

    const findUser = async (input: string) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await handleLogin()
        } catch (e) {

        } finally {
            await setLoggedUser(fetchedUser)
        }
    }

    useEffect(()=>{
        findUser(inputLogin)
    },[inputLogin])

    return (
            <form className="login-panel" onSubmit={handleSubmit}>
                <input
                    className="login-panel__login-input --input"
                    type='text'
                    placeholder='login'
                    onChange={(e) => {
                                setInputLogin(e.target.value)
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
                    value="Sign in"
                />
            </form>
    )
}

export default LoginPanel;