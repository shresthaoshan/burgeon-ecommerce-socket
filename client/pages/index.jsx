import { useState, useEffect, createContext, Fragment } from 'react'
import { toast } from 'react-toastify'

import ShopTemplate from '../components/ShopTemplate'
import ProductCard from '../components/ProductCard'

import Axios from 'axios'

import styles from '../styles/main.module.css'

export default function Index() {    
    let [ products, productsHandler] = useState([])
    let [ fetching, fetchStateTracker ] = useState(true)

    useEffect(() => {
        fetchProduct()
    }, [])
    const fetchProduct = async () => {
        try {
            const prds = await Axios({
                method: "GET",
                url: "/api/products/getAllProducts"
            })

            const { productList } = prds.data

            fetchStateTracker(false)
            
            productsHandler(productList)
            
            !productList.length && toast.error("Failed to fetch any product. We are very sorry for the inconvenience.")

        } catch (e) {
            fetchStateTracker(false)
            toast.error("There was a problem fetching data from the server.")
        }
    }

    return(
        <ShopTemplate>
            { fetching ? <FetchingData /> :
                products.length ? <ProductShowcase products={products} />
                    : <NoProductFetched /> }
        </ShopTemplate>
    )
}

const FetchingData = () => {
    return <Fragment>
        <div className="loading">
            <i className="fa fa-spinner"></i>
        </div>
    </Fragment>
}


const ProductShowcase = props => {
    const { products } = props
    return <Fragment>
        <h1>Available Products</h1>
        <div className={styles.productShowcase}>
            {
                products.map((prod, i) => {
                    return <ProductCard details={prod} key={i} />
                })
            }
        </div>
    </Fragment>
}

const NoProductFetched = () => {
    return <Fragment>
        <h3>Sorry, products could not be fetched.</h3>
        <p>This should be an error on our end. We will look into it very soon.</p>
    </Fragment>
}