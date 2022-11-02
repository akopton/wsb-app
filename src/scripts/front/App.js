import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import ActualPage from "./ActualPage";

const App = () => {
  const userInterface = {
    id: '',
    email: '',
    login: '',
    password: '',
    allTasks: [],
  }

  const [isRegisterPanelOpened, openRegisterPanel] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [loggedUser, setLoggedUser] = useState(userInterface)
  const [isLoggedIn, setIsLoggedIn] = useState(false)



  const url = 'http://127.0.0.1:8888'
  const getUsersFromDatabase = () => {
    fetch(url)
      .then((data) => data.json())
      .then((res) => setUsersList(res))
  }

  useEffect(()=>{
    getUsersFromDatabase()
  },[])

  return (
    <div className="app-container">
    <button onClick={()=>console.log(usersList)}>elo</button>
      {!isRegisterPanelOpened ? 
      <>
        { !isLoggedIn ? 
          <>
            <LoginPanel 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              usersList={usersList}
              setLoggedUser={setLoggedUser}
              user={loggedUser}
            />
            <button onClick={()=>openRegisterPanel(true)}>
              Don't have an account?
            </button>
          </>
          : 
          <>
            <ActualPage 
              userInterface={userInterface}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedUser={setLoggedUser}
              loggedUser={loggedUser}  
              waitValue={800}
              />
          </>
        }

        </>
        : 
        <>
          <RegisterPanel 
            usersList={usersList}
            user={loggedUser}
          />
          <button onClick={()=>openRegisterPanel(false)}>
            Already signed in?
          </button>
        </>
      }
    </div>
  )
}
export default App;
