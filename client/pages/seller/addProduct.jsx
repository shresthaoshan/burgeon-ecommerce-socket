import { useState, useEffect, Fragment } from 'react'
import Events from 'events'
import styles from '../../styles/dashboard.module.css'

import Head from '../../components/Head'
import Axios from 'axios'


export default function addProduct() {
    let [ categories, updateCategories ] = useState([])
    let [ error, errorDispatcher ] = useState('')

    let [name, nameUpdater] = useState('')
    let [price, priceUpdater] = useState('')
    let [category, categoryUpdater] = useState('')
    let [brand, brandUpdater] = useState('')
    let [initialStock, initialStockUpdater] = useState('')
    let [description, descriptionUpdater] = useState('')

    const getAndSetCategories = () => {
        Axios({
            method: 'GET',
            url: '/api/categories'
        }).then(resp => {
            const { data } = resp

            updateCategories(data.categories)
            categoryUpdater(data.categories[0].name)
        }).catch(e => {
            console.log(e)
            errorDispatcher("Error loading data.")
        })
    }

    const setAxiosHeaders = (token) => {
        Axios.interceptors.request.use(cfg => {
            cfg.headers.Authorization = `Bearer ${token}`

            return cfg
        })
    }

    const updateInventory = (e) => {
        e.preventDefault()

        const data = {
            name, price, brand, description,
            inStock: initialStock,
            category: categories.filter(cat => cat.name == category)[0]._id
        }

        Axios({
            method: 'POST',
            url: '/api/products/addProduct',
            data
        }).then(resp => {
            const { data } = resp

            if (data.message == 'Product added successfully.') {
                window.location.assign('/seller')
            } else {
                errorDispatcher(data.message)
            }
        }).catch(e => {
            console.log(e)
            errorDispatcher(e)
        })
    }

    useEffect(() => {
        getAndSetCategories()

        const tkn = localStorage.getItem("token")

        if (!tkn) window.location.assign("/seller/login")

        setAxiosHeaders(tkn)
    }, [])
    
    return (
        <div className={styles.container}>
            <Head title="Update Inventory"></Head>

            <main>
                <h3>Add Inventory</h3>

                <form className={`${styles.card} ${styles.form}`} onSubmit={updateInventory}>
                        
                    <InputField name="name" placeholder="Name of the product" value={name} updater={nameUpdater} required={true} />

                    <InputField name="price" placeholder="Cost per unit" value={price} updater={priceUpdater} required={true} />

                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={e => categoryUpdater(e.target.value)}>
                        <option value="null" disabled>--- Choose one category ---</option>
                        {
                            categories.map((item, i) => <option value={item.name} key={i}>{item.name}</option>)
                        }
                    </select>

                    <InputField name="brand" placeholder="Brand of the product" value={brand} updater={brandUpdater} />

                    <InputField name="stock" placeholder="Initial stock" value={initialStock} updater={initialStockUpdater} />

                    <label htmlFor="description">Product description</label>
                    <textarea name="description" id="description" cols="30" rows="5" placeholder="Description for the product"
                    value={description} onChange={e => descriptionUpdater(e.target.value)}></textarea>

                    <div className={styles.submitter}>
                        <button type="submit">Update Inventory</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

const InputField = props => {
    return <Fragment>
        <label htmlFor={props.name}>{props.name}</label>
        <input type={props.type || "text"} name={props.name} id={props.name} placeholder={props.placeholder} required={props.required && true}
        value={props.value} onChange={e => props.updater(e.target.value)} />
    </Fragment>
}