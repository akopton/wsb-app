export const login = async (loginData:{login:string, password:string}) => {
    
    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginData)
    }

    return fetch('http://127.0.0.1:8888/sign-in', settings)
}
