import React from "react"
import { useEffect, useState } from "react"

const Hamburger = ({isNewTaskFormOpened, isNavMenuOpened, setIsNavMenuOpened, isSingleTaskOpened}:any) => {
    return (
            <div 
            className="hamburger"
            onClick={(e)=>{
                e.preventDefault()
                setIsNavMenuOpened(!isNavMenuOpened)}}
            style={isNewTaskFormOpened ? {width: '0px', transition: '.1s ease'} : isSingleTaskOpened ? {zIndex:'5'} : undefined}
            >
            <div className="hamburger__piece --top" style={isNavMenuOpened ? {top: '50%', rotate: '45deg', translate: '0 -50%',  transition: 'ease .2', backgroundColor: 'black'} : undefined}/>
            <div className="hamburger__piece --middle-left" style={isNavMenuOpened ? {height: '0px', width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --middle-right" style={isNavMenuOpened ? {height: '0px', width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --bottom" style={isNavMenuOpened ? { top: '50%', rotate: '-45deg', translate: '0 -50%', transition: 'ease .2s', backgroundColor: 'black'} : undefined}/>
        </div>
    )
}

const NavMenu = ({isNavMenuOpened}:any) => {

    return (
        <div className="nav-menu" style={isNavMenuOpened ? {height: '100%', transition: 'ease .5s', zIndex:'4'} : undefined}>
            {isNavMenuOpened && 
            <ul className="nav-menu__items">
                <li className="item">
                    Log out
                </li>
                <li className="item">
                    Log out
                </li>
                <li className="item">
                    Log out
                </li>
                <li className="item">
                    Log out
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