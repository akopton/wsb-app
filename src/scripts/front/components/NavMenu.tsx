const Hamburger = ({isNewTaskFormOpened, isNavMenuOpened, setIsNavMenuOpened, isSingleTaskOpened}:any) => {
    return (
        <div 
            className="hamburger"
            onClick={(e)=>{
                e.preventDefault()
                setIsNavMenuOpened(!isNavMenuOpened)}}
            style={isNewTaskFormOpened ? 
                    {width: '0px', transition: '.1s ease'} 
                    : isSingleTaskOpened ? 
                    {zIndex:'5'} 
                    : undefined
                }
        >
            <div className="hamburger__piece --top" style={isNavMenuOpened ? {top: '50%', rotate: '45deg', translate: '0 -50%',  transition: 'ease .2', backgroundColor: 'black'} : undefined}/>
            <div className="hamburger__piece --middle-left" style={isNavMenuOpened ? {height: '0px', width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --middle-right" style={isNavMenuOpened ? {height: '0px', width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --bottom" style={isNavMenuOpened ? { top: '50%', rotate: '-45deg', translate: '0 -50%', transition: 'ease .2s', backgroundColor: 'black'} : undefined}/>
        </div>
    )
}

const NavMenu = ({isNavMenuOpened, setLoggedUser, setIsLoggedIn, defaultUser, setShowUserTasks, windowWidth, setIsSettingsOpened, loggedUser, setIsAdminPanelOpened}:any) => {

    const handleLogout = () => {
        setLoggedUser(defaultUser)
        setIsLoggedIn(false)
    }

    const handleUserTasks = () => {
        setShowUserTasks(true)
    }

    const handleAllTasks = () => {
        setShowUserTasks(false)
    }

    const handleOpenSettings = () => {
        setIsSettingsOpened(true)
    }

    const handleOpenAdminPanel = () => {
        setIsAdminPanelOpened(true)
    }

    return (
        <div className="nav-menu" style={isNavMenuOpened ? {height: '100%', transition: 'ease .5s'} : undefined}>
            {isNavMenuOpened && 
            <ul className="nav-menu__items">
                <li 
                    className="item"
                    onClick={handleUserTasks}
                >
                    Twoje zadania
                </li>
                <li 
                    className="item"
                    onClick={handleAllTasks}
                >
                    Wszystkie zadania
                </li>
                <li 
                    className="item"
                    onClick={handleOpenSettings}
                >
                    Ustawienia
                </li>
                {
                    loggedUser.role === 'admin' ? <li className="item" onClick={handleOpenAdminPanel}>Panel administratora</li>: null
                }
                <li 
                    className="item"
                    onClick={handleLogout}
                >
                    Wyloguj
                </li>
            </ul>
            }
        </div>
    )
}

const Nav = {
    Hamburger: Hamburger,
    NavMenu: NavMenu
}

export default Nav