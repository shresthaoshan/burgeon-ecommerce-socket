import { useState, Fragment } from 'react'

import Axios from 'axios'
import Router from 'next/router'

import DefaultTemplate from '../components/DefaultTemplate'

import styles from '../styles/login.module.css'

export default function Login() {
    let [ email, emailUpdater ] = useState("")
    let [ password, passwordUpdater ] = useState("")
    let [ error, errorDispatcher ] = useState("")
    let [ troubleLoggingIn, logInHelper ] = useState(false)
    let [ loading, loadTracker ] = useState(false)

    const login =  async ev => {
        ev.preventDefault()

        if (!email || !password)
            return errorDispatcher("Fill in all the fields.")

        loadTracker(true)
        errorDispatcher("")
        
        Axios({
            method: 'POST', url: '/api/user/login',
            data: { email, password }})
        .then(response => {
            const { data } = response

            loadTracker(false)

            if (data.token) {
                localStorage.setItem("user-token", data.token)
                return Router.replace("/")
            }
            errorDispatcher(data.message)
        }).catch(e => {
            
            loadTracker(false)

            if (e.message == "Request failed with status code 400") {
                logInHelper(true)
                return errorDispatcher("Credentials not valid.")
            }
            errorDispatcher("There was a problem connecting to server.")
        })
    }

    return(
        <DefaultTemplate>
            <div className={styles.form}>
                <div className={styles.logo}>
                    <a href="/">
                        <img src="/images/logo.png" alt="logo"/>
                    </a>
                </div>

                <form onSubmit={login}>
                    <input tabIndex={1} type="email" id="email" required placeholder="Email"
                    value={email} onChange={e => emailUpdater(e.target.value)}/>

                    <input tabIndex={2} type="password" id="password" required placeholder="Password"
                    value={password} onChange={e => passwordUpdater(e.target.value)}/>

                    {
                        error && <p style={{color: "rgb(220, 0, 0)", fontWeight: "600", margin: "20px 0 0 0", textAlign: "left"}}>{error}</p>
                    }
                    {
                        troubleLoggingIn && <p style={{textAlign: "left", marginTop: "10px"}}><a style={{fontWeight: "400"}} href="/reset">Having trouble logging in?</a></p>
                    }

                    <button disabled={loading} tabIndex={3} type="submit">{loading ? <i className="fa fa-spinner"></i> : "Login"}</button>
                    <p style={{marginTop: "15px", marginBottom: "15px"}}>Not registered yet? <a href="/register">Create Account</a></p>
                    <hr/>
                    <p>Are you a seller? <a href="/seller">Log in here</a></p>
                </form>
            </div>
        </DefaultTemplate>
    )
}