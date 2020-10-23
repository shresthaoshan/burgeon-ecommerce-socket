import { useState, useEffect, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import ShopTemplate from '../components/ShopTemplate'
import ProductCard from '../components/ProductCard'

import Axios from 'axios'
import Events from 'events'

import styles from '../styles/main.module.css'

import User from '../components/contexts/User'

export default function Index(props) {
    
    // let [ errorMessage, errorMessageUpdater ] = useState('')
    
    let [ products, productsHandler] = useState([])
    let [ tk, tkHandler ] = useState('')

    const EventHandler = new Events.EventEmitter()
    
    useEffect(() => {
        const token = localStorage.getItem("user-token")
        
        EventHandler.emit("token-found", { token })        
    }, [])
    
    EventHandler.on("token-found", async payload => {
        tkHandler(payload.token)
        await fetchProduct(payload.token)
    })

    const fetchProduct = async (token) => {
        try {
            let prds = await Axios({
                method: "GET",
                url: "/api/products/getAllProducts"
            })
            console.log(prds.data)
            productsHandler(prds.data.productList)
            toast("Products fetched successfully.")
        } catch (e) {
            toast.info("There was a problem fetching data from the server.")
        }
    }

    return(
        <User.Provider value={tk}>
            <ShopTemplate>
                {
                    products && <h1>Available Products</h1>
                }
                
                <div className={styles.productShowcase}>
                    {
                        products.map((prod, i) => {
                            return <ProductCard details={prod} key={i} />
                        })
                    }
                </div>
                
            </ShopTemplate>
        </User.Provider>
    )
}