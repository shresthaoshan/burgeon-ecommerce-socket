import { Fragment, useEffect, useState } from 'react'

import Head from './Head'
import Navbar from './Navbar'

import styles from '../styles/template.module.css'

import { ToastContainer } from 'react-toastify'

import User from '../components/contexts/User'
import Notifications from '../components/contexts/Notifications'

export default function ShopTemplate(props) {
    let [ token, tokenHandler ] = useState('')

    useEffect(() => {
        const tk = localStorage.getItem("user-token")

        tokenHandler(tk)
    }, [])
    
    return <Fragment>
            <Head title={props.title} />

            <User.Provider value={token && true} >
                <Notifications.Provider value={[]}>
                    <Navbar />
                </Notifications.Provider>

                <main className={styles.container}>
                    {
                        props.children
                    }
                </main>
            </User.Provider>

            <ToastContainer
                position="bottom-right"
                newestOnTop={true}
            />

            <script src="https://kit.fontawesome.com/25c1aa0c81.js" crossOrigin="anonymous" />
    </Fragment>
}