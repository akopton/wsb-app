import { TUser } from "../interfaces/userInterface";

export const updateUser = (data: TUser) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch('http://127.0.0.1:8888/update-user', settings)
}