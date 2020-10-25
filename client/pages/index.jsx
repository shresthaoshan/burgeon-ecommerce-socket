import { useState, useEffect, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import ShopTemplate from '../components/ShopTemplate'
import ProductCard from '../components/ProductCard'

import Axios from 'axios'
import Events from 'events'

import styles from '../styles/main.module.css'

export default function Index() {    
    let [ products, productsHandler] = useState([])

    useEffect(() => {
        fetchProduct()
    }, [])
    const fetchProduct = async () => {
        try {
            let prds = await Axios({
                method: "GET",
                url: "/api/products/getAllProducts"
            })
            console.log(prds.data)
            productsHandler(prds.data.productList)
            setTimeout(() => toast.info(`${prds.data.productList.length} items fetched.`), 1000)
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