import { Fragment } from 'react'

import Head from './Head'
import Navbar from './Navbar'

import styles from '../styles/template.module.css'

export default function ShopTemplate(props) {
    return <Fragment>
        <Head title={props.title} />
        <Navbar />
        <main className={styles.container}>
            {
                props.children
            }
        </main>

        <script src="https://kit.fontawesome.com/25c1aa0c81.js" crossorigin="anonymous" />
    </Fragment>
}