import { useEffect, useState } from "react";
import RegisterPanel from './RegisterPanel';
import LoginPanel from "./LoginPanel";
import MainSite from "./MainSite";
import { TUser } from "../interfaces/userInterface";

const defaultUser: TUser = {
  firstName: '',
  lastName: '',
  email: '',
  login: '',
  password: '',
  role: 'user',
  settings: {
    taskDaysLeft: 7
  }
} 

const App = () => {
  const [loggedUser, setLoggedUser] = useState<TUser>(defaultUser)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  
  const [isRegisterPanelOpened, setIsRegisterPanelOpened] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  


    const handleWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleWindowWidth)
    },[window.innerWidth])

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
                  Jeszcze nie zarejestrowany?<br/>
                  Możesz to zrobić naciskając przycisk poniżej!
                </span>
                <button 
                  className="panel-switch-btn btn"
                  onClick={()=>setIsRegisterPanelOpened(true)} 
                >
                  Zarejestruj się
                </button>
              </div>
            </div>
            : 
            <MainSite 
              loggedUser={loggedUser}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedUser={setLoggedUser}
              defaultUser={defaultUser}
              windowWidth={windowWidth}
            />
          }
        </>
        : 
        <div className="register-site">
          <RegisterPanel defaultUser={defaultUser} setIsRegisterPanelOpened={setIsRegisterPanelOpened}/>
          <div className="site-aside">
            <span>Masz już konto?</span>
            <button 
              className="panel-switch-btn btn"
              onClick={()=>setIsRegisterPanelOpened(false)}>
              Zaloguj się
            </button>
          </div>
        </div>
      }
    </div>
  )
}
export default App;
