import { useState, useEffect } from 'react'
import ShopTemplate from '../components/ShopTemplate'


export default function Index(props) {
    let [ message, messageUpdater ] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token")

        messageUpdater("Hello, world!!!")
    }, [])

    return(
        <ShopTemplate>
            <h3>{ message }</h3>
            <p>System Environent: { process.env.NODE_ENV }</p>
            <p>Testing Continous Deployment (CD) with Github Actions!</p>
        </ShopTemplate>
    )
}