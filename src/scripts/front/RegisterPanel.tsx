import React, { useReducer } from "react"
import { useState } from "react"
import { BiRightArrowCircle } from "react-icons/bi"
import ActionsPicker from "./ActionsPicker"

const RegisterPanel = ( { setUsersList, usersList, defaultUser }: any ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFirstStepDone, setIsFirstStepDone] = useState<boolean>(false)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)


    interface UserInterface {
        firstName: string,
        lastName: string,
        email: string,
        login: string,
        password: string,
      }

    const newUser: UserInterface = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
    }

    const reducer = (state:{}, action:any) => {
        switch(action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.payload
                }
            default:
                return state
        }
    }
    
    const handleInput = (e:any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value
        })
    }
    const [state, dispatch] = useReducer(reducer, newUser)

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(state)
    }

    const registerNewUser = async () => {
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
                return
            }
        })
    }
    
    const handleSubmit = () => {
        registerNewUser()
    }

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
                    autoComplete="off"
                />
                <input
                    className="register-panel__login-input form-input"
                    name="lastName"
                    key="lastName"
                    type='text'
                    onChange={handleInput}
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
                    placeholder="email"
                    autoComplete="off"
                />
                <input
                    className="register-panel__login-input form-input"
                    name="login"
                    key="login"
                    type='text'
                    onChange={handleInput}
                    placeholder="login"
                    autoComplete="off"
                />
                <input
                    className="register-panel__password-input form-input"
                    name="password"
                    key="password"
                    type='password'
                    onChange={handleInput}
                    placeholder="password"
                    autoComplete="new-password"
                />
                <input
                    className="register-panel__register-button form__btn btn"
                    type='submit'
                    onClick={e => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    value="Register"
                />
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