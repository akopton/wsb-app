import SearchBar from "./SearchBar"
import NewTask from "./AddTask"
import Nav from "./NavMenu"
const { NewTaskBtn, NewTaskForm} = NewTask
const { Hamburger, NavMenu } = Nav

const MainNav = (
        {
            searchValue, 
            setSearchValue, 
            handleSearch, 
            isNewTaskFormOpened, 
            setIsNewTaskFormOpened, 
            isNavMenuOpened, 
            setIsNavMenuOpened, 
            usersList, 
            tasks, 
            setTasks, 
            loggedUser, 
            setLoggedUser, 
            defaultUser, 
            setIsLoggedIn, 
            setShowUserTasks, 
            filteredTasks, 
            setFilteredTasks,
            windowWidth,
            setIsSettingsOpened,
            isSettingsOpened,
            setIsAdminPanelOpened
        }: any
    ) => {

    return (
        <div className='main-nav'>
                    <SearchBar
                        tasks={tasks}
                        handleSearch={handleSearch}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        filteredTasks={filteredTasks}
                        setFilteredTasks={setFilteredTasks}
                    />
                    <div className="buttons-wrapper">
                        <NewTaskBtn
                            isNewTaskFormOpened={isNewTaskFormOpened}
                            setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                            isNavMenuOpened={isNavMenuOpened}
                            windowWidth={windowWidth}
                        />
                        <Hamburger 
                            setIsNavMenuOpened={setIsNavMenuOpened}
                            isNavMenuOpened={isNavMenuOpened}
                            isNewTaskFormOpened={isNewTaskFormOpened}
                        />
                    </div>
                    {isNewTaskFormOpened && 
                        <NewTaskForm
                            setIsFormOpened={setIsNewTaskFormOpened}
                            usersList={usersList}
                            tasks={tasks}
                            setTasks={setTasks}
                            loggedUser={loggedUser}
                        />
                    }
                    <NavMenu
                        isNavMenuOpened={isNavMenuOpened}
                        setIsLoggedIn={setIsLoggedIn}
                        setLoggedUser={setLoggedUser}
                        defaultUser={defaultUser}
                        setShowUserTasks={setShowUserTasks}
                        windowWidth={windowWidth}
                        setIsSettingsOpened={setIsSettingsOpened}
                        loggedUser={loggedUser}
                        setIsAdminPanelOpened={setIsAdminPanelOpened}
                    />
        </div>
    )
}

export default MainNav