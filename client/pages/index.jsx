import { useState, useEffect } from 'react'
import Head from '../components/Head'

export default function Index(props) {
    let [ message, messageUpdater ] = useState('')

    useEffect(() => {
        messageUpdater("Hello, world!!!")
    }, [])

    return(
        <div>
            <Head title="Home" />
            <h3>{message}</h3>
        </div>
    )
}