import styles from '../styles/navbar.module.css'

import SearchBox from './SearchBox'

export default function Navbar(props) {
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
                    <li><a href="/cart"><i title="Cart" className="fa fa-opencart"></i></a></li>
                </ul>
            </div>
        </nav>
    </div>
}