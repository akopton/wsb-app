import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import MainSite from "./MainSite";

const App = () => {

  type TUser = {
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
  }

 const defaultUser: TUser = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
  }

  const [isRegisterPanelOpened, setIsRegisterPanelOpened] = useState<boolean>(false)
  const [loggedUser, setLoggedUser] = useState<{}>(defaultUser)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className="app-container">
      {!isRegisterPanelOpened ? 
        <>
          {!isLoggedIn ? 
            <div className="logging-site">
              <LoginPanel 
                setLoggedUser={setLoggedUser}
                setIsLoggedIn={setIsLoggedIn}
              />
              <div className="site-aside">
                <span>
                  Still not registered?<br/>
                  You can do this by clicking button below!
                </span>
                <button 
                  className="panel-switch-btn btn"
                  onClick={()=>setIsRegisterPanelOpened(true)} 
                >
                  Register here
                </button>
              </div>
            </div>
            : 
            <MainSite 
              loggedUser={loggedUser}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedUser={setLoggedUser}
              defaultUser={defaultUser}
              TUser
            />
          }
        </>
        : 
        <div className="register-site">
          <RegisterPanel defaultUser={defaultUser}/>
          <div className="site-aside">
            <span>Already have an accout?</span>
            <button 
              className="panel-switch-btn btn"
              onClick={()=>setIsRegisterPanelOpened(false)}>
              Sign in
            </button>
          </div>
        </div>
      }
    </div>
  )
}
export default App;
