import React from "react"
import { useState } from "react"

const RegisterPanel = ( { setUsersList, usersList, defaultUser }: any ) => {

    const [newUserFirstName, setNewUserFirstName] = useState<string>('')
    const [newUserLastName, setNewUserLastName] = useState<string>('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserLogin, setNewUserLogin] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    
    interface UserInterface {
        firstName: string,
        lastName: string,
        email: string,
        login: string,
        password: string,
        tasks: Array<[]>,
      }

    const newUser: UserInterface = {
        firstName: newUserFirstName,
        lastName: newUserLastName,
        email: newUserEmail,
        login: newUserLogin,
        password: newUserPassword,
        tasks: []
    }
    
    const checkIfUserExists = async () => {
        return usersList.some((user: any) => user.login === newUserLogin || user.email === newUserEmail)
    }

    const registerNewUser = async () => {
        console.log(`Registering new user: ${newUser.login}`)
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }
        try {
            const fetchResponse = await fetch('http://127.0.0.1:8888/users', settings)
            const data = await fetchResponse.json()
            return data
        } catch (error) {
            return error
        }
    }
    
    const handleRegister = async () => {
        if (!newUserEmail) return
        if (!newUserLogin) return
        if (!newUserPassword) return

        checkIfUserExists()
            .then(async (result) => {
                if (!result) await registerNewUser()
                else {
                    alert('Podany użytkownik już istnieje')
                    return
                }
            })
        setUsersList([...usersList, newUser])
    }

    

    return (
        <div className="register-panel">
            <input
                className="register-panel__mail-input --input"
                type='text'
                placeholder="email"
                onChange={(e) => {
                    setNewUserEmail(e.target.value)
                }}
            />
            <input
                className="register-panel__login-input --input"
                type='text'
                placeholder="login"
                onChange={(e) => {
                    setNewUserLogin(e.target.value)
                }}
            />
            <input
                className="login-panel__password-input --input"
                type='password'
                placeholder="password"
                onChange={(e) => {
                    setNewUserPassword(e.target.value)
                }}
            />
            <button 
                onClick={() => {
                    handleRegister()
                }}>
                Create an account
            </button>
        </div>
    )
}

export default RegisterPanel