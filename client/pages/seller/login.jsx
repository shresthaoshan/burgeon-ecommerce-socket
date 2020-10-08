import { useState } from 'react'
import Axios from 'axios'

import Head from '../../components/Head'

import styles from '../../styles/users.module.css'

export default function Login() {
    let [ email, emailUpdater ] = useState('')
    let [ password, passwordUpdater ] = useState('')
    let [ error, errorUpdater ] = useState('')

    const login = async e => {
        e.preventDefault()

        if (!email || !password) return errorUpdater('Both email and password are required.')

        errorUpdater('')

        try {
            let loggedIn = await Axios({
                method: 'POST',
                url: '/api/user/login',
                data: {
                    email, password
                }
            })

            const { message, token } = loggedIn.data

            if (!token) return errorUpdater("There must've been some issue on the server.")

            localStorage.setItem("token", token)
            
            window.location.assign('/seller')

        } catch (e) {
            if (e.response.data) return errorUpdater(e.response.data.message)
            errorUpdater("There was an error while attempting to login.")
        }
    }

    return <div>
        <Head title="Login - Seller" />
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/images/logo.png" alt="logo"/>
            </div>
            
            <form className={styles.form} onSubmit={login}>
                <h3>Seller - Login</h3>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" tabIndex={1}
                value={email} onChange={e => emailUpdater(e.target.value)} />
                
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" tabIndex={2} minLength={8}
                value={password} onChange={e => passwordUpdater(e.target.value)} />

                {
                    error && <p className={styles.errorMessage}>{error}</p>
                }

                <button tabIndex={3} type="submit">Log in</button>
            </form>
        </div>
    </div>
}