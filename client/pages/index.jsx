import { useState, useEffect } from 'react'

export default function Index(props) {
    let [ message, messageUpdater ] = useState('')

    useEffect(() => {
        messageUpdater("Hello, world!!!")
    }, [])

    return(
        <div>
            <h3>{message}</h3>
        </div>
    )
}