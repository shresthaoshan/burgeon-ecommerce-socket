import { useContext, useEffect, useState } from 'react'

import User from './contexts/User'
import Notifications from './contexts/Notifications'

import styles from '../styles/navbar.module.css'

import SearchBox from './SearchBox'
import Router from 'next/router'

export default function Navbar(props) {
    const userLoggedIn = useContext(User)
    return <div className={styles.navbar}>
        <nav>
            <div className={styles.logo}>
                <a href="/">
                    <img src="/images/logo.png" alt="logo"/>
                </a>
            </div>

            <SearchBox />

            <div className={styles.menu}>
                <ul>
                    <li><a href="/categories"><i title="Categories" className="fa fa-layer-group"></i></a></li>
                    { userLoggedIn && <ProfileIcon />}
                    { userLoggedIn && <NotificationIcon /> }
                    { userLoggedIn && <li><a href="/cart"><i title="Cart" className="fa fa-opencart"></i></a></li> }
                    { !userLoggedIn && <li><a href="/login"><button>Login</button></a></li> }
                </ul>
            </div>
        </nav>
    </div>
}

const ProfileIcon = () => {
    let [ dropdownActive, dropdownStateTracker ] = useState(false)

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem("user-token")
        Router.push('/login')
    }
    
    return <li style={{position: "relative"}}>

        <i onClick={e => dropdownStateTracker(!dropdownActive)} style={{cursor: "pointer"}} className="fa fa-user"></i>
        
        <div className={dropdownActive ? styles.dropdown : styles.dropdownHidden}>
            <a href="/profile"><li>Profile</li></a>
            <a href="/settings"><li>Setting</li></a>
            <hr/>
            <a onClick={logout} href="/logout"><li>Logout</li></a>
        </div>
    </li>
}

const NotificationIcon = () => {
    const notificationCount = useContext(Notifications)

    const icon = () => notificationCount.length ? "fas fa-bell" : "far fa-bell"
    const notificationStyle = () => notificationCount.length ? {color: "#32cd32"} : {}

    return <li style={{position: "relative", cursor: "pointer"}}>
        <i style={notificationStyle()} className={icon()}></i>
        { notificationCount.length ? <NotificationBadge /> : null }
    </li>
}

const NotificationBadge = () => {
    return <div className={styles.notificationBadge}>
        <div className={styles.signal}></div>
    </div>
}