import React, { useEffect, useState } from 'react'
import { TTask } from '../interfaces/taskInterface'

const SearchBar = ({tasks, setSearchValue, searchValue}:any) => {
    const [showTooltip, setShowToolTip] = useState<boolean>(false)

    const handleShowTooltip = () => {
        if (searchValue) {
            setShowToolTip(false) 
            return
        }
        setShowToolTip(true)
    }

    const handleTaskToFind = (e: any) => {
        setSearchValue(e.target.value)
    }
    

    useEffect(()=>{
        handleShowTooltip()
    },[searchValue])

    return (
        <div className="searchbar__wrapper">
            <input 
                className="searchbar" 
                placeholder="Find task..."
                value={searchValue}
                onChange={handleTaskToFind}
            />
            <div className='searchbar-tooltip' style={{display: showTooltip ? 'block' : 'none'}}>
                search by task id{tasks.length && `, eg. ${tasks[0].innerId}`}
            </div>
        </div>
    )
}

export default SearchBar