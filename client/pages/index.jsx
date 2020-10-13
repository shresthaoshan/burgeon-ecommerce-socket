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
            <h3>Hello world!!!</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet ipsum blanditiis debitis quia vitae quos, in a neque, dolorem quisquam repellendus explicabo quod veniam. Illum eveniet culpa fugiat ab veniam!</p>
        </ShopTemplate>
    )
}