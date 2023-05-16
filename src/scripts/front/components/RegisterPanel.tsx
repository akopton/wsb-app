import  { useReducer } from "react"
import { useState } from "react"
import { BiRightArrowCircle } from "react-icons/bi"
import { registerNewUser } from "../methods/register"
import { TUser } from "../interfaces/userInterface"

const RegisterPanel = ( {defaultUser}:any ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFirstStepDone, setIsFirstStepDone] = useState<boolean>(false)

    const initialUser = defaultUser

    const registerReducer = (state:TUser, action:any) => {
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
    
    const [registerData, dispatch] = useReducer(registerReducer, initialUser)
    
    const clearAll = () => {
        dispatch({
            type: 'clear'
        })
    }


    const handleFirstStep = (e:any) => {
        e.preventDefault()
        if (!registerData.firstName) {
            alert('First name is required!')
            return
        }
        if (!registerData.lastName) {
            alert('Last name is required!')
            return
        }
        setIsFirstStepDone(true)
    }

    const handleSubmit = async (registerData:TUser) => {
        const {email, login, password}:{email: string, login: string, password: string} = registerData
        if (!email) {
            alert('Email is required!')
            return
        }
        if (!login) {
            alert('Login is required!')
            return
        }
        if (!password) {
            alert('Password is required!')
            return
        }
    
        setIsLoading(true)
        await registerNewUser(registerData)
                .then(data => {
                    return data.json()
                })
                .then(res => {
                    setIsLoading(false)
                    console.log(res)
                    if (res) {
                        alert('User with this login already exists!')
                        return
                    } else {
                        alert('Successfully registered!')
                        clearAll()
                        setIsFirstStepDone(false)
                        return
                    }
                })
    }

    const {firstName, lastName, email, login, password} = registerData

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
                    onClick={handleFirstStep}
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
                            handleSubmit(registerData)
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