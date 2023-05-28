export const updateProjectName = async (name?:string) => {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name})
    }
    
    return fetch('http://127.0.0.1:8888/update-project-name', settings)
        
}