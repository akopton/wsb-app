import { useEffect, useState } from "react";
const LoginPanel = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(0)

    useEffect(() => {
    }, [login])
    
    const loginValidation = () => {

    }

    return (
        <div className="login-panel">
            <input
                id="login"
                className="login-panel__login-input --input"
                type='text'
                placeholder='login'
                onChange={(e) => {
                            setLogin(e.target.value)
                        }} 
            ></input>
            <input 
                id="password"
                className="login-panel__password-input --input"
                type='text'
                placeholder='password'
                onChange={(e) => {
                            setPassword(e.target.value)
                        }}
            />
            <input 
                className="login-panel__login-button"
                type="submit"
                value="siem mordo"
                onClick={() =>
                            loginValidation()
                        }
            />
        </div>
    )
}

export default LoginPanel;