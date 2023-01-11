import { TTask } from "../interfaces/taskInterface"

export const addTaskToDatabase = async (newTask:TTask) => {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newTask)
    }
    
    return fetch('http://127.0.0.1:8888/tasks', settings)
}