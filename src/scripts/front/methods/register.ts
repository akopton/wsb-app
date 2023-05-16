import { TUser } from "../interfaces/userInterface"

export const registerNewUser = async (registerData:TUser) => {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(registerData)
    }

    return fetch('http://127.0.0.1:8888/register', settings)
}