import { useEffect, useState } from "react"

const ActualPage = ( { userInterface, setIsLoggedIn, setLoggedUser, loggedUser, waitValue } ) => {
    const [hidden, setHidden] = useState(false)

    const show = () => {
        setHidden(true)
    }

    useEffect(()=>{
        setTimeout(()=>{
            show()
        }, waitValue)
    },[])



    return (
        <>
            {
                !hidden ? 
                <div className="loading-screen">
                    <p>ładowanie</p>
                </div> 
                : 
                <div className="main-site">
                    <h1>Siema {loggedUser.login}</h1>
                    <button
                        onClick={()=>{
                            setLoggedUser(userInterface)
                            setIsLoggedIn(false)
                        }}
                    >Wyloguj się</button>
                </div>
            }       
        </>
    )
}

export default ActualPage