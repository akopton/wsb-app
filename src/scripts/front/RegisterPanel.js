import { useState } from "react"

const RegisterPanel = ( { usersList, user } ) => {

    
    const [emailToRegister, setEmailToRegister] = useState('')
    const [loginToRegister, setLoginToRegister] = useState('')
    const [passwordToRegister, setPasswordToRegister] = useState('')
    let newUser = {
        email: emailToRegister,
        login: loginToRegister,
        password: passwordToRegister,
    }
    newUser = Object.assign(user, newUser)

    const checkIfUserExists = async () => {
        return usersList.some(user => user.login === loginToRegister || user.email === emailToRegister)
    }

    const handleRegister = async () => {
        checkIfUserExists()
            .then((result) => {
                if (!result)
                registerNewUser()
            })
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

    return (
        <div className="register-panel">
            <input
                className="register-panel__mail-input --input"
                type='text'
                placeholder="email"
                onChange={(e) => {
                    setEmailToRegister(e.target.value)
                }}
            />
            <input
                className="register-panel__login-input --input"
                type='text'
                placeholder="login"
                onChange={(e) => {
                    setLoginToRegister(e.target.value)
                }}
            />
            <input
                className="login-panel__password-input --input"
                type='password'
                placeholder="password"
                onChange={(e) => {
                    setPasswordToRegister(e.target.value)
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