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
            <h3>Hello world!!</h3>
        </ShopTemplate>
    )
}