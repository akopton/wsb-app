import { TTask } from "../interfaces/taskInterface"

export const updateTask = async (data:TTask, status?:string) => {

    if (status) data.status = status
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
   
    return fetch('http://127.0.0.1:8888/update-task', settings)
}