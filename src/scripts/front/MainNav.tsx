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
            setFilteredTasks
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
            <NewTaskBtn
                isNewTaskFormOpened={isNewTaskFormOpened}
                setIsNewTaskFormOpened={setIsNewTaskFormOpened}
                isNavMenuOpened={isNavMenuOpened}
            />
            <Hamburger 
                setIsNavMenuOpened={setIsNavMenuOpened}
                isNavMenuOpened={isNavMenuOpened}
                isNewTaskFormOpened={isNewTaskFormOpened}
            />
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
            />
        </div>
    )
}

export default MainNav