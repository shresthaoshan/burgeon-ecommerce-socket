import { useState, useEffect } from 'react'

export default function Index() {
    let [ token, tokenUpdater ] = useState('')
    
    useEffect(() => {
        const tkn = localStorage.getItem('token')

        if (!tkn) window.location.assign('seller/login')

        tokenUpdater(tkn)
    }, [token])

    return <div>
        <h3>Seller Dashboard</h3>
        <p>Token: {token}</p>
    </div>
}