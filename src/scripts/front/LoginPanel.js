import { useEffect, useState, useSyncExternalStore } from "react";
const LoginPanel = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const user = {
        login: login,
        siem: password
    }

    const sendDataToDatabase = async () => {
        console.log('its working')
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        try {
            const fetchResponse = await fetch('http://127.0.0.1:8888/users', settings)
            const data = await fetchResponse.json()
            console.log(data)
            return data
        } catch (error) {
            return error
        }
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
                onClick={() => {
                                sendDataToDatabase()
                                console.log(user)
                            }
                        }
            />
        </div>
    )
}

export default LoginPanel;