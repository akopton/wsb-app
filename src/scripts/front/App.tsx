import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import MainSite from "./MainSite";
import * as React from "react";
import { time, timeEnd, timeStamp } from "console";

const App = () => {
  interface UserInterface {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    allTasks: Array<[]>,
  }

 const defaultUser: UserInterface = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    allTasks: [],
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
    {/* <button onClick={()=>console.log(usersList)}>elo</button> */}
      {!isRegisterPanelOpened ? 
      <>
        { !isLoggedIn ? 
          <div className="panel__wrapper">
            <LoginPanel 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              usersList={usersList}
              setLoggedUser={setLoggedUser}
              defaultUser={defaultUser}
            />
            <button onClick={()=>openRegisterPanel(true)}>
              Don't have an account?
            </button>
          </div>
          : 
          <>
            <MainSite 
              defaultUser={defaultUser}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedUser={setLoggedUser}
              loggedUser={loggedUser}
              waitValue={800}
              usersList={usersList}
              />
          </>
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
          <button onClick={()=>openRegisterPanel(false)}>
            Already signed in?
          </button>
        </div>
      }
    </div>
  )
}
export default App;
