import React from "react"
import { useEffect, useState } from "react"

const Hamburger = ({isNavMenuOpened, setIsNavMenuOpened}:any) => {
    return (
        <div 
            className="hamburger"
            onClick={()=>{setIsNavMenuOpened(!isNavMenuOpened)}}>
            <div className="hamburger__piece --top" style={isNavMenuOpened ? {transform: 'rotate(45deg) translateY(-50%)' , top: '50%', transition: 'ease .2'} : undefined}/>
            <div className="hamburger__piece --middle-left" style={isNavMenuOpened ? {width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --middle-right" style={isNavMenuOpened ? {width: '0', transition: 'ease .2s'} : undefined}/>
            <div className="hamburger__piece --bottom" style={isNavMenuOpened ? {transform: 'rotate(-45deg) translateY(50%)', bottom: '50%', transition: 'ease .2s'} : undefined}/>
        </div>
    )
}

const NavMenu = () => {

    return (
        <div className="nav-menu"></div>
    )
}

const Nav = {
    Hamburger: Hamburger,
    NavMenu: NavMenu
}

export default Nav