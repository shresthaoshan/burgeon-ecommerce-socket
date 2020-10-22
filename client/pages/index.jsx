import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import ShopTemplate from '../components/ShopTemplate'
import ProductCard from '../components/ProductCard'

import Axios from 'axios'
import Events from 'events'

import styles from '../styles/main.module.css'

export default function Index(props) {
    
    // let [ errorMessage, errorMessageUpdater ] = useState('')
    
    let [ products, productsHandler] = useState([])

    const EventHandler = new Events.EventEmitter()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        
        EventHandler.emit("token-found", { token })        
    }, [])
    
    EventHandler.on("token-found", async payload => {
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
    )
}