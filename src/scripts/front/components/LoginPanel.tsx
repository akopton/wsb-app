import {  useState, useReducer } from "react";
import { login } from "../methods/login";

const LoginPanel = ( { setLoggedUser, setIsLoggedIn }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const initialLoginData = {
        login: '',
        password: '',
    }
    
    const loginReducer = (state:any, action:any) => {
        switch (action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.payload
                }
        }
    }
            
    const [loginData, dispatch] = useReducer(loginReducer, initialLoginData)

    const handleInput = (e: any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const validateLogin = async (loginData:{login:string, password:string}) => {
        setIsLoading(true)

        await login(loginData)
                .then(data => data.json())
                .then(res => {
                    setLoggedUser(res)
                    setIsLoading(false)
                    setIsLoggedIn(true)
                })
                .catch(() => {
                    alert('Invalid login or password')
                    setIsLoading(false)
                })
    }
    
    

    return (
            <div className="login-panel__wrapper">
                <form 
                    className="login-panel panel-form" 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        validateLogin(loginData)
                    }} 
                    autoComplete="on"
                >
                    <input
                        id="input__login"
                        className="login-panel__login-input form-input"
                        name="login"
                        style={{padding: '2px 10px'}}
                        type='text'
                        placeholder='Login'
                        onChange={handleInput}
                    />
                    <input 
                        className="login-panel__password-input form-input"
                        style={{padding: '2px 10px'}}
                        name="password"
                        type='password'
                        placeholder='Hasło'
                        onChange={handleInput}
                    />
                    <input 
                        className="login-panel__login-button form__btn btn"
                        type="submit"
                        value="Zaloguj"
                    />
                    {isLoading && 
                        <div className="logging-screen">
                            <div className="loader" />
                        </div>
                    }
                </form>
            </div>
    )
}

export default LoginPanel;