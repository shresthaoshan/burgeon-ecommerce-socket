import { Fragment, useEffect, useState } from 'react'
import io from 'socket.io-client'

import Head from './Head'
import Navbar from './Navbar'

import styles from '../styles/template.module.css'

import { ToastContainer } from 'react-toastify'

import User from './contexts/User'
import Notifications from './contexts/Notifications'
import Cart from './contexts/Cart'

export default function ShopTemplate(props) {
    let [ token, tokenHandler ] = useState('')
    let [ notifications, notificationHandler] = useState([])

    useEffect(() => {
        const tk = localStorage.getItem("user-token")

        const SocketI = io('/', { query: { token: tk } })

        SocketI.on('notification', socket => {
            notificationHandler([ socket.message, ...notifications ])
        })
    
        SocketI.on("error", () => {
            console.log("Error: ws")
        })

        tokenHandler(tk)
    }, [])
    
    return <Fragment>
            <Head title={props.title} />

            <User.Provider value={token && true} >
                <Notifications.Provider value={notifications}>
                    <Cart.Provider value={8} >
                        <Navbar />
                    </Cart.Provider>
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