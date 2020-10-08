import { useState } from 'react'

import Head from '../../components/Head'

import styles from '../../styles/users.module.css'

export default function Login() {
    let [ email, emailUpdater ] = useState('')
    let [ password, passwordUpdater ] = useState('')
    let [ error, errorUpdater ] = useState('')

    const login = (e) => {
        e.preventDefault()

        if (!email || !password) return errorUpdater('Both email and password are required.')

        alert("Logged in!!!")
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