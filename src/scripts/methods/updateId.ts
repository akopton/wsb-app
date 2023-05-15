export const updateIdForGenerator = async (updatedId?:number) => {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({updatedId})
    }
    
    return fetch('http://127.0.0.1:8888/update-id', settings)
        
}