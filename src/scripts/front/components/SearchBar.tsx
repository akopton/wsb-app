import { useEffect, useState } from 'react'

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
                placeholder="Znajdź..."
                value={searchValue}
                onChange={handleTaskToFind}
            />
            <div className='searchbar-tooltip' style={{display: showTooltip ? 'block' : 'none'}}>
                Kryteria wyszukiwania: ID, tytuł, imię i nazwisko
            </div>
        </div>
    )
}

export default SearchBar