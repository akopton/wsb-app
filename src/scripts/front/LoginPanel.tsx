import React, { useReducer } from "react";
import { useEffect, useState } from "react";

const LoginPanel = ( { defaultUser, setLoggedUser, setIsLoggedIn, usersList, setUsersList }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const loginData = {
        login: '',
        password: '',
    }
    
    const reducer = (state:any, action:any) => {
        switch (action.type) {
            case 'input':
                return {
                    ...state,
                    [action.field]: action.payload
                }
        }
    }
            
    const [state, dispatch] = useReducer(reducer, loginData)

    const handleInput = (e: any) => {
        dispatch({
            type: 'input',
            field: e.target.name,
            payload: e.target.value
        })
    }

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(state)
    }
    
    const validateLogin = async () => {
        setIsLoading(true)
        fetch('http://127.0.0.1:8888/sign-in', settings)
        .then(data => data.json())
        .then(res=>{
            setLoggedUser(res)
            setIsLoading(false)
            setIsLoggedIn(true)
        })
        .catch(()=>{
            alert('niepoprawny login lub hasło')
            setIsLoading(false)
        })
    }

    return (
            <div className="login-panel__wrapper">
                <form 
                    className="login-panel panel-form" 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        validateLogin()
                    }} 
                    autoComplete="on"
                >
                    <input
                        id="input__login"
                        className="login-panel__login-input form-input"
                        name="login"
                        style={{padding: '2px 10px'}}
                        type='text'
                        placeholder='login'
                        onChange={(e)=>handleInput(e)}
                        // onLoad={handleLogin}
                    />
                    <input 
                        className="login-panel__password-input form-input"
                        style={{padding: '2px 10px'}}
                        name="password"
                        type='password'
                        placeholder='password'
                        onChange={(e)=>handleInput(e)}
                        // onLoad={handlePassword}
                    />
                    <input 
                        className="login-panel__login-button form__btn btn"
                        // style={{fontSize: '20px', lineHeight: '100%'}}
                        type="submit"
                        value="Sign in"
                    />
                </form>
                {isLoading && 
                    <div className="logging-screen">
                        <div className="loader" />
                    </div>    
                }
            </div>
    )
}

export default LoginPanel;