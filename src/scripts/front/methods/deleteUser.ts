import { TUser } from "../interfaces/userInterface"

export const deleteUser = (id: string) => {
    console.log(id)
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id})
    }

    return fetch('http://127.0.0.1:8888/delete-user', settings)
}