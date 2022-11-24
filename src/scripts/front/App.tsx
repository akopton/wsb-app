import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import MainSite from "./MainSite";
import * as React from "react";
import { time, timeEnd, timeStamp } from "console";

const App = () => {
  interface UserInterface {
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
  }

 const defaultUser: UserInterface = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
  }

  const [isRegisterPanelOpened, openRegisterPanel] = useState(Boolean)
  const [usersList, setUsersList] = useState<[]>([])
  const [loggedUser, setLoggedUser] = useState(defaultUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)



  const getUsersFromDatabase = async () => {
    fetch('http://127.0.0.1:8888/users')
      .then((data?) => data.json())
      .then((res?) => setUsersList(res))
  }

  useEffect(()=>{
    getUsersFromDatabase()
  },[])

  return (
    <div className="app-container">
      {!isRegisterPanelOpened ? 
      <>
        { !isLoggedIn ? 
          <div className="panel__wrapper">
            <LoginPanel 
              setLoggedUser={setLoggedUser}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              defaultUser={defaultUser}
              usersList={usersList}
            />
            <button 
              className="panel-swtich-btn"
              onClick={()=>openRegisterPanel(true)} 
              >
              Don't have an account?
            </button>
          </div>
          : 
            <MainSite 
              defaultUser={defaultUser}
              loggedUser={loggedUser}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedUser={setLoggedUser}
              usersList={usersList}
              />
        }

        </>
        : 
        <div className="panel__wrapper">
          <RegisterPanel 
            usersList={usersList}
            defaultUser={loggedUser}
            getUsersFromDatabase={getUsersFromDatabase}
            setUsersList={setUsersList}
          />
          <button 
            className="panel-swtich-btn"
            onClick={()=>openRegisterPanel(false)}>
            Already signed in?
          </button>
        </div>
      }
    </div>
  )
}
export default App;
