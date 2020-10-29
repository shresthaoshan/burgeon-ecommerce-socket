import { useContext, useEffect, useState } from 'react'

import User from './contexts/User'
import Notifications from './contexts/Notifications'
import Cart from './contexts/Cart'

import styles from '../styles/navbar.module.css'

import SearchBox from './SearchBox'
import Router from 'next/router'
import SocketConnection from './contexts/SocketConnection'

export default function Navbar() {
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
                    { userLoggedIn && <CartIcon /> }
                    { !userLoggedIn && <li><a href="/login"><button>Login</button></a></li> }
                </ul>
            </div>
        </nav>
    </div>
}

const ProfileIcon = () => {
    let [ dropdownActive, dropdownStateTracker ] = useState(false)
    const socket = useContext(SocketConnection)

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem("user-token")

        socket.disconnect()

        Router.push('/login')
    }
    
    return <li onClick={e => dropdownStateTracker(!dropdownActive)} style={{position: "relative"}}>

        <i style={{cursor: "pointer"}} className="fa fa-user"></i>
        
        <div className={dropdownActive ? styles.dropdown : styles.dropdownHidden}>
            <ul>
                <a href="/profile"><li>Profile</li></a>
                <a href="/settings"><li>Setting</li></a>
                <hr/>
                <a onClick={logout} href="/logout"><li>Logout</li></a>
            </ul>
        </div>
    </li>
}

const NotificationIcon = () => {
    const notifications = useContext(Notifications)
    let [ dropdownActive, dropdownStateTracker ] = useState(false)

    const icon = () => notifications.length ? "fas fa-bell" : "far fa-bell"
    const notificationStyle = () => notifications.length ? {color: "#32cd32"} : {}

    return <li onClick={e => dropdownStateTracker(!dropdownActive)} style={{position: "relative", cursor: "pointer"}}>
        <i style={notificationStyle()} className={icon()}></i>
        { notifications.length ? <NotificationBadge /> : null }

        <div className={dropdownActive ? `${styles.dropdown} ${styles.notificationDropdown}` : styles.dropdownHidden}>
            <ul>
                {
                    notifications.map((item, i) => <li key={i}>{ item }</li>)
                }
            </ul>
        </div>
    </li>
}

const NotificationBadge = () => {
    return <div className={styles.notificationBadge}>
        <div className={styles.signal}></div>
    </div>
}

const CartIcon = () => {
    const cartItems = useContext(Cart)
    return <li style={{position: "relative"}}>
        <a href="/cart">
            <i title="Cart" className="fa fa-opencart"></i>

            <div className={styles.notificationBadge}>
                {
                    cartItems.length  ? 
                    <div className={`${styles.signal} ${styles.cartBadge}`}>
                        <b>{cartItems.length}</b>
                    </div>
                    : null
                }
            </div>
        </a>

    </li>
}