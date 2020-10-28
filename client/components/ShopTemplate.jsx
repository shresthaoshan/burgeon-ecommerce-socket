import { Fragment, useEffect, useState } from 'react'
import io from 'socket.io-client'

import Head from './Head'
import Navbar from './Navbar'

import styles from '../styles/template.module.css'

import { ToastContainer } from 'react-toastify'

import User from '../components/contexts/User'
import Notifications from '../components/contexts/Notifications'
import SocketConnection from './contexts/SocketConnection'

export default function ShopTemplate(props) {
    let [ token, tokenHandler ] = useState('')
    let [ Socket, SocketHandler ] = useState('')
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

        SocketHandler(SocketI)

        tokenHandler(tk)
    }, [])
    
    return <SocketConnection.Provider socket={Socket}>
            <Head title={props.title} />

            <User.Provider value={token && true} >
                <Notifications.Provider value={notifications}>
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
    </SocketConnection.Provider>
}