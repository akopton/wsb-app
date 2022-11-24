import React from "react"
import { useState } from "react"
import { BiRightArrowCircle } from "react-icons/bi"

const RegisterPanel = ( { setUsersList, usersList, defaultUser }: any ) => {

    const [newUserFirstName, setNewUserFirstName] = useState<string>('')
    const [newUserLastName, setNewUserLastName] = useState<string>('')
    const [newUserEmail, setNewUserEmail] = useState<string>('')
    const [newUserLogin, setNewUserLogin] = useState<string>('')
    const [newUserPassword, setNewUserPassword] = useState<string>('')
    const [isFormFilled, setIsFormFilled] = useState<boolean>()

    interface UserInterface {
        firstName: string,
        lastName: string,
        email: string,
        login: string,
        password: string,
      }

    const newUser: UserInterface = {
        firstName: newUserFirstName,
        lastName: newUserLastName,
        email: newUserEmail,
        login: newUserLogin,
        password: newUserPassword,
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
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
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
 
    const handleFormFill = () => {
        if (!newUserEmail || !newUserLogin || !newUserPassword) {
            setIsFormFilled(false)
            return
        }
        setIsFormFilled(true)
    }

    return (
        <form className="register-panel" onSubmit={(e) => handleRegister(e)}>
            <input
                className="register-panel__mail-input --input"
                type='text'
                placeholder="email"
                onChange={(e) => {
                    handleFormFill()
                    setNewUserEmail(e.target.value)
                }}
                autoComplete="off"
            />
            <input
                className="register-panel__login-input --input"
                type='text'
                placeholder="login"
                onChange={(e) => {
                    handleFormFill()
                    setNewUserLogin(e.target.value)
                }}
            />
            <input
                className="login-panel__password-input --input"
                type='password'
                placeholder="password"
                onChange={(e) => {
                    setNewUserPassword(e.target.value)
                    handleFormFill()
                }}
                autoComplete="new-password"
            />
            <button
                className="register-panel__register-button form__btn"
                style={{position:'relative'}}
                type='submit'
                onClick={(e) => {
                    handleRegister(e)
                }}
            >
                Register 
                {/* {isFormFilled ?  */}
                    <BiRightArrowCircle style={{
                        position:'absolute',
                        top:'50%',
                        right:'5px',
                        transform: 'translateY(-50%) scale(1.2)'
                    }}/> 
                    {/* : 
                    undefined
                } */}
            </button>
        </form>
    )
}

export default RegisterPanel