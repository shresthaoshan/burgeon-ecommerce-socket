import { Fragment, useEffect, useState } from 'react'
import io from 'socket.io-client'

import Head from './Head'
import Navbar from './Navbar'

import styles from '../styles/template.module.css'

import { ToastContainer, toast } from 'react-toastify'

import User from './contexts/User'
import Notifications from './contexts/Notifications'
import Cart from './contexts/Cart'
import SocketConnection from './contexts/SocketConnection'

export default function ShopTemplate(props) {
    let [ token, tokenHandler ] = useState('')
    let [ notifications, notificationHandler] = useState([])
    let [ socket, socketHandler ] = useState(null)
    let [ cart, cartHandler ] = useState([])

    useEffect(() => {
        const tk = localStorage.getItem("user-token")

        const SocketI = io('/socket', { query: { token: tk } })

        SocketI.on('notification', socket => {
            notificationHandler([ socket.message, ...notifications ])
        })
    
        SocketI.on("processing-error", (err) => {
            toast.error(err.message)
        })

        SocketI.on("cart-added", data => {
            const { cartItems } = data

            cartHandler(cartItems)

            toast.info(`Item added to cart successfully.`)
        })

        SocketI.on("cart-items", data => {
            const { cartItems } = data
            cartHandler(cartItems)
        })
        
        socketHandler(SocketI)

        tokenHandler(tk)
    }, [])
    
    return <Fragment>
            <Head title={props.title} />

            <User.Provider value={token && true} >
                
                <SocketConnection.Provider value={socket}>
                    <Notifications.Provider value={notifications}>
                        <Cart.Provider value={cart} >
                            <Navbar />
                        </Cart.Provider>
                    </Notifications.Provider>

                    <main className={styles.container}>
                        {
                            props.children
                        }
                    </main>
                </SocketConnection.Provider>
            </User.Provider>

            <ToastContainer
                position="bottom-right"
                newestOnTop={true}
            />

            <script src="https://kit.fontawesome.com/25c1aa0c81.js" crossOrigin="anonymous" />
    </Fragment>
}