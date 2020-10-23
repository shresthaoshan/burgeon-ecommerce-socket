import { useContext } from 'react'

import User from './contexts/User'

import styles from '../styles/navbar.module.css'

import SearchBox from './SearchBox'

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
                    <li><a href="/profile"><i title="Profile" className="fa fa-user"></i></a></li>
                    { userLoggedIn && <li><a href="/cart"><i title="Cart" className="fa fa-opencart"></i></a></li> }
                    { !userLoggedIn && <li><a href="/login"><button>Login</button></a></li> }
                </ul>
            </div>
        </nav>
    </div>
}