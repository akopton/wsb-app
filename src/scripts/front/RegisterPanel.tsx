import { stat } from "fs"
import React, { useReducer } from "react"
import { useState } from "react"
import { BiRightArrowCircle } from "react-icons/bi"
import ActionsPicker from "./ActionsPicker"

const RegisterPanel = ( {defaultUser}:any ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFirstStepDone, setIsFirstStepDone] = useState<boolean>(false)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    // type TUser = {
    //     firstName: {value: string, isValid: boolean},
    //     lastName: {value: string, isValid: boolean},
    //     email: {value: string, isValid: boolean},
    //     login: {value: string, isValid: boolean},
    //     password: {value: string, isValid: boolean},
    // }

    const initialUser = defaultUser

    const formReducer = (state:{}, action:any) => {
        switch(action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.payload
                }
            case 'clear':
                return initialUser
            default:
                return state
        }
    }

    const handleInput = (e:any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value,
        })
    }
    
    const [state, dispatch] = useReducer(formReducer, initialUser)

    const registerNewUser = async () => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(state)
        }
        console.log(state)
        setIsLoading(true)
        fetch('http://127.0.0.1:8888/register', settings)
        .then(data => data.json())
        .then(res => {
            setIsLoading(false)
            if (res) {
                alert('Użytkownik o podanym mailu/loginie już istnieje')
                return
            } else {
                alert('pomyślnie zarejestrowano')
                clearAll()
                setIsFirstStepDone(false)
                return
            }
        })
    }
    
    const clearAll = () => {
        dispatch({
            type: 'clear'
        })
    }

    const handleSubmit = () => {
        const {email, login, password}:any = state
        if (!email) return
        if (!login) return
        if (!password) return
        registerNewUser()
    }

    const {firstName, lastName, email, login, password}:any = state

    return (
        <div className="register-panel__wrapper">
            {!isFirstStepDone ?
            <form
                className="register-panel first-step panel-form"
            >
            <input
                    className="register-panel__mail-input form-input"
                    name="firstName"
                    key="firstName"
                    type='text'
                    placeholder="First name"
                    onChange={handleInput}
                    value={firstName}
                    autoComplete="off"
                />
                <input
                    className="register-panel__login-input form-input"
                    name="lastName"
                    key="lastName"
                    type='text'
                    onChange={handleInput}
                    value={lastName}
                    placeholder="Last name"
                    autoComplete="off"
                />
                <button
                    className="register-panel__next-step-button form__btn btn"
                    type='submit'
                    onClick={(e) => {
                        e.preventDefault()
                        setIsFirstStepDone(true)
                    }}
                >
                    <BiRightArrowCircle />
                </button>
                
                
            </form>
            :
            <form 
                className="register-panel second-step panel-form"
                style={{position:'relative'}}
            >
                <input
                    className="register-panel__mail-input form-input"
                    name="email"
                    key="email"
                    type='text'
                    onChange={handleInput}
                    value={email}
                    placeholder="E-mail"
                    autoComplete="off"
                />
                <input
                    className="register-panel__login-input form-input"
                    name="login"
                    key="login"
                    type='text'
                    onChange={handleInput}
                    value={login}
                    placeholder="Login"
                    autoComplete="off"
                />
                <input
                    className="register-panel__password-input form-input"
                    name="password"
                    key="password"
                    type='password'
                    onChange={handleInput}
                    value={password}
                    placeholder="Password"
                    autoComplete="new-password"
                />
                <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between', width: '100%'}}>
                    {/* <button
                        className="register-panel__next-step-button form__btn btn"
                        type='submit'
                        onClick={(e) => {
                            e.preventDefault()
                            setIsFirstStepDone(true)
                        }}
                    > */}
                        <BiRightArrowCircle
                            className="back-arrow"
                            onClick={()=>setIsFirstStepDone(false)} 
                        />
                    {/* </button> */}
                    <input
                        className="register-panel__register-button form__btn btn"
                        type='submit'
                        onClick={e => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        value="Register"
                    />
                </div>
                {isLoading && 
                    <div className="logging-screen" style={{height:'114%'}}>
                        <div className="loader" />
                    </div>
                }
            </form>
            }
        </div>
    )
}

export default RegisterPanel