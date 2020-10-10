import Events from 'events'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'

import io from 'socket.io-client'

import Head from '../../components/Head'

import styles from '../../styles/dashboard.module.css'

export default function Index() {
    let [ token, tokenUpdater ] = useState('')
    let [ error, errorUpdater ] = useState('')
    let [ inventory, inventoryUpdater ] = useState([])

    const router = useRouter()

    const watcher = new Events.EventEmitter()

    watcher.on("token", async payload => {
        Axios.interceptors.request.use((cfg) => {
            const Authorization = `Bearer ${payload.token}`
            cfg.headers.Authorization = Authorization
            return cfg
        })

        const socket = io('http://localhost:3000')

        socket.on("welcome", data => {
            console.log(data)
        })

        await getProducts()
    })

    const getProducts = async function() {
        try {
            const products = await Axios({
                method: 'GET',
                url: '/api/inventory'
            })

            console.log(products.data.products)

            inventoryUpdater([...products.data.products,...products.data.products])
        } catch (e) {
            console.log(e)
            errorUpdater(e.response.data.message || "There was an error updating the page.\nPlease refresh.")
        }
    }
    
    useEffect(() => {
        const tkn = localStorage.getItem('token')

        if (!tkn) window.location.assign('seller/login')

        tokenUpdater(tkn)

        watcher.emit("token", { token: tkn })
    }, [])

    return <div>
        <Head />
        <h3>Seller Dashboard</h3>

        <div style={{color: "red"}}>
            <p>{error}</p>
        </div>

        <div className="inventory">
            Total no. of Products: {inventory.length}

            <div className={styles.cardsContainer}>

                {
                    inventory.length && inventory.map((item, i) => {
                        return <div key={i} className={styles.card}>
                            <h4 className={styles.cardTitle}>{item.name}</h4>
                            <span className={styles.cardBrand}>{item.brand}</span><br/>
                            <p className={styles.cardDescription}>{item.description}</p>

                            <span>Price: Rs.{item.price}</span><br/>
                            <span className="inStock">Stock left: {item.inStock}</span>
                        </div>
                    })
                }
                {
                    !inventory.length && <h3>No products published yet.</h3>
                }
            </div>
            
        </div>
    </div>
}