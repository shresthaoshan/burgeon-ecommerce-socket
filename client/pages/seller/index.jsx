import { useState, useEffect } from 'react'

export default function(props) {
    useEffect(async () => {
        const token = await localStorage.getItem('token')

        if (!token) window.location.assign('seller/login')
    }, [])

    return <div>
        <h3>Seller Dashboard</h3>
    </div>
}