import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import MainSite from "./MainSite";

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



  

  return (
    <div className="app-container">
      {!isRegisterPanelOpened ? 
        <>
          {!isLoggedIn ? 
            <div className="logging-site">
              <LoginPanel 
                setLoggedUser={setLoggedUser}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                defaultUser={defaultUser}
                setUsersList={setUsersList}
                usersList={usersList}
              />
              <div className="site-aside">
                <span>
                  Still not registered?<br/>
                  You can do this by clicking button below!
                </span>
                <button 
                  className="panel-switch-btn btn"
                  onClick={()=>openRegisterPanel(true)} 
                >
                  Register here
                </button>
              </div>
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
            // getUsersFromDatabase={getUsersFromDatabase}
            setUsersList={setUsersList}
          />
          <button 
            className="panel-swtich-btn"
            onClick={()=>openRegisterPanel(false)}>
            Already registered?
          </button>
        </div>
      }
    </div>
  )
}
export default App;
